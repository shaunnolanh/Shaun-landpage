// The hero photo in AVIF / WebP / JPEG at responsive widths. Shared by the hero (the <picture>) and the
// page head (the AVIF preload): the photo is the LCP, so both must point at exactly the same files.
import { getImage } from 'astro:assets';
import heroPhoto from '../assets/photos/shaun-hero.jpg';

const widths = [640, 960, 1280, 1920, 2576];
export const heroSizes = '100vw';

export async function getHeroImage() {
  const [avif, webp, jpeg] = await Promise.all(
    (['avif', 'webp', 'jpeg'] as const).map((format) => getImage({ src: heroPhoto, widths, sizes: heroSizes, format })),
  );
  return { avif, webp, jpeg, width: heroPhoto.width, height: heroPhoto.height };
}

export type HeroImage = Awaited<ReturnType<typeof getHeroImage>>;
