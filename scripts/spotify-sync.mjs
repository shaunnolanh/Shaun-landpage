// Spotify sync via oEmbed (public, no credentials: the Web API needs the app owner to have Premium).
// For every carousel release in src/data/music.ts with a `spotify` link (album/EP or single track) it:
//   1. asks open.spotify.com/oembed for the title and cover,
//   2. downloads the 640px cover once per release to src/assets/covers/<slug>.jpg (falls back to the 300px one),
//   3. writes src/data/spotify-tracks.json (committed: the build never depends on Spotify answering).
// Usage: `npm run spotify:sync`. With `--ci` it only runs on Cloudflare Pages (CF_PAGES=1) and never fails the build.
// No dependencies: Node 24 fetch + it imports music.ts directly (TypeScript type stripping).
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ROOT = new URL('..', import.meta.url);
const COVERS = new URL('src/assets/covers/', ROOT);
const OUT = new URL('src/data/spotify-tracks.json', ROOT);
const ci = process.argv.includes('--ci');

if (ci && !process.env.CF_PAGES) process.exit(0); // local builds use the committed JSON

const warn = (msg) => console.warn(`[spotify-sync] ⚠ ${msg}`);

async function main() {
  const { carouselReleases, coverSlug, spotifyUrl } = await import(fileURLToPath(new URL('src/data/music.ts', ROOT)));
  const previous = JSON.parse(await readFile(OUT, 'utf8').catch(() => '{}'));
  const result = {};
  await mkdir(COVERS, { recursive: true });

  for (const release of carouselReleases) {
    if (!release.spotify) continue;
    const url = spotifyUrl(release.spotify);
    if (!url) {
      warn(`"${release.title}": not an open.spotify.com/album/… or /track/… link (${release.spotify})`);
      continue;
    }
    try {
      const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error(`oEmbed HTTP ${res.status}`);
      const data = await res.json();

      // oEmbed gives 300px. Spotify's CDN serves 640px under another (undocumented) prefix: try it first.
      const small = data.thumbnail_url;
      const large = small.replace(/\/image\/ab67616d[0-9a-f]{8}/, '/image/ab67616d0000b273');
      let image = await fetch(large);
      let size = 640;
      if (!image.ok) {
        warn(`"${release.title}": 640px cover unavailable, using the 300px one (may look soft on Retina)`);
        image = await fetch(small);
        size = 300;
      }
      if (!image.ok) throw new Error(`cover HTTP ${image.status}`);
      const cover = `${coverSlug(release.title)}.jpg`;
      await writeFile(new URL(cover, COVERS), Buffer.from(await image.arrayBuffer()));

      const [kind, id] = url.split('/').slice(-2);
      result[url] = { title: data.title, uri: `spotify:${kind}:${id}`, cover, coverSize: size };
      console.log(`[spotify-sync] ✓ ${release.title} → ${data.title} (${size}px)`);
    } catch (error) {
      warn(`"${release.title}": ${error.message}. Keeping the previous data, if any.`);
      if (previous[url]) result[url] = previous[url];
    }
  }

  await writeFile(OUT, `${JSON.stringify(result, null, 2)}\n`);
  const pending = carouselReleases.filter((r) => !r.hide && !r.spotify).map((r) => r.title);
  console.log(`[spotify-sync] ${Object.keys(result).length} synced → src/data/spotify-tracks.json`);
  if (pending.length) console.log(`[spotify-sync] no Spotify link yet: ${pending.join(', ')}`);
}

main().catch((error) => {
  warn(`sync failed (${error.message}); the build continues with the committed JSON.`);
  process.exit(ci ? 0 : 1);
});
