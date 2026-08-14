# Allitron — Sistema de Assets

Guía canónica para agregar medios estáticos al sitio.

> **Cómo usar esta guía:**
> 1. Toma o genera el archivo en el formato indicado
> 2. Nómbralo exactamente como se indica
> 3. Cópialo a la ruta indicada bajo `public/`
> 4. Refresca — aparece automáticamente (no se requiere código adicional)

Las rutas están registradas en `src/config/assets.ts`.
Los componentes usan `OptionalImage` / `OptionalVideo` de `src/components/media/OptionalAsset.tsx`,
que muestran el asset si existe y ocultan elegantemente si no.

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

Alli es el personaje de Allitron. Nombre canónico en código: **Alli** (no "chango", no "mascot").
Aparece en puntos estratégicos: Hub, eventos, empty states, microinteracciones.
**No agregar en todas las secciones.**

| Archivo | Ruta en `public/` | Uso | Formato |
|---|---|---|---|
| `alli-primary.webp` | `assets/brand/alli/alli-primary.webp` | Versión full color, transparente | WebP, fondo transparente |
| `alli-blue.webp` | `assets/brand/alli/alli-blue.webp` | Sobre fondo Allitron Blue | WebP |
| `alli-monochrome.webp` | `assets/brand/alli/alli-monochrome.webp` | Ghost / decorativo | WebP |

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
