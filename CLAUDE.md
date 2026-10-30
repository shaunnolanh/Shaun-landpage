# CLAUDE.md — Shaun Nolanh

Landing page / EPK de **Shaun Nolanh**, un productor y DJ argentino radicado en La Falda. Su sonido se inscribe en el progressive house, con un perfil tribal y percusivo: grooves rodantes, bajos profundos y atmósferas que se van desarrollando a lo largo del set. Entre sus influencias se encuentran Robert Babicz y Roy Rosenfeld.
Su trabajo recibió el apoyo de Gai Barone, leyenda italiana y una de las figuras de referencia del progressive house a nivel mundial, con más de 650 producciones publicadas en sellos como Renaissance, Armada, Perfecto y Black Hole Recordings.
En 2025 debutó en 3rd Avenue, sello del grupo belga Sound Avenue dirigido por Madloch, con dos temas originales en la serie Three Of A Kind #033. Ese mismo año volvió al catálogo con Chrome Butterflies EP, un trabajo de tres temas junto a Stan Seba, productor alemán radicado en Corea del Sur y artista habitual del grupo Sound Avenue. En 2026 publicó “I Drove All Night to Feel This” en el sello británico BBop Music. También firmó un remix de “Paul’s Tape” de Valentin Ciancio, para 3rd Avenue, un lanzamiento que fue reseñado por el portal internacional Electronic Groove.
Entre sus próximos lanzamientos se encuentran nuevas colaboraciones con Stan Seba y con Praneeth.D, DJ y productor de Colombo, Sri Lanka, con trabajos en sellos como BCSA y 3rd Avenue.

**Versión 2 (rama `v2`):** diseño monocromo tomado de una referencia de Figma Make de otro DJ (solo el diseño: ningún texto, foto, mail ni link de ese artista). El diseño original "luz en la oscuridad" está en el tag y la rama `v1-diseno-original`.

## Stack y estructura

- Astro (sitio estático) con CSS propio, sin framework de UI. Deploy en Vercel.
- Bilingüe: EN es el idioma principal y va en `/`; ES va en `/es/`.
- `src/pages/index.astro` y `src/pages/es/index.astro` renderizan `src/components/HomePage.astro` y solo le pasan el prop `lang`.
- Orden: Header · Hero · About · Music · Radio Silence (`Sets`) · Redes (`Socials`) · Contacto (`Contact`) · Footer, más `BookingDialog` (el formulario de booking, una sola vez en el HTML).
- Cada sección recibe `lang` y llama a `useTranslations(lang)` (`src/i18n/utils.ts`). El ruteo usa el i18n nativo de Astro (`prefixDefaultLocale: false`). `Base.astro` emite el canonical y los `hreflang`, y tiene un slot `head` para precargas de la página (la foto del hero).
- JS mínimo, en un `<script>` inline chico dentro de cada componente: header (fondo al scrollear, menú mobile), diálogo de booking, carga de embeds, envío de formularios y email ofuscado.
- Al recargar o volver con atrás/adelante, la página arranca arriba (script `is:inline` al principio del `<head>` en `Base.astro`). Un link nuevo con `#sección` se respeta y la bfcache no se toca.

## Convenciones

- Responder en español. Código e identificadores en inglés. Explicar el porqué de cada decisión.
- **Todo el texto visible vive en `src/i18n/en.ts` / `es.ts`.** Nunca hardcodear texto en componentes.
- El español es rioplatense (voseo) y se escribe directamente en español, no como traducción literal del inglés.
- Mobile first: el hero entra completo en 375×667 y no puede haber scroll horizontal.

## Datos y contenido

- `src/data/site.ts`: URL del press kit, email de booking, `heroVideo` y redes. `src/data/music.ts`: lanzamientos del carrusel, remixes/próximos y sets de Radio Silence.
- **`null` significa "todavía no confirmado".** El componente muestra entonces un marcador visible, por ejemplo `<span class="pending">[RELEASE PENDIENTE]</span>`.
- Nunca inventar releases, sellos, fechas, supports ni citas. Si un dato no está confirmado, el campo queda en `null`.
- Los archivos de i18n son TS, no JSON, para poder dejar comentarios "TO CONFIRM" al lado de los datos sin verificar.
- About muestra los tres párrafos de `about.long`; `about.short` repite su comienzo y no se muestra (queda para el press kit).

## Diseño monocromo (fácil equivocarse)

- `src/styles/tokens.css` tiene la **paleta cerrada: negro `#000`, neutral-950 `#0a0a0a` y blanco**. Todo gris es blanco con opacidad (`color-mix()`), en tokens: texto `--text` (100 %), `--text-80`, `--text-70` (párrafos), `--text-60` (subtítulos, labels), `--text-55` (lo más chico); líneas `--line` (10 %), `--line-strong` (20 %), `--line-hover` (30 %); rellenos `--fill` (10 %) y `--fill-hover` (20 %). No agregar colores ni escribir hex en otros archivos. **Nada de degradados de color** (los degradados son solo de negro).
- Contraste: el 70 % y el 60 % pasan AA con margen; **el 40 % no pasa** (por eso el `©` va a `--text-55`).
- Fuente única: **Montserrat** (`@fontsource-variable/montserrat`, 400–900, self-hosted). Solo se precarga el subset latin. La escala es la de Tailwind (`--text-xs` … `--text-4xl`; el nombre del hero, `--text-hero`, va de 6xl a 9xl).
- Contenedores: header y footer `.container` (80rem); About `.container--5xl` (64rem); Music, Radio Silence y Contacto `.container--4xl` (56rem). `--gutter` 1.5rem.
- Secciones (`.section`): padding vertical de 5rem (8rem desde 48rem) y línea arriba al 10 %; alternan negro (`.section`) y neutral-950 (`.section--alt`): About alt · Music negro · Radio Silence alt · Redes negro · Contacto alt · Footer negro.
- Títulos de sección (`.section__title`): chicos, centrados, en mayúsculas, tracking cerrado y mucho aire debajo. La bajada (`.section__lead`), centrada y al 70 %.
- Radios: `--radius` (0.625rem) en tarjetas, inputs y botones; `--radius-2xl` (1rem) en la tarjeta destacada de booking, el diálogo y el recuadro del set.
- Botones: `.btn` (borde al 20 %) y `.btn--solid` (blanco con texto negro): el del hero ("Book now") y los de enviar formulario. `.card` = tarjeta secundaria (borde al 10 %).
- Utilidades en `global.css`: `.container(--5xl/--4xl)`, `.section(--alt)`, `.section__title`, `.section__lead`, `.label`, `.mono` (línea chica de datos; el nombre viene de la v1 para no tocar el marcado del carrusel), `.pill`, `.pending`, `.card`, `.btn(--solid)`, `.reveal`, `.visually-hidden`.
- Breakpoints: 48rem (tipografía y padding) y 64rem (menú completo en vez de hamburguesa, About en dos columnas).
- Nada de clichés de "web de DJ": neón, ecualizadores de stock, fotos de bandejas con humo. Las imágenes de referencia son solo inspiración y nunca se publican.

## Animaciones (fácil equivocarse)

- Solo `transform` y `opacity`. Hovers de 300 ms (`--duration`, `--ease`) en links, tarjetas e íconos.
- Entrada al hacer scroll: clase `.reveal` (aparece y sube 1.5rem). **El estado oculto lo agrega solo JS** (`src/scripts/reveal.ts` pone `data-reveal`): sin JS, todo se ve. La lista de remixes usa la misma idea, en cascada.
- El carrusel usa `animation-timeline: view(inline)` dentro de `@supports`. **Escribir `animation-name` / `-timing-function` / `-fill-mode` / `-timeline` por separado**: el minificador junta `animation` + `animation-timeline` en un shorthand que los navegadores descartan.
- Scroll suave a las secciones (`scroll-behavior: smooth`).
- `prefers-reduced-motion`: sin entradas, sin 3D en el carrusel, sin scroll suave y sin video en el hero.
- Cambio de idioma con View Transitions nativas (`@view-transition` en `global.css`). **No usar `<ClientRouter />`**: cambia cómo corren los scripts inline.

## Header, hero y diálogo de booking

- **Header** (`Header.astro`): fijo. Sin JS es negro al 95 % con blur; con JS es transparente sobre el hero y pasa a negro al 95 % pasados los 20 px. Links About · Music · Radio Silence · Contact + EN/ES; por debajo de 64rem, hamburguesa con menú desplegable. Marca la sección activa con `aria-current`.
- **Hero** (`Hero.astro`): pantalla completa con `shaun-hero.jpg` de fondo (`object-position` 55 % 35 % en mobile, 50 % 30 % desde 48rem), degradado negro 60 % → 40 % → sólido, y nombre, tagline y botón abajo para no tapar la cara.
  - La foto es el LCP: `src/lib/hero-image.ts` genera AVIF/WebP/JPEG con `getImage`, y `HomePage` precarga el mismo AVIF por el slot `head` de `Base`. Si se cambian anchos o formatos, tienen que coincidir los dos.
  - **Video de fondo:** `site.heroVideo` (hoy `null`). Con una URL, el hero suma un `<video autoplay muted loop playsinline>` con la foto como `poster`; con reduced motion se ve la foto.
- **Diálogo de booking** (`BookingDialog.astro`): `<dialog>` nativo con el `ContactForm variant="booking"`. Lo abre cualquier `[data-open-booking]` (el "Book now" del hero y "Request a date" en Contacto). Foco al primer campo al abrir y de vuelta al botón al cerrar; se cierra con Esc, con la X y con clic afuera (el clic cae en el `<dialog>`, fuera de `.booking-dialog__panel`). Sin JS, esos links van a `#contact`, donde está el email.

## Embeds, formularios y email

- **Embeds** (`Embed.astro`): son fachadas que cargan al hacer clic (play blanco). El iframe de Beatport, SoundCloud, Spotify o Mixcloud se crea recién en el clic, así que el HTML inicial tiene que tener cero iframes.
  - SoundCloud se normaliza al modo `visual` (oscuro) con el acento leído de `--white` en `tokens.css`.
  - Beatport bloquea el acceso automático: los datos los pega el equipo (código Embed o lista de tracks); no intentar leer beatport.com.
  - En `src/data/music.ts` se pega en `link` el link normal del track/set (en Beatport, la página del track o su código Embed) (Compartir → Copiar link), el `src` del iframe o el `<iframe>` completo. `toEmbed` (`src/data/embed.ts`) detecta la plataforma, arma la URL del reproductor y su altura.
  - Links cortos (`on.soundcloud.com`, `spotify.link`) o desconocidos frenan el build con un mensaje: hay que pegar la URL larga.
- **Sets de Radio Silence** (`Sets.astro`, `sets` en `src/data/music.ts`): cada set es un `Embed` (`link` + `title`), sin fecha ni lugar, en un recuadro (borde al 20 %, fondo negro al 40 %, `--radius-2xl`), SoundCloud en modo visual de 300 px. Para sumar otro, agregar un objeto a `sets`.
- **Redes** (`Socials.astro`): fila centrada de íconos redondos (SVG inline) con las redes de `socials` en `site.ts` que tengan link y un ícono definido. Para sumar una red, completar su `url` (y su ícono, si no está).
- **Contacto** (`Contact.astro`): tarjeta destacada de booking (email grande, press kit, "Request a date") y, debajo, el formulario de Collabs en una `.card`.
- **Formularios** (`ContactForm.astro`, `variant: 'booking' | 'collab'`): envían por POST a Web3Forms.
  - La key sale de `PUBLIC_WEB3FORMS_KEY` (ver `.env.example`). Sin la key, el botón de enviar queda deshabilitado y se muestra un marcador pendiente.
  - El honeypot es el campo oculto `botcheck`.
  - Con JS se envía por fetch (al terminar, una chispa blanca); sin JS, cae a un POST normal.
- **Email de booking**: nunca aparece como texto plano. `ObfuscatedEmail.astro` guarda las partes invertidas y las une con JS (`mailto` con asunto).

## Music: carrusel + reproductor de Spotify

- **Carrusel** (`TrackCarousel.astro`): coverflow nativo, sin dependencias. `scroll-snap` para el swipe, el giro 3D con `animation-timeline: view(inline)` dentro de `@supports` (longhands), reflejo con `-webkit-box-reflect`. Un script chico convierte cada portada en botón "Seleccionar …", maneja flechas/teclado y emite `track:change`. Sin JS: fila de links a Spotify. Reduced motion: sin 3D.
  - El script centra con `slide.offsetLeft`: `.cf__track` tiene `position: relative` para ser el `offsetParent` de las portadas. Sin eso, el carrusel arranca en otra portada en desktop.
- **Reproductor** (`SpotifyPlayer.astro`): Spotify iFrame API, cargada recién en la primera interacción. Cambiar de portada → `loadEntity(url?theme=0)` (álbum o tema); `loadEntity` corta la reproducción, así que si estaba sonando se llama `play()` en el siguiente `ready`. La fachada es `Embed.astro` en modo `controlled`. El reproductor de Spotify queda visible (términos de Spotify); si la API falla o tarda 8 s, link "Escuchar en Spotify".
- **Sin app de Spotify:** la Web API exige que el dueño tenga Premium. Se usa **oEmbed** (público): `npm run spotify:sync` baja título y portada (640 px, por un prefijo no documentado del CDN; si falla, 300 px) a `src/assets/covers/` y escribe `src/data/spotify-tracks.json` (commiteado). En Vercel corre en `prebuild` y nunca frena el deploy; en local es manual.
- **Una portada por lanzamiento** (single, EP o álbum): `carouselReleases` en `src/data/music.ts`. Debajo de la portada van título, artistas y una línea `EP · Dublucid · 2026`. `selfReleased: true` = sin sello (no se muestra sello ni marcador). EP/álbum → embed de álbum de 352 px (con la lista de temas); single → embed compacto de 152 px; el alto se reserva en `.sp__stage` y cambia con una transición.
  - Lanzamientos compartidos con otros artistas (p. ej. *Three of a Kind #033*, compilado del sello): `ownTracks` con los temas de Shaun. El reproductor toca solo esos, uno por uno (embed compacto + botones para elegir el tema).
- **Cómo sumar un lanzamiento al carrusel:**
  1. En `carouselReleases`, agregar `{ title, type, artists, label (o selfReleased: true), year, spotify, beatport, tracks }` en su lugar (de lo más nuevo a lo más viejo). `spotify` = link del álbum/EP (Compartir → Copiar link del álbum) o, si es single, el del tema; sirve con `intl-es/` y `?si=`. `beatport` = link del release o `null`. `tracks` = títulos de los temas de Shaun (van en el `alt`). Título, tipo, artistas, sello y año van a mano: oEmbed no los da.
  2. `npm run spotify:sync` → baja la portada (una por lanzamiento, `<slug del título>.jpg`) y completa el JSON.
  3. `npm run build`, revisar y commitear `music.ts`, el JSON y la portada nueva.
  - `hide: true` lo saca del carrusel; `initialRelease` define la portada inicial (hoy el EP *Case 701*).
- **Lista de abajo** (`releases`): solo remixes y próximos ("Remixes & Coming soon").

## Fotos e imagen para compartir

- `src/assets/photos/`: `shaun-hero.jpg` (hero) y `shaun-retrato.jpg` (About, recortada a 4:5 con `<Picture>` AVIF/WebP). Las dos en blanco y negro, de 2576×1932.
- **`public/og.png` y `public/apple-touch-icon.png` se generan con `npm run og` (`scripts/make-og.sh` + `scripts/og/*.html`, Chrome headless). La tarjeta usa el retrato. Nunca editarlos a mano: cambiar la plantilla y regenerar.**

## Fuera de la v2 (por ahora)

- **La escena de la mano y el cigarrillo, y el video del footer.** Se van a sumar en otro lugar. El código está en el tag `v1-diseno-original`; el video de origen (`src/assets/video/hand-drop-source.mp4`, no entra al build) y `scripts/make-media.sh` siguen en el repo. `public/media/` se regenera con `npm run media` (usa `ffmpeg-static`).
- La galería "In Action" y las tarjetas de lugares.

## Forma de trabajar

- Hacer solo lo que se pide: no agregar funcionalidades por cuenta propia.
- Cambios chicos y enfocados; no reescribir lo que ya funciona.
- Al terminar, resumir qué cambió y qué decisiones hay que revisar.

## Límites

- ✅ Siempre:
  - mantener la paridad de claves EN/ES y respetar la paleta cerrada monocroma;
  - dejar en `null` lo que no esté confirmado;
  - trabajar solo dentro de la carpeta del repositorio.
  - actualizar `MEMORY.md` al terminar cada tarea.
- ⚠️ Preguntar antes: borrar archivos, hacer deploy a producción, conectar un dominio o registrarse en servicios.
- 🚫 Nunca:
  - hacer commit o push si no se pide;
  - inventar datos del artista;
  - escribir fuera de la carpeta del proyecto;
  - publicar las imágenes de referencia ni usar textos, fotos, mails o links del artista de la referencia.

## Git

- Repo: `Va-Delivery/Shaun-landpage` en GitHub. `main` = v1 publicada; la v2 se trabaja en la rama `v2` y se mergea a `main` cuando se apruebe. Diseño original: tag y rama `v1-diseno-original`. Remoto por SSH con el alias `github-va` de `~/.ssh/config`: `git@github-va:Va-Delivery/Shaun-landpage.git`.
- Commits solo cuando se piden; push solo cuando se pide explícitamente.
- Mensajes claros, en inglés y en imperativo: una primera línea corta con el qué ("Add booking form validation") y, si hace falta, un cuerpo con el porqué.
- Antes de cada commit, revisar `git status` / `git diff --cached`: nada de secretos (`.env`), material de terceros (`references/`) ni archivos pesados innecesarios.

## Verificación

```sh
npm run dev            # servidor de desarrollo con HMR (http://localhost:4321)
npm run build          # build estático en dist/
npx astro check        # type-check; también hace cumplir la paridad de claves EN/ES
npx astro preview      # sirve dist/. En Astro 7 corre como daemon: frenarlo con `npx astro preview stop`
```

- No hay tests ni linter. Para verificar un cambio: `build` + `astro check`, y después mirar el sitio en el navegador a 375 px y 1440 px.
- `chrome --headless --window-size=375,...` **no** da un viewport real de 375 px: la captura se ve recortada aunque la página esté bien.
- Para chequear de verdad el viewport (ancho de scroll, orden de foco con Tab, capturas), usar `puppeteer-core` apuntando a `/Applications/Google Chrome.app`. Instalarlo en el scratchpad de la sesión, no en el proyecto.
- Lighthouse: `CHROME_PATH=... npx lighthouse`. Objetivo: ≥ 90 en performance y accesibilidad.
- Entorno: Mac mini 2011 con macOS 12 Monterey y Node 24. Astro 7 necesita Node ≥ 22.12. Verificar la compatibilidad antes de agregar herramientas.

## Memoria

- Al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones
  tomadas.
- Al terminar una tarea, actualízalo: estado actual, decisiones importantes (con su
  porqué) y errores a evitar.
- Mantenlo breve (máximo ~50 líneas): resume o elimina lo que ya no aporte.
- Si algo se convierte en una regla permanente, propón moverlo a `AGENTS.md` en lugar de
  dejarlo en la memoria.
- No guardes nunca datos sensibles (claves, tokens, datos personales).
