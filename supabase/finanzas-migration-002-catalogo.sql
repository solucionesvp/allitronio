-- ── Control Financiero Allitron — migración 002: catálogo dinámico ─────────
-- Ejecutar una sola vez, después de finanzas-schema.sql. No borra nada de
-- finanzas_movimientos; solo agrega columnas/tablas y rellena proyecto_id.
-- Respaldo del histórico previo: Excel "Control Financiero..." en el vault.

-- 1) Catálogo de proyectos/productos/servicios/eventos/activos de socios ----
create table if not exists finanzas_proyectos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nombre text not null,
  tipo text not null check (tipo in ('producto', 'evento', 'activo_socio')),
  propietario_inversion text not null check (propietario_inversion in ('Lups', 'Alejandro', 'Allitron', 'Miki', 'Mixto')),
  descripcion text default '',
  -- Estimado manual de gasto recurrente mensual, en MXN, para proyecciones.
  -- Es un dato que el admin captura a criterio (no se infiere de movimientos
  -- históricos, que no vienen desglosados por mes). 0/NULL = sin proyección.
  recurrente_mensual_mxn numeric default 0,
  activo boolean not null default true,
  orden integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists finanzas_proyectos_updated_at on finanzas_proyectos;
create trigger finanzas_proyectos_updated_at
  before update on finanzas_proyectos
  for each row execute function finanzas_set_updated_at();

insert into finanzas_proyectos (slug, nombre, tipo, propietario_inversion, descripcion, orden) values
  ('lazup-crm', 'Lazup CRM', 'producto', 'Lups', 'CRM propio de Lázaro Marketing, en desarrollo desde nov-2024.', 1),
  ('segundo-cerebro', 'Segundo Cerebro', 'producto', 'Lups', 'Asistente de IA por Telegram.', 2),
  ('maps-2', 'MAPS 2.0', 'producto', 'Lups', 'Producto de presencia digital local.', 3),
  ('motor-captacion', 'Motor de Captación', 'producto', 'Lups', 'Servicio de captación / seguimiento de campañas.', 4),
  ('allitron', 'Allitron', 'producto', 'Mixto', 'Proyecto conjunto Lups + Alejandro.', 5),
  ('evento-nayarit-innovador', 'Evento Nayarit Innovador', 'evento', 'Mixto', 'Evento propio de Allitron.', 6),
  ('edificio-hub-allitron', 'Edificio / Hub Allitron (activo de Alejandro)', 'activo_socio', 'Alejandro',
    'Renta, remodelación, pintura y todo lo invertido por Alejandro en el inmueble del hub. Independiente de la inversión de Lups en productos: Lups no usa este espacio como su centro de trabajo.', 100)
on conflict (slug) do nothing;

-- 2) Catálogo de servicios activos (valor, periodicidad, clientes en bruto) -
create table if not exists finanzas_servicios (
  id uuid primary key default gen_random_uuid(),
  proyecto_id uuid references finanzas_proyectos(id) on delete set null,
  nombre text not null,
  valor numeric not null default 0,
  moneda text not null default 'MXN' check (moneda in ('USD', 'MXN')),
  periodicidad text not null default 'mensual' check (periodicidad in ('mensual', 'anual', 'unico')),
  clientes_activos integer not null default 0,
  notas text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists finanzas_servicios_updated_at on finanzas_servicios;
create trigger finanzas_servicios_updated_at
  before update on finanzas_servicios
  for each row execute function finanzas_set_updated_at();

-- 3) Migrar finanzas_movimientos.proyecto (texto libre) a proyecto_id (FK) --
alter table finanzas_movimientos add column if not exists proyecto_id uuid references finanzas_proyectos(id);

update finanzas_movimientos m
set proyecto_id = p.id
from finanzas_proyectos p
where m.proyecto_id is null and p.nombre = m.proyecto;

-- Cualquier movimiento cuyo texto no haya hecho match (no debería quedar
-- ninguno con el catálogo de arriba) se deja visible para revisión manual:
-- select * from finanzas_movimientos where proyecto_id is null;

-- Se conserva la columna de texto original como respaldo/legado, ya no se
-- usa para nada nuevo — evita perder trazabilidad si algo no migró bien.
alter table finanzas_movimientos rename column proyecto to proyecto_legacy;

create index if not exists finanzas_movimientos_proyecto_id_idx on finanzas_movimientos (proyecto_id);
