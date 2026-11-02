# MEMORY.md — Shaun Nolanh

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resumí o borrá lo que ya no sirva.

## Estado actual

- Sitio Astro estático y bilingüe (EN `/`, ES `/es/`). Repo: https://github.com/shaunnolanh/Shaun-landpage (transferido desde `Va-Delivery` el 2026-11-02; SSH vía alias `github-va`, con la llave de Va-Delivery). Publicado en Cloudflare Pages: https://shaun-nolanh.pages.dev (`main`).
- **v2 en producción** (mergeada a `main` por fast-forward el 2026-11-02; la rama `v2` queda), a partir de una referencia de Figma Make de otro DJ: monocroma, Montserrat, hero con foto + "Book now" (abre el booking en un `<dialog>`), About con retrato, Music (mismo carrusel y reproductor, solo CSS), Radio Silence, redes, Contacto (tarjeta de booking + Collabs). Lighthouse 100/100 mobile y desktop.
- **v1 ("luz en la oscuridad") guardada** en el tag y la rama `v1-diseno-original` (pusheados), en `4456779`.
- Descartados: el layout asimétrico (2026-10-29) y el "layout ancho" (rama local `layout-ancho`, sin push, quedó por si sirve).
- **Press kit cargado (2026-11-02):** un zip por idioma (PDF + 3 fotos sin metadatos), 9,4 MB EN / 9,5 MB ES. El zip original queda en `references/` (fuera de git).
- Faltan: Spotify/RA/Mixcloud en redes, Beatport de los EP. La key de Web3Forms ya está en `.env` (local).

## Decisiones (y por qué)

- **Textos en TS** (paridad EN/ES por tipos). **`null` = no confirmado**; JSON-LD solo con datos confirmados.
- **v2 monocroma:** negro, `#0a0a0a` y blanco con opacidad; sin degradados de color (el violeta-naranja de la referencia se descartó). El `©` al 55 % porque el 40 % de la referencia no pasa AA.
- **Hero:** nombre y botón abajo para no tapar la cara. La foto es el LCP: `src/lib/hero-image.ts` arma el `<picture>` y la precarga con los mismos archivos. `site.heroVideo` listo para un video (Higgsfield).
- **Reproductores sin clic, pero al acercarse** (2026-10-31): cada uno carga a ~800 px de su sección (`IntersectionObserver`), así Spotify/SoundCloud no reciben la IP ni ponen cookies a quien no llega a la música. Al abrir: ~0,2 MB y 0 cookies de terceros (antes ~2,4 MB y 3). El widget de SoundCloud pegado se respeta tal cual (166 px).
- **Seguridad** (2026-10-31): CSP con `security.csp` de Astro (hashes automáticos) + `public/_headers` (Cloudflare Pages; antes `vercel.json`) para `frame-ancestors` y cabeceras. `'unsafe-eval'` solo porque la iFrame API de Spotify corre con `eval`. Sin atributos `style` en el HTML.
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
- `canvas.strokeStyle` no entiende `color-mix()`: para transparencias, `globalAlpha`.
- Fotos de iPhone: la miniatura del EXIF también tiene un marcador `FFDA`; para comparar la imagen antes/después, recorrer los segmentos del JPEG en orden.

## Pendientes

- [ ] Video del hero (Higgsfield): `site.heroVideo`.
- [ ] La escena de la mano y el cigarrillo en otro lugar (código en `v1-diseno-original`; `npm run media` regenera `public/media/`).
- [ ] Galería "In Action" y tarjetas de lugares (fotos y datos reales).
- [ ] Probar en iPhone real (diálogo, `play()` del reproductor, fundido de idioma). **Cuando llegue el dominio:** `SITE_URL=https://<dominio>` y redeploy.
- [ ] Links de Beatport de release para Case 701, Chrome Butterflies y Three of a Kind #033 (hoy, link de un tema, `TO CONFIRM`); Hibiki y Sky Burns Gold sin Beatport.
- [ ] Datos del artista: redes faltantes (llenan `sameAs` y los íconos).
- [ ] **En Cloudflare Pages (lo carga el equipo):** `SITE_URL=https://shaun-nolanh.pages.dev`, `PUBLIC_WEB3FORMS_KEY` y `NODE_VERSION=24`, y redeploy.
- [ ] **Antispam de Web3Forms (no activado, decidir):** gratis solo hCaptcha (`<div class="h-captcha" data-captcha="true">` + script `web3forms.com/client/script.js`, y en el panel "Block Spam: hCaptcha"; hay que sumar sus hosts a la CSP). Restringir al dominio, reCAPTCHA y Turnstile son Pro.
- [ ] **En el deploy:** comprobar las cabeceras de `public/_headers` con `curl -I https://shaun-nolanh.pages.dev`.
- [ ] **Hacer en GitHub (lo hace el equipo):**
  - activar la verificación en dos pasos en la cuenta;
  - activar Dependabot alerts y secret scanning en el repo;
  - proteger la rama `main` (que no se pueda hacer push forzado).
