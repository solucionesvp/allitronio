-- ── Control Financiero Allitron — migración 004: rate limiting + auditoría ─
-- No toca tablas existentes. Agrega:
--   1) finanzas_intentos_login — bloqueo temporal tras varios códigos
--      incorrectos desde la misma IP.
--   2) finanzas_auditoria — quién hizo qué y cuándo (crear/editar/eliminar)
--      en movimientos, proyectos, servicios y configuración.

create table if not exists finanzas_intentos_login (
  ip text primary key,
  intentos_fallidos integer not null default 0,
  ultimo_intento timestamptz not null default now(),
  bloqueado_hasta timestamptz
);

create table if not exists finanzas_auditoria (
  id uuid primary key default gen_random_uuid(),
  momento timestamptz not null default now(),
  persona text not null,
  accion text not null check (accion in ('crear', 'editar', 'eliminar', 'archivar', 'cambiar_fx')),
  entidad text not null check (entidad in ('movimiento', 'proyecto', 'servicio', 'config')),
  entidad_id text,
  detalle text default '',
  ip text default ''
);

create index if not exists finanzas_auditoria_momento_idx on finanzas_auditoria (momento desc);
