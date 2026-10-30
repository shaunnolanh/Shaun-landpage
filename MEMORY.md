# MEMORY.md — Shaun Nolanh

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resumí o borrá lo que ya no sirva.

## Estado actual

- Sitio Astro estático y bilingüe (EN `/`, ES `/es/`). Repo: https://github.com/Va-Delivery/Shaun-landpage (SSH vía alias `github-va`). Sin deploy todavía.
- **2026-10-29: v2 en la rama `v2`** (local, sin push), a partir de una referencia de Figma Make de otro DJ: monocroma, Montserrat, hero con foto + "Book now" (abre el booking en un `<dialog>`), About con retrato, Music (mismo carrusel y reproductor, solo CSS), Radio Silence, redes, Contacto (tarjeta de booking + Collabs). Lighthouse 100/100 mobile y desktop.
- **v1 ("luz en la oscuridad") guardada** en el tag y la rama `v1-diseno-original` (pusheados), en `4456779` = `main`. `main` no se toca hasta aprobar la v2.
- Descartados: el layout asimétrico (2026-10-29) y el "layout ancho" (rama local `layout-ancho`, sin push, quedó por si sirve).
- Faltan: press kit, key de Web3Forms, Spotify/RA/Mixcloud en redes, Beatport de los EP.

## Decisiones (y por qué)

- **Textos en TS** (paridad EN/ES por tipos). **`null` = no confirmado**; JSON-LD solo con datos confirmados.
- **v2 monocroma:** negro, `#0a0a0a` y blanco con opacidad; sin degradados de color (el violeta-naranja de la referencia se descartó). El `©` al 55 % porque el 40 % de la referencia no pasa AA.
- **Hero:** nombre y botón abajo para no tapar la cara. La foto es el LCP: `src/lib/hero-image.ts` arma el `<picture>` y la precarga con los mismos archivos. `site.heroVideo` listo para un video (Higgsfield).
- **Booking en `<dialog>` nativo**, una sola vez en el HTML; sin JS, los botones van a `#contact` (email).
- **About:** solo `about.long` (el `short` repite su comienzo). Dos columnas desde 64rem; en tablet la columna de la bio quedaba muy angosta.
- **Menú:** hamburguesa hasta 64rem (a 768 no entran cuatro links + EN/ES).
- **Carrusel:** `.cf__track` con `position: relative` (el script centra con `offsetLeft`; en v1 lo resolvía de rebote `.music__tracks`).
- **Spotify sin app (sin Premium):** se usa **oEmbed** público; artistas, sello y año van a mano. `loadEntity` corta la reproducción: si sonaba, `play()` en el siguiente `ready`.
- **Beatport bloquea bots (Cloudflare)**: no se lee beatport.com; los datos los pegó el equipo.
- **Email:** fuera del JSON-LD (sería texto plano en el HTML).

## Aprendizajes y errores a evitar

- Medir con `puppeteer-core` en el scratchpad (se borra entre días: reinstalar). El dev server del usuario puede estar en 4321: medir el build con `astro preview --port 4322`.
- **El minificador fusiona `animation` + `animation-timeline` en un shorthand inválido**: usar longhands.
- **`astro check`: leer la línea `- N errors`**, no hacer `tail`.
- **Editar i18n con reemplazos exactos y `assert`** (un `re.sub` mal armado ya copió el archivo entero adentro).
- Estilos inyectados en capturas para probar variantes: los de Astro tienen más especificidad (usar `!important` solo en la prueba).
- El widget de Spotify tarda en pintarse: capturas antes de ~10 s lo muestran angosto.
- `canvas.strokeStyle` no entiende `color-mix()`: para transparencias, `globalAlpha`.

## Pendientes

- [ ] Revisar la v2 (capturas) y, con OK, push de `v2` y merge a `main`.
- [ ] Video del hero (Higgsfield): `site.heroVideo`.
- [ ] La escena de la mano y el cigarrillo en otro lugar (código en `v1-diseno-original`; `npm run media` regenera `public/media/`).
- [ ] Galería "In Action" y tarjetas de lugares (fotos y datos reales).
- [ ] Deploy de preview en Vercel; probar en iPhone real (diálogo, `play()` del reproductor, fundido de idioma). **Cuando llegue el dominio:** `SITE_URL=https://<dominio>` y redeploy.
- [ ] Links de Beatport de release para Case 701, Chrome Butterflies y Three of a Kind #033 (hoy, link de un tema, `TO CONFIRM`); Hibiki y Sky Burns Gold sin Beatport.
- [ ] Confirmar "Gai Barone" en la bio (el texto del equipo decía "Guy Barone").
- [ ] Datos del artista: redes faltantes (llenan `sameAs` y los íconos), press kit, key de Web3Forms.
