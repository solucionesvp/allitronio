-- ════════════════════════════════════════════════════════════════════════════
-- Allitron · Sistema de cobros y comprobantes — esquema v1
-- Correr en el SQL Editor del MISMO proyecto Supabase de reuniones, DESPUÉS de
-- reuniones-schema.sql (cada cobro puede ligarse a una cita). Es idempotente.
--
-- Seguridad: RLS activado y SIN políticas en todas las tablas; las funciones
-- solo las puede ejecutar service_role. La llave anon/publicable no puede leer,
-- escribir ni llamar nada: solo el servidor (service role, nunca en el navegador).
--
-- Dinero: el total se calcula en el servidor (src/lib/cobros/calculos.ts) y se
-- guarda; lo abonado y el saldo SIEMPRE se derivan de cobro_abonos. Las funciones
-- bloquean la fila del cobro, así dos abonos simultáneos no pueden pasarse del total.
-- ════════════════════════════════════════════════════════════════════════════

-- ── Cobros (un comprobante / nota de cobro) ─────────────────────────────────
create table if not exists cobros (
  id                uuid primary key default gen_random_uuid(),
  folio_num         bigint generated always as identity unique,
  cuenta_id         text not null default 'allitron',      -- listo para multi-negocio (SaaS)
  token             text unique not null,                  -- enlace público privado (192 bits)
  reunion_id        uuid references reuniones(id) on delete set null,
  estado            text not null default 'borrador'
                      check (estado in ('borrador','emitido','cancelado')),
  tipo_documento    text not null default 'nota'
                      check (tipo_documento in ('nota','recibo','factura')),
  fecha_emision     date not null default ((now() at time zone 'America/Mazatlan')::date),
  fecha_vencimiento date,

  cliente_nombre    text not null,
  cliente_email     text,
  cliente_telefono  text,
  cliente_direccion text,
  cliente_rfc       text,

  concepto          text,
  notas             text,
  metodo_pago       text,

  descuento_tipo    text not null default 'porcentaje' check (descuento_tipo in ('porcentaje','monto')),
  descuento_valor   numeric(12,2) not null default 0 check (descuento_valor >= 0),
  iva_activo        boolean not null default false,
  iva_porcentaje    numeric(5,2) not null default 16 check (iva_porcentaje between 0 and 100),
  subtotal          numeric(12,2) not null default 0 check (subtotal >= 0),
  descuento_monto   numeric(12,2) not null default 0 check (descuento_monto >= 0),
  iva_monto         numeric(12,2) not null default 0 check (iva_monto >= 0),
  total             numeric(12,2) not null default 0 check (total >= 0),

  -- Copia (snapshot) de quién emite y dónde pagar: si luego cambian los ajustes,
  -- los comprobantes ya enviados no se alteran.
  emisor            jsonb not null default '{}'::jsonb,
  banco             jsonb not null default '{}'::jsonb,
  mostrar_banco     boolean not null default true,

  creado_por        text,
  creado_en         timestamptz not null default now(),
  actualizado_en    timestamptz not null default now()
);
create index if not exists cobros_estado_idx   on cobros (estado, creado_en desc);
create index if not exists cobros_reunion_idx  on cobros (reunion_id);
create index if not exists cobros_cuenta_idx   on cobros (cuenta_id, creado_en desc);

create table if not exists cobro_items (
  id           uuid primary key default gen_random_uuid(),
  cobro_id     uuid not null references cobros(id) on delete cascade,
  orden        integer not null default 0,
  descripcion  text not null,
  detalle      text,
  cantidad     numeric(10,2) not null check (cantidad > 0),
  precio       numeric(12,2) not null check (precio >= 0)
);
alter table cobro_items add column if not exists detalle text;
create index if not exists cobro_items_cobro_idx on cobro_items (cobro_id, orden);

create table if not exists cobro_enlaces (
  id        uuid primary key default gen_random_uuid(),
  cobro_id  uuid not null references cobros(id) on delete cascade,
  orden     integer not null default 0,
  titulo    text not null,
  url       text not null check (url ~* '^https://'),
  tipo      text not null default 'otro' check (tipo in ('pdf','imagen','otro'))
);
create index if not exists cobro_enlaces_cobro_idx on cobro_enlaces (cobro_id, orden);

-- Abonos: nunca se borran, se ANULAN (queda quién, cuándo y por qué).
create table if not exists cobro_abonos (
  id                uuid primary key default gen_random_uuid(),
  cobro_id          uuid not null references cobros(id) on delete cascade,
  fecha             date not null,
  concepto          text not null default 'Abono',
  metodo            text,
  monto             numeric(12,2) not null check (monto > 0),
  anulado_en        timestamptz,
  anulado_por       text,
  motivo_anulacion  text,
  creado_por        text,
  creado_en         timestamptz not null default now()
);
create index if not exists cobro_abonos_cobro_idx on cobro_abonos (cobro_id, fecha);

-- Bitácora de lo que pasa con cada cobro.
create table if not exists cobro_eventos (
  id         bigint generated always as identity primary key,
  cobro_id   uuid not null references cobros(id) on delete cascade,
  tipo       text not null,
  detalle    jsonb not null default '{}'::jsonb,
  persona    text,
  creado_en  timestamptz not null default now()
);
create index if not exists cobro_eventos_cobro_idx on cobro_eventos (cobro_id, creado_en desc);

-- Los correos de cobros usan la misma bitácora que reuniones.
alter table email_log add column if not exists cobro_id uuid references cobros(id) on delete set null;
create index if not exists email_log_cobro_idx on email_log (cobro_id, creado_en desc);

-- ── actualizado_en automático ───────────────────────────────────────────────
drop trigger if exists cobros_actualizado on cobros;
create trigger cobros_actualizado before update on cobros
  for each row execute function set_actualizado_en();

-- ── RLS cerrado ─────────────────────────────────────────────────────────────
alter table cobros         enable row level security;
alter table cobro_items    enable row level security;
alter table cobro_enlaces  enable row level security;
alter table cobro_abonos   enable row level security;
alter table cobro_eventos  enable row level security;

-- ════════════════════════════════════════════════════════════════════════════
-- Funciones atómicas (todo o nada). Los errores de negocio se lanzan como
-- excepciones con un código corto que el servidor traduce a mensajes.
-- ════════════════════════════════════════════════════════════════════════════

-- Crea o actualiza un cobro con sus renglones y enlaces en una sola transacción.
create or replace function cobro_guardar(
  p_id       uuid,
  p_datos    jsonb,
  p_items    jsonb,
  p_enlaces  jsonb,
  p_persona  text
) returns uuid
language plpgsql
as $$
declare
  v_id       uuid := p_id;
  v_estado   text;
  v_abonado  numeric(12,2);
  v_total    numeric(12,2) := coalesce((p_datos->>'total')::numeric, 0);
begin
  if v_id is null then
    insert into cobros (
      token, reunion_id, tipo_documento, fecha_emision, fecha_vencimiento,
      cliente_nombre, cliente_email, cliente_telefono, cliente_direccion, cliente_rfc,
      concepto, notas, metodo_pago,
      descuento_tipo, descuento_valor, iva_activo, iva_porcentaje,
      subtotal, descuento_monto, iva_monto, total,
      emisor, banco, mostrar_banco, creado_por
    ) values (
      p_datos->>'token',
      nullif(p_datos->>'reunion_id','')::uuid,
      coalesce(p_datos->>'tipo_documento','nota'),
      coalesce(nullif(p_datos->>'fecha_emision','')::date, (now() at time zone 'America/Mazatlan')::date),
      nullif(p_datos->>'fecha_vencimiento','')::date,
      p_datos->>'cliente_nombre',
      nullif(p_datos->>'cliente_email',''),
      nullif(p_datos->>'cliente_telefono',''),
      nullif(p_datos->>'cliente_direccion',''),
      nullif(p_datos->>'cliente_rfc',''),
      nullif(p_datos->>'concepto',''),
      nullif(p_datos->>'notas',''),
      nullif(p_datos->>'metodo_pago',''),
      coalesce(p_datos->>'descuento_tipo','porcentaje'),
      coalesce((p_datos->>'descuento_valor')::numeric, 0),
      coalesce((p_datos->>'iva_activo')::boolean, false),
      coalesce((p_datos->>'iva_porcentaje')::numeric, 16),
      coalesce((p_datos->>'subtotal')::numeric, 0),
      coalesce((p_datos->>'descuento_monto')::numeric, 0),
      coalesce((p_datos->>'iva_monto')::numeric, 0),
      v_total,
      coalesce(p_datos->'emisor', '{}'::jsonb),
      coalesce(p_datos->'banco', '{}'::jsonb),
      coalesce((p_datos->>'mostrar_banco')::boolean, true),
      p_persona
    ) returning id into v_id;
    insert into cobro_eventos (cobro_id, tipo, persona) values (v_id, 'creado', p_persona);
  else
    select estado into v_estado from cobros where id = v_id for update;
    if not found then raise exception 'no_encontrado'; end if;
    if v_estado = 'cancelado' then raise exception 'cancelado'; end if;

    select coalesce(sum(monto), 0) into v_abonado from cobro_abonos where cobro_id = v_id and anulado_en is null;
    if v_total < v_abonado then raise exception 'total_menor_a_abonos'; end if;

    update cobros set
      reunion_id        = nullif(p_datos->>'reunion_id','')::uuid,
      tipo_documento    = coalesce(p_datos->>'tipo_documento','nota'),
      fecha_emision     = coalesce(nullif(p_datos->>'fecha_emision','')::date, fecha_emision),
      fecha_vencimiento = nullif(p_datos->>'fecha_vencimiento','')::date,
      cliente_nombre    = p_datos->>'cliente_nombre',
      cliente_email     = nullif(p_datos->>'cliente_email',''),
      cliente_telefono  = nullif(p_datos->>'cliente_telefono',''),
      cliente_direccion = nullif(p_datos->>'cliente_direccion',''),
      cliente_rfc       = nullif(p_datos->>'cliente_rfc',''),
      concepto          = nullif(p_datos->>'concepto',''),
      notas             = nullif(p_datos->>'notas',''),
      metodo_pago       = nullif(p_datos->>'metodo_pago',''),
      descuento_tipo    = coalesce(p_datos->>'descuento_tipo','porcentaje'),
      descuento_valor   = coalesce((p_datos->>'descuento_valor')::numeric, 0),
      iva_activo        = coalesce((p_datos->>'iva_activo')::boolean, false),
      iva_porcentaje    = coalesce((p_datos->>'iva_porcentaje')::numeric, 16),
      subtotal          = coalesce((p_datos->>'subtotal')::numeric, 0),
      descuento_monto   = coalesce((p_datos->>'descuento_monto')::numeric, 0),
      iva_monto         = coalesce((p_datos->>'iva_monto')::numeric, 0),
      total             = v_total,
      emisor            = coalesce(p_datos->'emisor', '{}'::jsonb),
      banco             = coalesce(p_datos->'banco', '{}'::jsonb),
      mostrar_banco     = coalesce((p_datos->>'mostrar_banco')::boolean, true)
    where id = v_id;
    insert into cobro_eventos (cobro_id, tipo, persona) values (v_id, 'editado', p_persona);
  end if;

  delete from cobro_items where cobro_id = v_id;
  insert into cobro_items (cobro_id, orden, descripcion, detalle, cantidad, precio)
    select v_id, (e.ord - 1)::int, e.val->>'descripcion', nullif(e.val->>'detalle',''), (e.val->>'cantidad')::numeric, (e.val->>'precio')::numeric
    from jsonb_array_elements(coalesce(p_items, '[]'::jsonb)) with ordinality as e(val, ord);

  delete from cobro_enlaces where cobro_id = v_id;
  insert into cobro_enlaces (cobro_id, orden, titulo, url, tipo)
    select v_id, (e.ord - 1)::int, e.val->>'titulo', e.val->>'url', coalesce(nullif(e.val->>'tipo',''), 'otro')
    from jsonb_array_elements(coalesce(p_enlaces, '[]'::jsonb)) with ordinality as e(val, ord);

  return v_id;
end;
$$;

-- Registra un abono. Bloquea el cobro y NO permite pasarse del total.
create or replace function cobro_registrar_abono(
  p_cobro    uuid,
  p_fecha    date,
  p_concepto text,
  p_metodo   text,
  p_monto    numeric,
  p_persona  text
) returns uuid
language plpgsql
as $$
declare
  v_estado  text;
  v_total   numeric(12,2);
  v_abonado numeric(12,2);
  v_id      uuid;
begin
  if p_monto is null or p_monto <= 0 then raise exception 'monto_invalido'; end if;
  select estado, total into v_estado, v_total from cobros where id = p_cobro for update;
  if not found then raise exception 'no_encontrado'; end if;
  if v_estado <> 'emitido' then raise exception 'no_emitido'; end if;

  select coalesce(sum(monto), 0) into v_abonado from cobro_abonos where cobro_id = p_cobro and anulado_en is null;
  if v_abonado + p_monto > v_total then raise exception 'excede_saldo'; end if;

  insert into cobro_abonos (cobro_id, fecha, concepto, metodo, monto, creado_por)
    values (p_cobro, p_fecha, coalesce(nullif(p_concepto,''), 'Abono'), nullif(p_metodo,''), p_monto, p_persona)
    returning id into v_id;
  insert into cobro_eventos (cobro_id, tipo, detalle, persona)
    values (p_cobro, 'abono', jsonb_build_object('abono_id', v_id, 'monto', p_monto), p_persona);
  return v_id;
end;
$$;

-- Anula un abono (no lo borra).
create or replace function cobro_anular_abono(
  p_abono   uuid,
  p_motivo  text,
  p_persona text
) returns uuid
language plpgsql
as $$
declare
  v_cobro uuid;
  v_monto numeric(12,2);
begin
  select cobro_id, monto into v_cobro, v_monto from cobro_abonos where id = p_abono and anulado_en is null for update;
  if not found then raise exception 'abono_no_encontrado'; end if;
  perform 1 from cobros where id = v_cobro for update;
  update cobro_abonos set anulado_en = now(), anulado_por = p_persona, motivo_anulacion = nullif(p_motivo,'') where id = p_abono;
  insert into cobro_eventos (cobro_id, tipo, detalle, persona)
    values (v_cobro, 'abono_anulado', jsonb_build_object('abono_id', p_abono, 'monto', v_monto, 'motivo', nullif(p_motivo,'')), p_persona);
  return v_cobro;
end;
$$;

-- Cambia el estado: emitir (borrador → emitido) o cancelar.
create or replace function cobro_cambiar_estado(
  p_cobro   uuid,
  p_estado  text,
  p_persona text,
  p_motivo  text default null
) returns void
language plpgsql
as $$
declare
  v_estado  text;
  v_total   numeric(12,2);
  v_abonado numeric(12,2);
begin
  select estado, total into v_estado, v_total from cobros where id = p_cobro for update;
  if not found then raise exception 'no_encontrado'; end if;

  if p_estado = 'emitido' then
    if v_estado <> 'borrador' then raise exception 'estado_invalido'; end if;
    if v_total <= 0 then raise exception 'total_cero'; end if;
  elsif p_estado = 'cancelado' then
    if v_estado = 'cancelado' then raise exception 'estado_invalido'; end if;
    select coalesce(sum(monto), 0) into v_abonado from cobro_abonos where cobro_id = p_cobro and anulado_en is null;
    if v_abonado > 0 then raise exception 'tiene_abonos'; end if;
  else
    raise exception 'estado_invalido';
  end if;

  update cobros set estado = p_estado where id = p_cobro;
  insert into cobro_eventos (cobro_id, tipo, detalle, persona)
    values (p_cobro, p_estado, jsonb_build_object('motivo', nullif(p_motivo,'')), p_persona);
end;
$$;

-- Solo el servidor (service_role) puede ejecutarlas; anon/authenticated no.
revoke all on function cobro_guardar(uuid, jsonb, jsonb, jsonb, text)               from public, anon, authenticated;
revoke all on function cobro_registrar_abono(uuid, date, text, text, numeric, text) from public, anon, authenticated;
revoke all on function cobro_anular_abono(uuid, text, text)                         from public, anon, authenticated;
revoke all on function cobro_cambiar_estado(uuid, text, text, text)                 from public, anon, authenticated;
grant execute on function cobro_guardar(uuid, jsonb, jsonb, jsonb, text)               to service_role;
grant execute on function cobro_registrar_abono(uuid, date, text, text, numeric, text) to service_role;
grant execute on function cobro_anular_abono(uuid, text, text)                         to service_role;
grant execute on function cobro_cambiar_estado(uuid, text, text, text)                 to service_role;

-- ── Ajustes por defecto del emisor (se editan desde /interno/cobros → Ajustes)
-- Quedan vacíos a propósito: los datos bancarios reales los captura el equipo.
insert into ajustes (clave, valor) values
  ('cobros', '{"emisor":{"nombre":"Allitron","logo_url":"","email":"","telefono":"","web":"","direccion":""},"banco":{"banco":"","beneficiario":"","cuenta":"","clabe":""},"iva_activo":false,"iva_porcentaje":16,"metodo_pago":"Transferencia bancaria","notas":"Gracias por tu confianza.","vence_dias":0}')
on conflict (clave) do nothing;
