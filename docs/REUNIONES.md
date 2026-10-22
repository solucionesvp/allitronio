# Sistema de reuniones de Allitron

Agenda en línea por producto: el cliente elige tema, modalidad, día y hora; recibe un correo de **Aurora IA** con botones para agregar la reunión a su calendario; el equipo (Lups y Alejandro) recibe copia con los datos del cliente y el `.ics`. Todo se administra desde `/interno/reuniones`.

- Página pública: `/reuniones` (o `/reuniones?producto=domina-google` desde cada producto).
- Gestión del cliente (reprogramar / cancelar): `/reuniones/<token>` — el token es secreto y llega por correo.
- Panel del equipo: `/interno/reuniones` (acceso con código, sesión firmada).
- Voz: **Alli** es la cara en la web; **Aurora IA** firma los correos.

## Puesta en marcha (una sola vez)

1. **Supabase** (cuenta de Allitron): crear un proyecto nuevo, separado del de finanzas. En el SQL Editor correr completo `supabase/reuniones-schema.sql` (se puede correr más de una vez). Copiar *Project URL* y *service_role key* (Settings → API).
2. **Resend**: crear la API key y verificar el dominio de Allitron (SPF y DKIM) para que los correos no caigan en spam. Remitente sugerido: `Aurora IA · Allitron <agenda@tudominio>`.
3. **Variables de entorno** (en `.env.local` y en Vercel → Settings → Environment Variables):

   | Variable | Qué es |
   |---|---|
   | `REUNIONES_SUPABASE_URL` / `REUNIONES_SUPABASE_SERVICE_KEY` | Proyecto Supabase de reuniones (la llave NUNCA va al navegador) |
   | `RESEND_API_KEY` / `REUNIONES_FROM_EMAIL` | Envío de correos |
   | `REUNIONES_CODE_LUPS` / `REUNIONES_CODE_ALEJANDRO` | Códigos de entrada al panel (mín. 8 caracteres) |
   | `REUNIONES_SESSION_SECRET` | Firma de la sesión del panel (mín. 32 caracteres: `openssl rand -hex 32`) |
   | `NEXT_PUBLIC_SITE_URL` | Opcional. Por defecto `https://allitron.io` |

4. Redeploy en Vercel, entrar a `/interno/reuniones` y completar la lista **«Para abrir la agenda al público falta…»**: anfitriones (correo, enlace de Meet, horario semanal), productos (duración, quién atiende) y dirección de la oficina. Todo arranca inactivo a propósito.

## Qué decide el sistema

- **El sistema es la fuente de verdad.** No lee Google Calendar. El equipo registra cada cita con el botón o el `.ics` del correo de aviso.
- **Anti doble reserva:** una restricción en la base de datos impide dos reuniones confirmadas traslapadas del mismo anfitrión.
- Anticipación mínima 4 h · horizonte 30 días · horarios cada 30 min · cambios en línea hasta 2 h antes (`src/lib/reuniones/config.ts`).
- Presencial solo en Tepic (hora de Tepic, UTC−7). Videollamada: enlace fijo por anfitrión.
- Si atienden varios, la reserva va a quien tenga menos reuniones.
- Un fallo de correo nunca cancela una reserva: queda en `email_log`, el panel marca «Correo falló» y permite reenviar.
- Casilla de novedades: opcional y sin marcar. Los correos de la reunión se envían siempre; el newsletter solo con consentimiento (`acepta_comunicaciones`).

## Mapa del código

- `supabase/reuniones-schema.sql` — esquema, candado de traslape, RLS cerrado, datos iniciales (inactivos).
- `src/lib/reuniones/` — `tz` (zonas), `slots` (disponibilidad), `ics` (calendario), `correos` (plantillas), `enviar` (Resend), `service` (reservar/cancelar/reprogramar), `session` (cookie firmada).
- `src/app/api/reuniones/` — API pública (`productos`, `disponibilidad`, `reservar`, `gestionar/[token]`, `ics/[token]`) y `admin/*` (sesión obligatoria).
- `src/components/reuniones/` — flujo público y panel.
- `src/middleware.ts` — protege `/interno/reuniones` verificando la firma de la sesión.

## Prueba de humo antes de anunciar

1. Activar un anfitrión y un producto; reservar desde `/reuniones` con un correo propio.
2. Confirmar: llega el correo al cliente y la copia a Lups y Alejandro, con `.ics` adjunto; los 4 botones de calendario abren bien.
3. Reprogramar y cancelar desde el enlace del correo; verificar que los avisos cambian y que el `.ics` de cancelación retira el evento.
4. Intentar reservar el mismo horario desde dos pestañas: solo una debe entrar.
5. Abrir el correo en Gmail, Outlook y iPhone.

## Pendiente (Fase 2)

Recordatorios 24 h y 2 h antes, correo de seguimiento tras «realizada» y de reagendar tras «no asistió». La tabla `recordatorios` ya existe; falta el envío programado (propuesta: `pg_cron` de Supabase llamando a un endpoint protegido cada 10 minutos).

## Rediseño (oct 2026)
- Público (`/reuniones`, `/reuniones/[token]`): estilo Alli — barra de pasos (`ReunionNav`), `AlliEscena` calendario/cierre en modo `compacta`, tarjetas `.neu`, botones altos y avance automático entre pasos.
- Interno: `/interno` es el centro del negocio (`HubInterno`, protegido con la sesión firmada); módulos en `MODULOS`. `InternoShell` es el marco común. Panel de Reuniones en tema claro.
- Finanzas sigue con su acceso propio (cookie sin firmar). Pendiente: unificarlo bajo la sesión firmada antes de migrarlo.
