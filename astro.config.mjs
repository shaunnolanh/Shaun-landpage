// @ts-check
import { defineConfig } from 'astro/config';
// Vite ships with Astro; loadEnv reads .env files, which Astro doesn't expose to this config by itself.
// With an empty prefix it also includes every process.env variable (e.g. Cloudflare Pages'), which take precedence.
import { loadEnv } from 'vite';

const env = loadEnv('production', new URL('.', import.meta.url).pathname, '');

// The public URL of the site, used for canonical, hreflang, Open Graph, sitemap and robots.
// SITE_URL comes from Cloudflare Pages → Settings → Variables (https://shaun-nolanh.pages.dev until the real
// domain exists). Without it (local `astro dev` / `astro build`) it falls back to localhost.
const site = env.SITE_URL || 'http://localhost:4321';

if (!env.SITE_URL) {
  console.warn(`[site] SITE_URL is not set: absolute URLs will point to ${site}. Set SITE_URL before deploying elsewhere.`);
}

// Third-party players the site embeds (frame-src). Adding a platform: add its iframe host here too.
const playerHosts = [
  'https://open.spotify.com',
  'https://w.soundcloud.com',
  'https://embed.beatport.com',
  'https://player-widget.mixcloud.com',
];
const web3forms = 'https://api.web3forms.com';

export default defineConfig({
  site,
  // Content Security Policy as a <meta> in every page. Astro hashes our own scripts and styles on each build
  // (script-src / style-src), so nothing inline runs unless it's ours. What a <meta> can't carry
  // (frame-ancestors and the other security headers) goes in public/_headers (Cloudflare Pages).
  // If Cloudflare Web Analytics is ever turned on, add its domain (static.cloudflareinsights.com) to the CSP.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        `frame-src ${playerHosts.join(' ')}`,
        `connect-src 'self' ${web3forms}`,
        `form-action 'self' ${web3forms}`,
        "img-src 'self' data:",
        "font-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
      ],
      // The Spotify iFrame API (SpotifyPlayer.astro): a loader from open.spotify.com that pulls the real
      // script from Spotify's CDN. That script is a webpack bundle that runs every module through eval(),
      // so it needs 'unsafe-eval' (decided 2026-10-31; inline and unlisted scripts are still blocked).
      scriptDirective: {
        resources: ["'self'", 'https://open.spotify.com', 'https://embed-cdn.spotifycdn.com', "'unsafe-eval'"],
      },
    },
  },
  // No Markdown code blocks on this site: Shiki (inline styles) would clash with the CSP
  markdown: { syntaxHighlight: false },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false, // EN lives at "/", ES at "/es/"
    },
  },
});
