// Turns whatever gets pasted into `link` (src/data/music.ts) into a player the facade can load:
// a normal Beatport / SoundCloud / Spotify / Mixcloud link, the iframe `src`, or the whole `<iframe …>` code.
// Runs at build time: an unknown or short link stops the build with a clear message.
import tokens from '../styles/tokens.css?raw';

export type Provider = 'beatport' | 'soundcloud' | 'spotify' | 'mixcloud';

// SoundCloud's accent color (play button, waveform) = the site's white. Read from the tokens,
// so the palette keeps a single source of truth and no hex lives outside tokens.css.
const WHITE = tokens.match(/--white:\s*#([0-9a-fA-F]{6}|[0-9a-fA-F]{3});/)?.[1];
if (!WHITE) throw new Error('[embed] --white not found in src/styles/tokens.css');
// SoundCloud wants the 6-digit form: #fff → #ffffff
const ACCENT = `#${WHITE.length === 3 ? [...WHITE].map((c) => c + c).join('') : WHITE}`;

/** Dark "visual" player (cover art as background) with the site's white accent. */
function soundcloudPlayer(trackUrl: string): Player {
  const params = new URLSearchParams({
    url: trackUrl,
    color: ACCENT,
    visual: 'true',
    hide_related: 'true',
    show_comments: 'false',
    show_user: 'false',
    show_reposts: 'false',
    show_teaser: 'false',
  });
  return { provider: 'soundcloud', name: 'SoundCloud', src: `https://w.soundcloud.com/player/?${params}`, height: 300 };
}

export type Player = {
  provider: Provider;
  /** Display name, for the "Loads the player from …" note */
  name: string;
  /** iframe src (autoplay is added on click, in Embed.astro) */
  src: string;
  /** iframe height in px, reserved by the facade so nothing jumps */
  height: number;
};

const SHORT_LINKS = ['on.soundcloud.com', 'spotify.link', 'm.mixcloud.com'];

export function toEmbed(input: string): Player {
  const raw = extractUrl(input.trim());
  // Height of a pasted <iframe height="…">, if any (pasted widgets keep it)
  const pastedHeight = Number(input.match(/height\s*=\s*["']?(\d+)/i)?.[1]) || null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`[embed] Not a link: "${input}". Paste the track/set link (Share → Copy link) or the embed code.`);
  }
  const host = url.hostname.replace(/^www\./, '');

  if (SHORT_LINKS.includes(host)) {
    throw new Error(
      `[embed] Short link "${raw}" can't be resolved at build time. Open it in the browser and paste the long URL instead.`,
    );
  }

  // Beatport: the embed URL as is, or a track page (beatport.com/track/<slug>/<id>) turned into one
  if (host === 'embed.beatport.com' && url.searchParams.get('id')) {
    return { provider: 'beatport', name: 'Beatport', src: url.href, height: 162 };
  }
  if (host === 'beatport.com') {
    const id = url.pathname.match(/^\/track\/[^/]+\/(\d+)/)?.[1];
    if (id) return { provider: 'beatport', name: 'Beatport', src: `https://embed.beatport.com/?id=${id}&type=track`, height: 162 };
  }

  // SoundCloud: a pasted widget (Share → Embed) is used as is, with its own parameters and height;
  // a track/set page is wrapped in our dark "visual" player
  if (host === 'w.soundcloud.com' && url.searchParams.get('url')) {
    return { provider: 'soundcloud', name: 'SoundCloud', src: url.href, height: pastedHeight ?? 166 };
  }
  if (host === 'soundcloud.com' || host === 'm.soundcloud.com') {
    return soundcloudPlayer(`https://soundcloud.com${url.pathname.replace(/\/$/, '')}`);
  }

  // Spotify: open.spotify.com/(intl-xx/)(embed/)<type>/<id>
  if (host === 'open.spotify.com') {
    const match = url.pathname.match(/^\/(?:intl-[a-z-]+\/)?(?:embed\/)?(track|album|playlist|episode|show|artist)\/([A-Za-z0-9]+)/);
    if (match) {
      const [, type, id] = match;
      const compact = type === 'track' || type === 'episode';
      return { provider: 'spotify', name: 'Spotify', src: `https://open.spotify.com/embed/${type}/${id}`, height: compact ? 152 : 352 };
    }
  }

  // Mixcloud: the widget URL as is, or a show page (/<user>/<show>/) as the widget feed
  if (host === 'player-widget.mixcloud.com') return { provider: 'mixcloud', name: 'Mixcloud', src: url.href, height: 120 };
  if (host === 'mixcloud.com') {
    const feed = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
    const src = `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=${encodeURIComponent(feed)}`;
    return { provider: 'mixcloud', name: 'Mixcloud', src, height: 120 };
  }

  throw new Error(`[embed] Unsupported link "${raw}". Use a Beatport, SoundCloud, Spotify or Mixcloud link.`);
}

/** Accepts a bare URL or a pasted `<iframe src="…">` and returns the URL. */
function extractUrl(input: string): string {
  const src = input.match(/src\s*=\s*["']([^"']+)["']/i)?.[1] ?? input;
  return src.replace(/&amp;/g, '&');
}
