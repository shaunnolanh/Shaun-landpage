// Music data. Don't invent anything: if a field isn't confirmed, leave it `null`
// and the site shows a placeholder.
//
// CÓMO CARGAR UN SET (sets de Radio Silence):
//   En SoundCloud, Spotify o Mixcloud: Compartir → Copiar link, y pegalo en `link`, entre comillas.
//   También sirve pegar el código <iframe …> de "Embed" completo. La plataforma se detecta sola.
//   Ejemplo: link: 'https://soundcloud.com/shaunnolanhmusic/nombre-del-track',
//   No uses links cortos (on.soundcloud.com, spotify.link): abrilos en el navegador y copiá la URL larga.
//   Si el link no se reconoce, `npm run build` frena y explica qué falta (ver src/data/embed.ts).

export type Embed = {
  /** Track/set link, iframe src or full <iframe> code. `null` = pending. */
  link: string | null;
  /** Shown on the play button. `null` = generic "Play". */
  title: string | null;
};

/**
 * Something not out yet. The site shows "ID" (the scene's word for an unreleased track) instead of a title,
 * and the artists: no track names, label, year or "upcoming" tag (the whole list is upcoming). `kind` is for
 * us, it isn't shown.
 */
export type UpcomingRelease = {
  artists: string;
  kind: 'remix' | 'collab';
};

// ─── Carousel (Music): Shaun's releases (singles, EPs, albums and released remixes), one cover each ─
// CÓMO SUMAR UN LANZAMIENTO: agregalo acá (de lo más nuevo a lo más viejo) con el link de Spotify del
// álbum/EP (Compartir → Copiar link del álbum) o, si es un single, el del tema; corré `npm run spotify:sync`
// (baja la portada a src/assets/covers/ y completa src/data/spotify-tracks.json) y commiteá todo.
// Título, tipo, artistas, sello y año van a mano (oEmbed no los da).
export type CarouselRelease = {
  title: string;
  type: 'single' | 'EP' | 'album';
  artists: string;
  /** `null` = pending. Self-released records use `selfReleased` instead (no label shown, no placeholder). */
  label: string | null;
  selfReleased?: true;
  year: number | null;
  /** open.spotify.com/album/… (EP/album) or /track/… (single). `null` = pending ("Spotify pending"). */
  spotify: string | null;
  /** beatport.com link of the release, if any */
  beatport: string | null;
  /** Shaun's tracks on it (cover alt text) */
  tracks: string[];
  /**
   * Only for releases shared with other artists (e.g. a label compilation): Shaun's tracks on Spotify.
   * The player plays these one by one (compact embed + a track switch) instead of the whole album.
   */
  ownTracks?: { title: string; spotify: string }[];
  /** true = keep it out of the carousel */
  hide?: boolean;
};

// Titles, types and track counts: Spotify's public album pages (2026-10-27). Labels/years: Beatport list + team.
export const carouselReleases: CarouselRelease[] = [
  {
    title: 'Hibiki',
    type: 'EP',
    artists: 'Shaun Nolanh',
    label: 'Dublucid',
    year: 2026,
    spotify: 'https://open.spotify.com/album/4jzqq1ubygzFTSCu9jJBYY?si=9vnQLOYaQYKIIWX5oks3bg',
    beatport: null,
    tracks: ['Hibiki', 'Hyōka', 'Kasumi'],
  },
  {
    title: 'Sky Burns Gold',
    type: 'single',
    artists: 'Shaun Nolanh',
    label: null,
    selfReleased: true,
    year: 2026,
    spotify: 'https://open.spotify.com/intl-es/track/6mQ9MUjChsWguS0CQNRqEJ?si=7b7ac38699024580',
    beatport: null,
    tracks: ['Sky Burns Gold'],
  },
  {
    title: 'Case 701',
    type: 'EP',
    artists: 'Stan Seba, Shaun Nolanh',
    label: '3rd Avenue',
    year: 2026,
    spotify: 'https://open.spotify.com/album/2pp4VLWjwM4tD9gjK5Erby?si=thZxRqESSlGW53tKGeqLEg',
    // TO CONFIRM: track link until the team sends the EP's Beatport link
    beatport: 'https://www.beatport.com/track/case-701/30654526',
    tracks: ['Ultimate Desire', 'Case 701'],
  },
  {
    // Out on 2026-10-05 (Spotify), between Case 701 and I Drove All Night
    title: "Paul's Tape (Shaun Nolanh Remix)",
    type: 'single',
    artists: 'Valentín Ciancio',
    label: '3rd Avenue',
    year: 2026,
    spotify: 'https://open.spotify.com/track/32RzcH0HqLePY1f8gvJ0NN',
    beatport: 'https://www.beatport.com/track/pauls-tape/30654134',
    tracks: ["Paul's Tape (Shaun Nolanh Remix)"],
  },
  {
    title: 'I Drove All Night to Feel This',
    type: 'single',
    artists: 'Shaun Nolanh',
    label: 'BBop Music',
    year: 2026,
    spotify: 'https://open.spotify.com/intl-es/track/5Xd1cOtJfvpVCzQig19BhB?si=f56e0b6b06814488',
    beatport: 'https://www.beatport.com/track/i-drove-all-night-to-feel-this/22474582',
    tracks: ['I Drove All Night to Feel This'],
  },
  {
    title: 'Chrome Butterflies',
    type: 'EP',
    artists: 'Stan Seba, Shaun Nolanh',
    label: '3rd Avenue',
    year: 2025,
    spotify: 'https://open.spotify.com/album/4AA7GiRnGb5ojIdriLQAmj?si=SiY9R8bKR9GQvdAe33LHhA',
    // TO CONFIRM: track link (Through the Loss) until the team sends the EP's Beatport link
    beatport: 'https://www.beatport.com/track/through-the-loss/22465564',
    tracks: ['Chrome Butterflies', 'Magnetic Bloom', 'Through the Loss'],
  },
  {
    title: '300 Mg',
    type: 'single',
    artists: 'Shaun Nolanh',
    label: 'Mustache Crew Records',
    year: 2025,
    spotify: 'https://open.spotify.com/intl-es/track/7tHv1n8k9h7ZLupRcJTeq6?si=117ebc8225034d47',
    beatport: 'https://www.beatport.com/track/300-mg/20939457',
    tracks: ['300 Mg'],
  },
  {
    // Label EP with six tracks by three artists: only Shaun's two are played.
    title: 'Three of a Kind #033',
    type: 'EP',
    artists: 'Shaun Nolanh',
    label: '3rd Avenue',
    year: 2025,
    spotify: 'https://open.spotify.com/album/6qoFARj1zn1GYSP2K3hZK6?si=z90a0rBzSpmFE0pHfrx0vA',
    // TO CONFIRM: track link (Innocent Spt) until the team sends the EP's Beatport link
    beatport: 'https://www.beatport.com/track/innocent-spt/30470069',
    tracks: ['Innocent Spt', 'Groove You Wish You Made'],
    ownTracks: [
      { title: 'Innocent Spt', spotify: 'https://open.spotify.com/intl-es/track/0Y1UkChFJECfD3NpKSQVBU?si=678361d3fa3f49c6' },
      { title: 'Groove You Wish You Made', spotify: 'https://open.spotify.com/intl-es/track/7Max98kkWKi1h9PQTTh8Lh?si=a428123d030a43de' },
    ],
  },
];

/** The carousel starts on this release. */
export const initialRelease = 'Case 701';

/** Kind and id from any open.spotify.com album/track link (intl-xx/, embed/, ?si=… all accepted). */
export const spotifyEntity = (link: string) => {
  const match = link.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(?:embed\/)?(album|track)\/([A-Za-z0-9]+)/);
  return match ? { kind: match[1] as 'album' | 'track', id: match[2] } : null;
};

/** Canonical link (the key in spotify-tracks.json and the player's URL), or `null`. */
export const spotifyUrl = (link: string | null) => {
  const entity = link ? spotifyEntity(link) : null;
  return entity ? `https://open.spotify.com/${entity.kind}/${entity.id}` : null;
};

/** File name for a release's cover in src/assets/covers/ (shared by the sync script and the carousel). */
export const coverSlug = (title: string) =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const beatportProfile = 'https://www.beatport.com/artist/shaun-nolanh/1291888';

// List under the carousel: only what's coming (remixes, collabs…), newest first. Once out, a release moves
// to the carousel (`carouselReleases`).
export const upcoming: UpcomingRelease[] = [
  { artists: 'D.Akkord', kind: 'remix' },
  // Neverl3vel (Shaun Nolanh Remix): the title isn't shown until it's out
  { artists: 'Roberto Caceres & Jose Tabarez', kind: 'remix' },
  { artists: 'Shaun Nolanh & Praneeth.D', kind: 'collab' },
];

// Radio Silence: one set for now, full width. Add more objects here as new sets come out
// (the first one keeps the section's light).
export const sets: Embed[] = [
  {
    // Embed code pasted by the team (SoundCloud → Share → Embed, 2026-10-29): used as is (classic 166px player).
    link: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay; encrypted-media" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2407457895&color=%231a1c1c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>',
    title: 'Radio Silence – Best Warm Up',
  },
];
