# Allitron — Sistema de Assets

Guía canónica para agregar medios estáticos al sitio.

> **Cómo usar esta guía:**
> 1. Toma o genera el archivo en el formato indicado
> 2. Nómbralo exactamente como se indica
> 3. Cópialo a la ruta indicada bajo `public/`
> 4. Refresca — aparece automáticamente (no se requiere código adicional)

Las rutas están registradas en `src/config/assets.ts`.
Los componentes usan `OptionalImage` / `OptionalVideo` de `src/components/media/OptionalAsset.tsx`.

## Placeholders automáticos (agosto 2026)

Si un archivo todavía no existe, **no queda un hueco vacío**: se muestra una
foto real de stock (Unsplash, licencia libre) elegida por tema. Los temas
están en `PLACEHOLDER` (`src/config/assets.ts`): `product`, `app`,
`knowledge`, `analytics`, `spaceInterior`, `spaceExterior`, `workSession`,
`event`, `person`, `city`.

En cuanto colocas el archivo real en la ruta indicada, sustituye al
placeholder solo — no hay que tocar código.

> Los placeholders son temporales para presentar el sitio. Reemplázalos por
> fotos y capturas propias antes de considerarlo material definitivo.

---

## Hero (home)

| Archivo | Ruta en `public/` | Uso | Formato |
|---|---|---|---|
| `hero-portrait.png` | `assets/hero/hero-portrait.png` | Retrato/visual con efecto magnético (sigue el cursor) en el Hero del home | PNG (cargado como .png, no .webp — confirmado agosto 2026), fondo transparente recomendado |

> Quién o qué aparece aquí es tu decisión — puede ser una persona (Lups, Alejandro, equipo) o un visual de marca/producto. El código no asume nada. Recorte vertical (retrato), ~1200×1500px, sujeto centrado con espacio de sobra arriba (el efecto magnético desplaza la imagen unos px en cualquier dirección al acercar el cursor).

---

## Brand — Logo

| Archivo | Ruta en `public/` | Uso | Formato |
|---|---|---|---|
| `allitron-primary.svg` | `assets/brand/logo/allitron-primary.svg` | Logo principal (fondos oscuros) | SVG vectorial |
| `allitron-light.svg` | `assets/brand/logo/allitron-light.svg` | Navbar sobre fondo oscuro ← **agregar primero** | SVG vectorial |
| `allitron-dark.svg` | `assets/brand/logo/allitron-dark.svg` | Secciones claras / impresión | SVG vectorial |
| `allitron-mark.svg` | `assets/brand/logo/allitron-mark.svg` | Isotipo (sin wordmark), favicons | SVG vectorial |

> ⚡ **Prioridad:** `allitron-light.svg` — aparece en el Navbar automáticamente al copiarlo.

---

## Brand — Alli

Alli es el personaje de Allitron (isotipo registrado; "el chango" en conversación,
**Alli** es el nombre canónico en código — no usar "chango" ni "mascot" en el código).

**Actualizado agosto 2026:** decisión de diseño confirmada — Alli aparece en
cada cambio de sección del home (`AlliGuide`, `src/components/brand/AlliGuide.tsx`),
marcando las costuras Hero→Productos→Hub→Footer como un anfitrión que guía el
scroll. Reemplaza la restricción anterior ("no agregar en todas las secciones").
Sigue sin usarse dentro del contenido de cada sección — solo en las transiciones.

| Archivo | Ruta en `public/` | Uso | Formato |
|---|---|---|---|
| `alli-primary.png` | `assets/brand/alli/alli-primary.png` | Versión full color, transparente | PNG, fondo transparente |
| `alli-blue.png` | `assets/brand/alli/alli-blue.png` | Sobre fondo Allitron Blue | PNG |
| `alli-monochrome.png` | `assets/brand/alli/alli-monochrome.png` | Ghost / decorativo | PNG |

> Cargados como `.png` (no `.webp`) — confirmado agosto 2026.

---

## Íconos por tipo de contenido (hub de entrega — bento)

Set de 6 íconos vectoriales para identificar tipo de pieza en cualquier hub de
entrega bento (documentos, PDF, video, etc.), estilo glass/táctil ligero
consistente con la dirección visual de la marca. SVG (vectorial, no requiere
@2x/@3x).

| Archivo | Ruta en `public/` | Uso |
|---|---|---|
| `documento.svg` | `assets/brand/icons-contenido/documento.svg` | Tarjeta de documento genérico (Word, notas, etc.) |
| `pdf.svg` | `assets/brand/icons-contenido/pdf.svg` | Tarjeta de PDF |
| `video.svg` | `assets/brand/icons-contenido/video.svg` | Tarjeta de video |
| `presentacion.svg` | `assets/brand/icons-contenido/presentacion.svg` | Tarjeta de presentación/deck |
| `imagen.svg` | `assets/brand/icons-contenido/imagen.svg` | Tarjeta de imagen/foto |
| `link.svg` | `assets/brand/icons-contenido/link.svg` | Tarjeta de link externo |

> Generados como vector para que escalen limpio en cualquier tamaño de tarjeta
> bento sin pesar. Acentos alternan azul `#09AFF2` y naranja `#F2874C` sobre
> base glass navy/casi-negro, para que las tarjetas del hub se distingan entre
> sí a simple vista.

---

## Entregas — hub Valdés Menchaca Talavera (reunión Shineray 25 agosto 2026)

Videos mostrados en la reunión, referenciados desde el modal "Videos mostrados
en la reunión" del hub interno (`/entregas/valdes-menchaca-talavera`). Hasta
que se coloque el archivo real, se muestra un poster/placeholder — el modal
nunca queda vacío.

| Archivo | Ruta en `public/` | Uso |
|---|---|---|
| `video-historia-empresarial.mp4` | `assets/entregas/valdes-menchaca-talavera/video-historia-empresarial.mp4` | Video "historia empresarial" mostrado en la reunión |
| `video-historia-empresarial-poster.webp` | `assets/entregas/valdes-menchaca-talavera/video-historia-empresarial-poster.webp` | Poster/placeholder del video anterior (tema `city`) mientras no exista el .mp4 |
| `video-por-que-confiar.mp4` | `assets/entregas/valdes-menchaca-talavera/video-por-que-confiar.mp4` | Video "por qué confiar en nosotros" mostrado en la reunión |
| `video-por-que-confiar-poster.webp` | `assets/entregas/valdes-menchaca-talavera/video-por-que-confiar-poster.webp` | Poster/placeholder del video anterior (tema `spaceExterior`) mientras no exista el .mp4 |

> Registrado en `ENTREGAS.valdesMenchacaTalavera` (`src/config/assets.ts`). Al
> colocar los `.mp4` reales en esta ruta, sustituyen el poster automáticamente
> — no requiere tocar código. Este hub y su contenido son de uso interno
> (familia), protegidos por passcode server-side (`middleware.ts` +
> `ENTREGAS_CODE_FAMILIA`); no se exponen al hub de Shineray.

---

## Productos — Allitron 90

| Archivo | Ruta en `public/` | Uso |
|---|---|---|
| `hero.webp` | `assets/products/allitron-90/hero.webp` | Visual principal del producto |
| `diagnostic.webp` | `assets/products/allitron-90/diagnostic.webp` | Proceso de diagnóstico |
| `roadmap.webp` | `assets/products/allitron-90/roadmap.webp` | Roadmap de 90 días |

---

## Productos — LOCAL

| Archivo | Ruta en `public/` | Uso |
|---|---|---|
| `local-hero.webp` | `assets/products/local/local-hero.webp` | Visual principal del producto |
| `local-analysis.webp` | `assets/products/local/local-analysis.webp` | Etapa de análisis |
| `local-build.webp` | `assets/products/local/local-build.webp` | Construcción / desarrollo |
| `local-result.webp` | `assets/products/local/local-result.webp` | Resultado / lanzamiento |

---

## Productos — Segundo Cerebro

| Archivo | Ruta en `public/` | Uso |
|---|---|---|
| `hero.webp` | `assets/products/second-brain/hero.webp` | Visual principal |
| `telegram.webp` | `assets/products/second-brain/telegram.webp` | Canal de captura Telegram |
| `vault.webp` | `assets/products/second-brain/vault.webp` | Vault / Obsidian |

---

## Productos — LAZUP

| Archivo | Ruta en `public/` | Uso |
|---|---|---|
| `hero.webp` | `assets/products/lazup/hero.webp` | Visual principal |
| `conversations.webp` | `assets/products/lazup/conversations.webp` | Módulo conversaciones |
| `crm.webp` | `assets/products/lazup/crm.webp` | Módulo CRM / contactos |
| `appointments.webp` | `assets/products/lazup/appointments.webp` | Módulo citas |

---

## Hub

| Archivo | Ruta en `public/` | Uso |
|---|---|---|
| `hub-exterior.webp` | `assets/hub/hub-exterior.webp` | Fachada / exterior |
| `hub-interior-wide.webp` | `assets/hub/hub-interior-wide.webp` | Interior panorámico |
| `hub-interior-01.webp` | `assets/hub/hub-interior-01.webp` | Detalle interior 1 |
| `hub-interior-02.webp` | `assets/hub/hub-interior-02.webp` | Detalle interior 2 |
| `hub-work-session.webp` | `assets/hub/hub-work-session.webp` | Sesión de trabajo |
| `hub-event.webp` | `assets/hub/hub-event.webp` | Evento en el Hub |
| `hub-detail.webp` | `assets/hub/hub-detail.webp` | Detalle arquitectónico |
| `hub-atmosphere.mp4` | `assets/hub/hub-atmosphere.mp4` | Video loop (silencioso) |
| `hub-event-loop.mp4` | `assets/hub/hub-event-loop.mp4` | Video loop de evento |

> Formato recomendado para video: H.264 o H.265, sin audio, máx 10s loop, ≤3MB.

---

## Nayarit / Tepic

Fotografías reales de Tepic y Nayarit. Deben sentirse auténticas y urbanas.
**Evitar:** playas genéricas, clichés turísticos, stock de "México".

| Archivo | Ruta en `public/` | Uso |
|---|---|---|
| `tepic-city-01.webp` | `assets/nayarit/tepic/tepic-city-01.webp` | Vista urbana Tepic |
| `tepic-city-02.webp` | `assets/nayarit/tepic/tepic-city-02.webp` | Vista urbana alternativa |
| `tepic-street-01.webp` | `assets/nayarit/tepic/tepic-street-01.webp` | Calle / detalle urbano |
| `tepic-detail-01.webp` | `assets/nayarit/tepic/tepic-detail-01.webp` | Detalle arquitectónico / local |

---

## Eventos — 20 de Septiembre 2026

| Archivo | Ruta en `public/` | Uso |
|---|---|---|
| `event-hero.webp` | `assets/events/2026-09-20/event-hero.webp` | Hero de la landing del evento |
| `event-space.webp` | `assets/events/2026-09-20/event-space.webp` | Espacio del evento |
| `speaker-01.webp` | `assets/events/2026-09-20/speaker-01.webp` | Ponente 1 |
| `speaker-02.webp` | `assets/events/2026-09-20/speaker-02.webp` | Ponente 2 |
| `speaker-03.webp` | `assets/events/2026-09-20/speaker-03.webp` | Ponente 3 |
| `event-atmosphere.mp4` | `assets/events/2026-09-20/event-atmosphere.mp4` | Video loop del evento |

---

## Personas

| Archivo | Ruta en `public/` | Uso |
|---|---|---|
| `alejandro-valdez.webp` | `assets/people/alejandro-valdez.webp` | Perfil / foto |
| `lups.webp` | `assets/people/lups.webp` | Perfil / foto |
| `speaker-01.webp` | `assets/people/speaker-01.webp` | Speaker futuro |
| `speaker-02.webp` | `assets/people/speaker-02.webp` | Speaker futuro |

---

## Screenshots de Productos Digitales

Screenshots reales de Segundo Cerebro y LAZUP se agregarán cuando estén disponibles.
No inventar interfaces falsas — el SolutionNodeSystem sirve como fallback visual.

| Archivo futuro | Producto |
|---|---|
| `assets/products/second-brain/vault.webp` | Vault de Obsidian configurado |
| `assets/products/lazup/conversations.webp` | Vista de conversaciones LAZUP |
| `assets/products/lazup/crm.webp` | Vista CRM |

---

## Formatos recomendados

| Tipo | Formato | Notas |
|---|---|---|
| Fotografías | WebP | Calidad 85, máx 1920px ancho |
| Logos | SVG | Sin fuentes embebidas (outline paths) |
| Alli | WebP | Fondo transparente donde aplique |
| Video | MP4 (H.264) | Sin audio, loop ≤10s, ≤3MB |
| Favicons | ICO + PNG + SVG | Generados aparte con `/app/favicon.ico` |

---

## Registro central

Todas las rutas están tipadas en:

```
src/config/assets.ts
```

Componente de seguridad (no muestra broken images):

```
src/components/media/OptionalAsset.tsx
  → OptionalImage  (imágenes)
  → OptionalVideo  (videos)
```
