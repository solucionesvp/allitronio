-- Cobros v2: «qué incluye» por renglón. Idempotente; correr una vez en el SQL Editor.
alter table cobro_items add column if not exists detalle text;

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

grant execute on function cobro_guardar(uuid, jsonb, jsonb, jsonb, text)               to service_role;
