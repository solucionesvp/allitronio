-- ── Control Financiero Allitron — migración 005: pendientes / notas ────────
-- Cajón de temas abiertos que no encajan en un movimiento (fiscal, legal,
-- operativo, etc.) para que se puedan ir agregando cosas sin tener que
-- tocar código cada vez. No es asesoría fiscal/legal — es solo una lista
-- de pendientes a resolver con quien corresponda (contador, abogado, etc.).

create table if not exists finanzas_notas (
  id uuid primary key default gen_random_uuid(),
  categoria text not null check (categoria in ('fiscal', 'legal', 'operativo', 'producto', 'otro')),
  titulo text not null,
  detalle text default '',
  estado text not null default 'pendiente' check (estado in ('pendiente', 'en_proceso', 'resuelto')),
  creado_por text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists finanzas_notas_updated_at on finanzas_notas;
create trigger finanzas_notas_updated_at
  before update on finanzas_notas
  for each row execute function finanzas_set_updated_at();

create index if not exists finanzas_notas_estado_idx on finanzas_notas (estado);

-- Permite que la bitácora de auditoría también registre acciones sobre
-- "nota" (antes solo aceptaba movimiento/proyecto/servicio/config).
alter table finanzas_auditoria drop constraint if exists finanzas_auditoria_entidad_check;
alter table finanzas_auditoria add constraint finanzas_auditoria_entidad_check
  check (entidad in ('movimiento', 'proyecto', 'servicio', 'config', 'nota'));
