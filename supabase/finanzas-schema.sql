-- ── Control Financiero Allitron — esquema Supabase ──────────────────────────
-- Ejecutar una sola vez en el SQL Editor del proyecto de Supabase nuevo
-- (creado en la cuenta de Alejandro). Crea las tablas y carga el histórico
-- de Lazup CRM ya reconstruido con Lups (corte 28-ago-2026).

create table if not exists finanzas_movimientos (
  id uuid primary key default gen_random_uuid(),
  orden integer not null default 0,
  proyecto text not null,
  concepto text not null,
  fecha text not null,
  monto numeric not null,
  moneda text not null check (moneda in ('USD', 'MXN')),
  quien_pago text not null check (quien_pago in ('Lups', 'Alejandro', 'Miki')),
  estado text not null check (estado in ('Pagado', 'Recurrente activo', 'Proyectado')),
  notas text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists finanzas_config (
  id integer primary key default 1,
  tipo_cambio numeric not null default 16.95
);

insert into finanzas_config (id, tipo_cambio) values (1, 16.95)
  on conflict (id) do nothing;

-- Mantiene updated_at fresco en cada edición.
create or replace function finanzas_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists finanzas_movimientos_updated_at on finanzas_movimientos;
create trigger finanzas_movimientos_updated_at
  before update on finanzas_movimientos
  for each row execute function finanzas_set_updated_at();

-- ── Semilla: histórico de Lazup CRM (corte 28-ago-2026) ────────────────────
insert into finanzas_movimientos (orden, proyecto, concepto, fecha, monto, moneda, quien_pago, estado, notas) values
(1, 'Lazup CRM', 'Compra de CRM de terceros mal desarrollado (base WhaTicket, dev. "Opensaurz")', 'nov-2024', 2000, 'USD', 'Lups', 'Pagado', 'Producto no funcional; se abandonó por completo'),
(2, 'Lazup CRM', 'Amigo revisó el código inicial y dio guía/orientación', 'fin 2024', 5000, 'MXN', 'Lups', 'Pagado', ''),
(3, 'Lazup CRM', 'Programador brasileño (Miami) — ordenar y depurar el código, varios pagos parciales', 'fin 2024 / antes ene-2025', 2300, 'USD', 'Lups', 'Pagado', 'Suma de varios pagos de 300-500 USD c/u'),
(4, 'Lazup CRM', 'Desarrollo de módulo Contacto 360', 'ene-feb 2025', 20000, 'MXN', 'Lups', 'Pagado', ''),
(5, 'Lazup CRM', 'Automatización interna del sistema', 'ene-feb 2025', 10000, 'MXN', 'Lups', 'Pagado', ''),
(6, 'Lazup CRM', 'Desarrollo de base de datos', 'ene-feb 2025', 5000, 'MXN', 'Lups', 'Pagado', ''),
(7, 'Lazup CRM', 'Créditos Codex/Claude + ChatGPT Pro, $100 USD/mes — 17 pagos acumulados', 'ene-2025 → hoy', 1700, 'USD', 'Lups', 'Recurrente activo', 'Sigue activo; cada mes adicional suma $100 USD más'),
(8, 'Lazup CRM', 'Deploy en producción: servidores, migraciones entre proveedores, ayuda externa', 'sin fecha exacta', 1500, 'USD', 'Lups', 'Pagado', 'Gasto por prueba y error, según Lups'),
(9, 'Lazup CRM', 'Programador de Colombia dedicado a Lazup — $800 USD/mes', 'ene-2025 → ago-2026 (20 meses)', 16000, 'USD', 'Lups', 'Recurrente activo', '20 meses x $800 USD. Activo hasta entrega prevista 20-nov-2026'),
(10, 'Lazup CRM', 'Créditos extra para el programador de Colombia, $100 USD c/15 días', 'últimos 2 meses', 400, 'USD', 'Lups', 'Recurrente activo', '~2 pagos/mes x 2 meses'),
(11, 'Lazup CRM', 'Continuación estimada Colombia + créditos hasta la entrega del 20-nov-2026', 'sep-nov 2026 (proyección)', 3300, 'USD', 'Lups', 'Proyectado', '3 meses x (800+200+100 USD)')
on conflict do nothing;
