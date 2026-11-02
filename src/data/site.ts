// Site-wide data. `null` means "we don't have it yet": components show a visible placeholder.
import type { Lang } from '../i18n/utils';

export const site = {
  name: 'Shaun Nolanh',
  /**
   * One zip per language (PDF + photos without metadata), in public/press-kit/. To update one, replace the
   * zip keeping its name and update its size in `booking.pressKit` (en.ts / es.ts).
   */
  pressKit: {
    en: '/press-kit/shaun-nolanh-press-kit-en.zip',
    es: '/press-kit/shaun-nolanh-press-kit-es.zip',
  } as Record<Lang, string | null>,
  /** Booking email. It's never printed in the HTML as plain text (see ObfuscatedEmail). */
  bookingEmail: 'ShaunNolanh@gmail.com' as string | null,
  /**
   * Background video for the hero (e.g. '/media/hero/hero.mp4'), muted and looping, with the photo as
   * poster. `null` = only the photo. With reduced motion the photo is always shown.
   */
  heroVideo: null as string | null,
};

export type SocialLink = { name: string; url: string | null };

export const socials: SocialLink[] = [
  { name: 'SoundCloud', url: 'https://soundcloud.com/shaunnolanhmusic' },
  { name: 'Spotify', url: null },
  { name: 'Beatport', url: 'https://www.beatport.com/artist/shaun-nolanh/1291888' },
  { name: 'Instagram', url: 'https://www.instagram.com/shaunnolanh' },
  { name: 'Resident Advisor', url: null },
  { name: 'Mixcloud', url: null },
];
