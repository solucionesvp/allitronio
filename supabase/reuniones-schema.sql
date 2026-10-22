-- ════════════════════════════════════════════════════════════════════════════
-- Allitron · Sistema de reuniones — esquema v1
-- Correr completo en el SQL Editor del proyecto Supabase de reuniones
-- (proyecto SEPARADO del de finanzas). Es idempotente: se puede correr de nuevo.
--
-- Seguridad: todas las tablas tienen RLS activado y SIN políticas. La llave
-- anon/publicable no puede leer ni escribir nada; solo el servidor (service
-- role key, nunca expuesta al navegador) accede a los datos.
-- ════════════════════════════════════════════════════════════════════════════

create extension if not exists btree_gist;

-- ── Anfitriones (quienes atienden las reuniones) ────────────────────────────
create table if not exists anfitriones (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  nombre        text not null,
  email         text,
  whatsapp      text,
  enlace_video  text,                                  -- sala fija de Meet/Zoom
  zona_horaria  text not null default 'America/Mazatlan',
  activo        boolean not null default false,        -- se activa al completar datos
  creado_en     timestamptz not null default now()
);

-- ── Catálogo: un "producto de reunión" por producto/servicio ───────────────
create table if not exists productos_reunion (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  nombre              text not null,
  descripcion         text,
  duracion_min        integer not null check (duracion_min between 10 and 240),
  buffer_min          integer not null default 0 check (buffer_min between 0 and 120),
  costo_mxn           numeric(10,2),
  mostrar_costo       boolean not null default false,
  permite_presencial  boolean not null default true,
  permite_video       boolean not null default true,
  activo              boolean not null default false,
  orden               integer not null default 0,
  creado_en           timestamptz not null default now()
);

create table if not exists producto_anfitriones (
  producto_id   uuid not null references productos_reunion(id) on delete cascade,
  anfitrion_id  uuid not null references anfitriones(id) on delete cascade,
  prioridad     integer not null default 0,            -- menor = se asigna primero
  primary key (producto_id, anfitrion_id)
);

-- ── Disponibilidad semanal (en la zona horaria del anfitrión) ──────────────
create table if not exists disponibilidad_semanal (
  id            uuid primary key default gen_random_uuid(),
  anfitrion_id  uuid not null references anfitriones(id) on delete cascade,
  dia_semana    smallint not null check (dia_semana between 0 and 6),  -- 0 = domingo
  hora_inicio   time not null,
  hora_fin      time not null,
  check (hora_fin > hora_inicio)
);
create index if not exists disponibilidad_anfitrion_idx on disponibilidad_semanal (anfitrion_id);

-- ── Bloqueos puntuales (vacaciones, juntas, etc.). anfitrion_id null = todos
create table if not exists bloqueos (
  id            uuid primary key default gen_random_uuid(),
  anfitrion_id  uuid references anfitriones(id) on delete cascade,
  inicio        timestamptz not null,
  fin           timestamptz not null,
  motivo        text,
  creado_en     timestamptz not null default now(),
  check (fin > inicio)
);
create index if not exists bloqueos_rango_idx on bloqueos (inicio, fin);

-- ── Reuniones ───────────────────────────────────────────────────────────────
create table if not exists reuniones (
  id                     uuid primary key default gen_random_uuid(),
  producto_id            uuid not null references productos_reunion(id),
  producto_nombre        text not null,                 -- copia: el catálogo puede cambiar
  anfitrion_id           uuid not null references anfitriones(id),
  inicio                 timestamptz not null,
  fin                    timestamptz not null,
  modalidad              text not null check (modalidad in ('presencial','video')),
  estado                 text not null default 'confirmada'
                           check (estado in ('confirmada','cancelada','realizada','no_asistio')),
  origen                 text not null default 'cliente' check (origen in ('cliente','interno')),
  cliente_nombre         text not null,
  cliente_email          text not null,
  cliente_whatsapp       text,
  cliente_empresa        text,
  notas                  text,
  zona_cliente           text not null default 'America/Mazatlan',
  token                  text unique not null,          -- enlace privado de gestión
  secuencia              integer not null default 0,    -- sube al reprogramar/cancelar (ICS)
  acepta_comunicaciones  boolean not null default false,
  consentimiento_en      timestamptz,
  cancelada_por          text,
  motivo_cancelacion     text,
  creado_en              timestamptz not null default now(),
  actualizado_en         timestamptz not null default now(),
  check (fin > inicio),
  -- Candado real contra doble reserva: un anfitrión no puede tener dos
  -- reuniones confirmadas que se traslapen, ni siquiera con dos clientes
  -- reservando en el mismo milisegundo.
  constraint reuniones_sin_traslape
    exclude using gist (anfitrion_id with =, tstzrange(inicio, fin, '[)') with &&)
    where (estado = 'confirmada')
);
create index if not exists reuniones_inicio_idx on reuniones (inicio);
create index if not exists reuniones_estado_idx on reuniones (estado, inicio);

-- ── Recordatorios y seguimiento (los llena/envía la Fase 2) ────────────────
create table if not exists recordatorios (
  id            uuid primary key default gen_random_uuid(),
  reunion_id    uuid not null references reuniones(id) on delete cascade,
  tipo          text not null check (tipo in ('24h','2h','seguimiento','reagendar')),
  enviar_en     timestamptz not null,
  estado        text not null default 'pendiente' check (estado in ('pendiente','enviado','omitido','error')),
  enviado_en    timestamptz,
  error         text,
  unique (reunion_id, tipo)
);
create index if not exists recordatorios_pendientes_idx on recordatorios (estado, enviar_en);

-- ── Bitácora de correos ─────────────────────────────────────────────────────
create table if not exists email_log (
  id            uuid primary key default gen_random_uuid(),
  reunion_id    uuid references reuniones(id) on delete set null,
  tipo          text not null,
  destinatarios text[] not null default '{}',
  estado        text not null check (estado in ('enviado','error')),
  proveedor_id  text,
  error         text,
  creado_en     timestamptz not null default now()
);
create index if not exists email_log_reunion_idx on email_log (reunion_id, creado_en desc);

-- ── Intentos (límite de reservas por IP y de intentos de login del panel) ───
create table if not exists reuniones_intentos (
  id         bigint generated always as identity primary key,
  ip         text not null,
  tipo       text not null,                              -- 'reserva' | 'login_fallido'
  creado_en  timestamptz not null default now()
);
create index if not exists reuniones_intentos_idx on reuniones_intentos (ip, tipo, creado_en desc);

-- ── Ajustes generales ───────────────────────────────────────────────────────
create table if not exists ajustes (
  clave  text primary key,
  valor  jsonb not null
);

-- ── actualizado_en automático ───────────────────────────────────────────────
create or replace function set_actualizado_en() returns trigger as $$
begin new.actualizado_en = now(); return new; end;
$$ language plpgsql;

drop trigger if exists reuniones_actualizado on reuniones;
create trigger reuniones_actualizado before update on reuniones
  for each row execute function set_actualizado_en();

-- ── RLS cerrado ─────────────────────────────────────────────────────────────
alter table anfitriones            enable row level security;
alter table productos_reunion      enable row level security;
alter table producto_anfitriones   enable row level security;
alter table disponibilidad_semanal enable row level security;
alter table bloqueos               enable row level security;
alter table reuniones              enable row level security;
alter table recordatorios          enable row level security;
alter table email_log              enable row level security;
alter table reuniones_intentos     enable row level security;
alter table ajustes                enable row level security;

-- ── Datos iniciales ─────────────────────────────────────────────────────────
-- IMPORTANTE: todo arranca INACTIVO. Las duraciones son PROVISIONALES (30 min)
-- hasta que Lups y Alejandro las confirmen en el panel (/interno/reuniones).
insert into anfitriones (slug, nombre) values
  ('lups', 'Lups'),
  ('alejandro', 'Alejandro')
on conflict (slug) do nothing;

insert into productos_reunion (slug, nombre, duracion_min, orden) values
  ('general',          'Reunión con Allitron', 30, 0),
  ('domina-google',    'Domina Google',        30, 1),
  ('toma-tu-mercado',  'Toma tu Mercado',      30, 2),
  ('toma-el-volante',  'Toma el Volante',      30, 3),
  ('lazup',            'LAZUP',                30, 4),
  ('segundo-cerebro',  'Segundo Cerebro',      30, 5),
  ('allitron-90',      'Allitron 90',          30, 6)
on conflict (slug) do nothing;

-- Domicilio tomado del aviso de privacidad. CONFIRMAR que es donde se recibe a clientes.
insert into ajustes (clave, valor) values
  ('oficina', '{"direccion": "Calle Durango Sur 12, int. 1, Col. Centro, C.P. 63000, Tepic, Nayarit", "maps_url": null}')
on conflict (clave) do nothing;
