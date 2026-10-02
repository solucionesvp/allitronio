// ── Preguntas frecuentes por propuesta — "Pregúntale a Alli" ─────────────
// Regla: cada respuesta debe coincidir EXACTAMENTE con lo que dice la
// propuesta y la cotización de ese cliente (piezas, pauta, fechas, opciones).
// Nunca prometer ventas, pacientes ni posiciones. Cerrar siempre con claridad
// sobre el siguiente paso. Para un cliente nuevo: copiar FAQ_PLANTILLA,
// ajustar tratamiento (tú / usted / ustedes) y números.

export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

/** Base para propuestas nuevas (tratamiento "tú"). Reemplazar lo que está entre [corchetes]. */
export const FAQ_PLANTILLA: FaqItem[] = [
  { pregunta: "¿Cuántas publicaciones van a crear al mes?", respuesta: "[N] piezas nuevas de campaña al mes. No publicamos por publicar: cada pieza tiene un trabajo, que alguien te conozca, confíe en ti o te escriba." },
  { pregunta: "¿Quién paga los anuncios y cuánto?", respuesta: "Los anuncios se pagan aparte, directo a Facebook o Google con tu tarjeta. Recomendamos [MONTO] al mes. Ese dinero nunca pasa por nosotros." },
  { pregunta: "¿Me garantizan ventas?", respuesta: "Nadie serio puede prometer una cifra exacta. Lo que sí prometemos: trabajo cada semana, números claros cada mes y ajustar rápido lo que no funcione." },
  { pregunta: "¿Mis cuentas quedan a mi nombre?", respuesta: "Sí. Todo queda a tu nombre. Nosotros entramos con permisos que puedes quitar cuando quieras." },
  { pregunta: "¿Cuándo empiezo a ver resultados?", respuesta: "[CUÁNDO]. Desde la primera semana medimos tu punto de partida para que veas el avance con números." },
  { pregunta: "¿Qué necesitan de mí?", respuesta: "[LISTA CORTA]. Nosotros nos encargamos del resto." },
  { pregunta: "¿Qué opción me conviene?", respuesta: "[RECOMENDACIÓN Y POR QUÉ]." },
];

export const FAQ_ISUZU: FaqItem[] = [
  { pregunta: "¿Cuántas publicaciones van a hacer al mes?", respuesta: "Alrededor de seis piezas al mes por región: Nayarit, Sinaloa y Baja Sur. No son de relleno: muestran entregas, taller, asesores y clientes reales, y se suman a los anuncios de cada ciudad." },
  { pregunta: "¿Quién paga los anuncios?", respuesta: "Los anuncios se pagan aparte, directo a Facebook y Google con la tarjeta de la empresa. Recomendamos de $3,000 a $4,000 por ciudad al mes en temporada. Ese dinero nunca pasa por nosotros." },
  { pregunta: "¿Me garantizan que voy a vender más?", respuesta: "No prometemos una cifra exacta de ventas; nadie serio lo haría. Sí nos comprometemos a trabajar cada semana, a llevarle a sus asesores prospectos que sí quieren comprar y a darle un reporte claro cada mes." },
  { pregunta: "¿A nombre de quién quedan las cuentas?", respuesta: "De la empresa. Facebook, Instagram, Google, la web y los números quedan a su nombre. Nosotros entramos con permisos que ustedes pueden quitar cuando quieran." },
  { pregunta: "¿Qué pasa con la agencia que hoy nos atiende?", respuesta: "No quitamos a nadie de golpe. Primero hacemos la lista de todas las cuentas y quién las tiene, y luego se hace el traspaso en orden, sin perder nada." },
  { pregunta: "¿Cuándo voy a ver algo?", respuesta: "En la segunda semana las cuatro fichas de Google quedan corregidas. Los anuncios se encienden el 2 de noviembre. Y en la sexta semana le entregamos el primer reporte en una sola hoja." },
  { pregunta: "¿Y si Isuzu México no aprueba algo?", respuesta: "Trabajamos siempre dentro de sus lineamientos. Si una aprobación tarda, arrancamos con piezas que Isuzu México ya tiene aprobadas, para no perder la temporada." },
  { pregunta: "¿Qué necesitan de nosotros?", respuesta: "Los accesos actuales o saber quién los tiene, los lineamientos de Isuzu México, los datos oficiales de cada agencia y una persona que apruebe en uno o dos días." },
  { pregunta: "¿Qué opción me conviene?", respuesta: "La Opción 1, todo junto: cuesta menos que la de bloques y la temporada de noviembre a enero no se interrumpe." },
];

export const FAQ_NUTRIMONTSE: FaqItem[] = [
  { pregunta: "¿Cuántas publicaciones vas a crear al mes?", respuesta: "Hasta cuatro piezas nuevas de campaña al mes, hechas con el material de tu sesión. No publicamos por publicar: cada pieza busca que alguien te conozca, confíe en ti o te escriba para agendar." },
  { pregunta: "¿Tengo que salir en los videos?", respuesta: "Sí, y es tu mayor ventaja: tu forma de explicar genera confianza. Es una sesión de una hora en tu consultorio y te damos guiones cortos, sin complicarte." },
  { pregunta: "¿Quién paga los anuncios y cuánto?", respuesta: "Van aparte, con tu tarjeta, directo a Facebook e Instagram. Recomendamos $3,000 al mes de octubre a diciembre y $4,000 en enero. Ese dinero nunca pasa por nosotros." },
  { pregunta: "¿Me garantizan pacientes?", respuesta: "No prometemos un número exacto; depende también de tu agenda y tu atención. Sí nos comprometemos a una meta de trabajo, a medir cada semana y a ajustar rápido lo que no funcione." },
  { pregunta: "¿Quién contesta los mensajes?", respuesta: "Tú o tu asistente. Te dejamos bienvenida, respuestas rápidas con precio y proceso, y un solo paso para agendar, para que contestar te tome minutos." },
  { pregunta: "¿Qué pasa con mi WhatsApp?", respuesta: "Lo revisamos en la primera semana. Alguien ya comentó que no pudo escribirte; la idea es que eso no vuelva a pasar." },
  { pregunta: "¿Qué es eso de “tu programa”?", respuesta: "Un paquete con nombre, qué incluye, cuánto dura y cuánto cuesta. Así la paciente sabe qué compra y tú no dependes de consultas sueltas. Lo definimos contigo la primera semana." },
  { pregunta: "¿Mis cuentas quedan a mi nombre?", respuesta: "Sí. Instagram, Facebook, Google y tu página quedan a tu nombre. Nosotros entramos con permisos que puedes quitar cuando quieras." },
  { pregunta: "¿Qué opción me conviene?", respuesta: "La de 6 meses: incluye tu página web, la mensualidad es más baja y febrero y marzo son los meses en que las pacientes de enero se quedan y te recomiendan." },
];

export const FAQ_VIESAINE: FaqItem[] = [
  { pregunta: "¿Cuántas publicaciones van a crear al mes?", respuesta: "Hasta cuatro piezas nuevas de campaña al mes, hablando del dolor que tiene cada paciente. Si alguien ya les hace contenido para redes, nos coordinamos para no duplicar." },
  { pregunta: "¿Esto nos puede meter en problemas con COFEPRIS?", respuesta: "Todo se anuncia a nombre de Elizabeth, con el aviso de publicidad presentado antes de publicar y su cédula visible. Revisamos cada anuncio y ustedes lo confirman con su asesor antes de que salga." },
  { pregunta: "¿Cómo funciona la agenda automática?", respuesta: "La cita queda en un calendario, un día antes el paciente recibe un recordatorio por WhatsApp y confirma o cambia con un botón. Ustedes ven todo en un solo lugar, sin marcar una por una." },
  { pregunta: "¿Tenemos que aprender un sistema difícil?", respuesta: "No. Les damos una capacitación corta y siguen usando WhatsApp y su calendario. Lo automático trabaja detrás." },
  { pregunta: "¿Quién paga los anuncios?", respuesta: "Van aparte, con su tarjeta, directo a Facebook e Instagram: recomendamos $3,000 al mes de octubre a diciembre y $4,000 en enero. Los mensajes automáticos de WhatsApp cuestan centavos y los cobra Meta." },
  { pregunta: "¿Nos garantizan pacientes?", respuesta: "No prometemos un número exacto. Sí nos comprometemos a una meta de trabajo, a medir cada semana y a ajustar rápido lo que no funcione." },
  { pregunta: "¿Y la página que ya se está haciendo?", respuesta: "Nos coordinamos. Si ya está lista, la conectamos a Google y a los anuncios. Si no, la opción de 6 meses incluye su página con Domina Google." },
  { pregunta: "¿A nombre de quién quedan las cuentas?", respuesta: "De ustedes. Facebook, Instagram, Google y la página quedan a su nombre; nosotros entramos con permisos que pueden quitar cuando quieran." },
  { pregunta: "¿Qué opción nos conviene?", respuesta: "La de 6 meses: un tratamiento toma semanas, y febrero y marzo son cuando los pacientes de enero terminan, recomiendan y dejan su opinión. Además incluye su página." },
];

// IBS (Innovación Blue Sky) · Shineray Tepic y Puerto Vallarta — tratamiento "usted".
// Debe coincidir con src/app/entregas/ibs/cotizacion/page.tsx (v2, 1-oct-2026).
export const FAQ_IBS: FaqItem[] = [
  { pregunta: "¿Esto es manejo de redes?", respuesta: "No. No cobramos por publicar. Es una campaña con objetivo comercial: que el cliente los encuentre en Google, les escriba y se suba a una unidad. El contenido que hacemos es parte de esa campaña." },
  { pregunta: "¿Por qué un nombre nuevo, si ya somos IBS?", respuesta: "IBS sigue siendo la razón social para facturar. Pero no se recuerda ni transmite nada al cliente, y “Shineray Tepic” se llaman todos los distribuidores. Un nombre propio presenta al grupo y su experiencia, como hacen los grupos automotrices fuertes." },
  { pregunta: "¿Y si no nos gusta VALTA?", respuesta: "Es una propuesta. Les damos tres opciones y ustedes eligen; si ninguna convence, trabajamos otra en la primera semana. Antes de usarla revisamos que esté libre en el IMPI y en dominios." },
  { pregunta: "¿Para qué sirve el manual de marca?", respuesta: "Para que el logo, los colores y la placa se vean igual en cada agencia, con cualquier proveedor. Evita reimpresiones, da confianza y permite abrir una plaza nueva aplicando lo que ya existe." },
  { pregunta: "¿Esto cumple con lo que pide Shineray México?", respuesta: "Sí. Las agencias quedarían como “Shineray Valta” más la plaza, que es el formato que pide planta. Lo que necesite autorización, como un rotulado, lo enviamos antes a su área de marketing." },
  { pregunta: "¿Quién paga los anuncios y cuánto?", respuesta: "Los anuncios van aparte, directo a Facebook y Google con la tarjeta de la empresa. Recomendamos de $4,000 a $5,000 por plaza al mes. Si Shineray confirma su apoyo publicitario para distribuidores, lo usamos primero ahí." },
  { pregunta: "¿Me garantizan que vamos a vender?", respuesta: "No prometemos una cifra exacta de ventas; nadie serio lo haría. Sí nos comprometemos a trabajar cada semana, a llevarle a sus asesores prospectos que usan un vehículo para trabajar y a entregarle un reporte claro cada mes." },
  { pregunta: "¿Y Ricardo?", respuesta: "Ricardo sigue al frente de la venta, y con más apoyo. Lo ponemos en los videos de la campaña, su perfil sigue siendo suyo y la campaña le lleva más prospectos." },
  { pregunta: "¿A nombre de quién quedan las cuentas y la marca?", respuesta: "De la empresa. Google, redes, WhatsApp, la web, el dominio, los correos y la marca quedan a su nombre. Nosotros entramos con permisos que ustedes pueden quitar cuando quieran." },
  { pregunta: "¿Y Guadalajara?", respuesta: "Cuando se confirme la ubicación, se suma la tercera plaza y se ajusta la tarifa mensual de operación. La identidad del grupo ya estará lista para usarse ahí." },
  { pregunta: "¿Cuánto cuesta en total?", respuesta: "$78,000 por seis meses: $13,000 al mes. Son $8,000 de operación digital y campaña en Tepic y Vallarta, y $5,000 de la identidad corporativa. Correos, dominios y soporte de TI van incluidos. Los anuncios van aparte." },
];
