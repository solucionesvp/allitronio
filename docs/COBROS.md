# Sistema de cobros de Allitron

Comprobantes de cobro ligados a las citas: se crea el cobro (opcionalmente desde una cita), se registran los abonos, se comparte un enlace privado con el cliente (correo, WhatsApp o copiado) y el saldo se actualiza solo. Todo se administra desde `/interno/cobros`.

- Panel del equipo: `/interno/cobros` (misma sesión firmada que `/interno/reuniones`; entra desde «Centro del negocio»).
- Comprobante del cliente: `/cobros/<token>` — el token (192 bits) es el secreto. No se indexa y siempre se lee en vivo.
- Voz: **Aurora IA** firma los correos; el comprobante lleva el nombre de quien emite (Ajustes).

## Puesta en marcha (una sola vez)

1. **Supabase**: usa el MISMO proyecto de reuniones (así cada cobro puede ligarse a su cita). En el SQL Editor corre completo `supabase/cobros-schema.sql` **después** de `reuniones-schema.sql`. Es idempotente: se puede correr de nuevo.
2. **Variables de entorno**: ninguna nueva. Reutiliza `REUNIONES_SUPABASE_URL`, `REUNIONES_SUPABASE_SERVICE_KEY`, `REUNIONES_SESSION_SECRET`, `RESEND_API_KEY` y `REUNIONES_FROM_EMAIL`.
3. Redeploy, entrar a `/interno/cobros` → **Ajustes** y capturar quién emite (nombre, correo de respuesta, logo) y los datos bancarios. Los cobros nuevos los toman como valores por defecto.

## Cómo funciona

- **Estados que se guardan**: `borrador` → `emitido` → `cancelado`. Solo un cobro emitido recibe abonos y se puede compartir; un borrador no existe para el cliente (su enlace da «no disponible»).
- **Estado de pago (derivado, nunca se captura a mano)**: pendiente · pago parcial · pagado · vencido, calculado de los abonos y la fecha de vencimiento. Así no puede quedar «pagado» sin que el dinero cuadre.
- **Dinero**: el total se calcula en el servidor en centavos enteros (`src/lib/cobros/calculos.ts`); lo que mande el navegador solo es entrada. El saldo SIEMPRE sale de `cobro_abonos`.
- **Abonos**: no se borran, se **anulan** (queda quién, cuándo y por qué). Una función SQL bloquea la fila del cobro y rechaza cualquier abono que pase del saldo, aun con dos personas capturando al mismo tiempo.
- **Edición**: un cobro emitido se puede editar, pero el nuevo total nunca puede quedar por debajo de lo ya abonado. Un cobro cancelado queda congelado (se duplica si hace falta uno nuevo). No se cancela un cobro con abonos vigentes: primero se anulan.
- **Copia de emisor y banco**: cada cobro guarda su propia copia de quién emite y dónde pagar. Cambiar Ajustes no altera comprobantes ya enviados.
- **Cita ligada**: opcional (`reunion_id`). Al elegir una cita se llenan nombre, correo y WhatsApp del cliente. Si luego se borra la cita, el cobro sobrevive.
- **Correo**: usa el mismo envío y bitácora que reuniones (`email_log`, con `cobro_id`). Un fallo de correo nunca bloquea el cobro: queda registrado y se puede reintentar o compartir por WhatsApp. Los correos de cobros NO se asocian a `reunion_id`, para no contaminar el aviso «Correo falló» de la agenda.
- **Bitácora**: cada cobro registra creación, ediciones, emisión, abonos, anulaciones y envíos de correo (visible en el detalle).
- **Folio**: `ALL-0001`, consecutivo, generado por la base de datos.

## Mapa del código

- `supabase/cobros-schema.sql` — tablas, RLS cerrado, funciones atómicas (`cobro_guardar`, `cobro_registrar_abono`, `cobro_anular_abono`, `cobro_cambiar_estado`; solo `service_role` puede ejecutarlas).
- `src/lib/cobros/` — `calculos` (dinero, sin dependencias), `validar` (todo lo que llega del navegador), `service` (acceso a datos), `correo` (plantilla), `enlaces`/`formato` (utilidades seguras para navegador), `types`.
- `src/app/api/cobros/admin/{datos,accion}` — API con sesión obligatoria (mismo patrón que Reuniones).
- `src/app/interno/cobros` + `src/components/cobros/` — panel (lista, nuevo/editar, detalle con abonos, ajustes).
- `src/app/cobros/[token]` + `VistaPublica` — comprobante del cliente (imprimible / PDF desde el navegador).
- `src/middleware.ts` — protege `/interno/cobros` con la sesión firmada.
- `scripts/test-cobros.mjs` — pruebas de los cálculos: `node scripts/test-cobros.mjs`.

## Prueba de humo antes de usarlo con clientes

1. Crear un cobro desde una cita real (con tu propio correo como cliente), emitirlo y abrir «Ver como cliente».
2. Registrar un abono parcial con «Avisar al cliente»: llega el correo y el comprobante muestra pago parcial y barra de avance.
3. Intentar abonar más que el saldo: debe rechazarlo. Liquidar con «Liquidar saldo»: pasa a Pagado y desaparecen los datos bancarios del comprobante.
4. Anular un abono: el saldo regresa y el abono queda tachado con su motivo.
5. Abrir el enlace del cliente en el celular, en una ventana privada (sin sesión) y con «Descargar PDF / imprimir».
6. Un borrador no debe abrirse por su enlace.

## PDF, enlace público y correo

- **Enlace público**: `/cobros/<token>` (token de 192 bits, noindex, sin Referer). Es lo que se comparte por WhatsApp o correo.
- **PDF**: `/cobros/<token>/pdf` se genera en el servidor con `pdf-lib` (JS puro, sin navegador) y siempre refleja el saldo actual. Está en la página del cliente («Descargar PDF») y en el panel (Compartir y entregar). Al instalar, correr `npm install` (dependencia nueva: `pdf-lib`).
- **Correo (Resend)**: el comprobante y el aviso de abono salen con el enlace y el **PDF adjunto**. Cada intento queda en `email_log` (con `cobro_id`): el detalle del cobro muestra el historial (enviado/falló, a quién, cuándo), «Reintentar envío» si falló y confirmación antes de reenviar si ya se envió. La lista marca «Sin enviar / Correo enviado / Correo falló». Si el PDF no se pudo generar, el correo sale igual con el enlace.
- **Tablero `/interno`**: sección Cobros con por cobrar, vencido, cobrado del mes, avisos (sin enviar, borradores) y los 6 cobros pendientes más urgentes (vencidos primero), cada uno abre su detalle. Endpoint: `GET /api/cobros/admin/resumen`.

## Versión 2 (identidad Alli, productos y copias)

- **SQL**: correr `supabase/cobros-v2.sql` una vez en Supabase (agrega `cobro_items.detalle` y actualiza `cobro_guardar`). Es idempotente. Sin esto, guardar cobros falla.
- **Productos y servicios**: cada renglón lleva «Qué incluye / qué se entrega», visible al cliente en página, PDF y correo. En un cobro emitido, «Agregar producto o servicio» abre el formulario con un renglón nuevo; el total nunca puede quedar por debajo de lo ya abonado. Los abonos son del cobro completo, no de un renglón.
- **Diseño**: PDF, página del cliente y correo comparten estructura numerada (para quién, qué compras, resumen y pagos, cómo pagar) y a Alli (carta mientras hay saldo, pulgar arriba cuando está pagado). Imágenes: `public/assets/cobros/*.jpg` (web/correo) y `src/lib/cobros/alli-assets.ts` (PDF, embebidas porque el servidor no lee `public/` de forma confiable).
- **Copias internas**: cada correo al cliente sale con BCC a los anfitriones activos de la tabla `anfitriones` (los mismos que reciben el aviso de citas). El cliente no los ve. Para cambiar quién recibe copia se edita esa tabla.
- **Lista**: paginación de 25 en 25, filtro por fecha de emisión; el formulario se autoguarda en el navegador y ofrece recuperar cambios si se cerró a la mitad.
- Sin hacer: subir logo desde Ajustes (el encabezado ya usa la identidad Allitron/Alli; el campo de logo por URL sigue disponible).

## Pendiente / siguientes fases

- **SaaS (otros negocios)**: la columna `cuenta_id` ya existe en `cobros` para no reescribir, pero hoy el panel es de un solo negocio con dos usuarios (Lups y Alejandro). Ofertarlo a terceros requiere acceso por negocio, aislamiento de datos y cobro de suscripción: es otra fase.
- Mostrar el estado de pago dentro de la Agenda de reuniones (hoy el vínculo se ve desde Cobros).
- Recordatorios automáticos de saldo vencido (misma idea que la Fase 2 de reuniones: `pg_cron` + endpoint protegido).
- Pasarela de pago en línea (hoy los abonos se registran a mano).
