// Small IntersectionObserver helper for entrance animations.
// The hidden state (`data-reveal`) is only added here, by JS: if the script fails, everything stays visible.

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Adds `data-reveal` to the matches, then `is-visible` when each one enters the viewport. */
export function reveal(selector: string) {
  if (reduceMotion() || !('IntersectionObserver' in window)) return;
  const elements = document.querySelectorAll<HTMLElement>(selector);
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  elements.forEach((el) => {
    el.setAttribute('data-reveal', '');
    observer.observe(el);
  });
}
