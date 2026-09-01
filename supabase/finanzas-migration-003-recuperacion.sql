-- ── Control Financiero Allitron — migración 003: recuperación de inversión ─
-- Agrega los supuestos de recuperación por proyecto (precio que se cobra
-- por cliente al mes y meta de clientes) para poder calcular en el
-- dashboard cuántos clientes/meses/años se necesitan para recuperar lo
-- invertido en cada producto. No borra ni toca nada existente.

alter table finanzas_proyectos
  add column if not exists precio_recuperacion_mensual numeric default 0,
  add column if not exists meta_clientes_recuperacion integer default 0;

comment on column finanzas_proyectos.precio_recuperacion_mensual is
  'Precio mensual que se cobra por cliente de este producto/servicio, usado para calcular la recuperación de la inversión. Dato que captura el admin a criterio.';
comment on column finanzas_proyectos.meta_clientes_recuperacion is
  'Número de clientes activos que se usa como punto de partida del cálculo de recuperación (se puede simular con otros valores en el dashboard sin guardar).';
