export {};

const backTop = document.querySelector<HTMLButtonElement>('#back-top');
const progress = document.querySelector<HTMLElement>('.reading-progress');
const updateBackTop = () => {
  if (backTop) backTop.hidden = window.scrollY < 400;
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  if (progress)
    progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, window.scrollY / distance) : 0})`;
};
window.addEventListener('scroll', updateBackTop, { passive: true });
window.addEventListener('resize', updateBackTop);
updateBackTop();
backTop?.addEventListener('click', () =>
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  }),
);
const button = document.querySelector<HTMLButtonElement>('#theme');
function syncTheme() {
  const light = document.documentElement.dataset.theme === 'light';
  button?.setAttribute('aria-pressed', String(light));
  button?.setAttribute(
    'aria-label',
    document.documentElement.lang === 'ru'
      ? light
        ? 'Включить тёмную тему'
        : 'Включить светлую тему'
      : light
        ? 'Switch to dark theme'
        : 'Switch to light theme',
  );
}
syncTheme();
button?.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {}
  syncTheme();
});

// Reveal effects are progressive enhancement: content stays readable without JS.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const entrance = (element: HTMLElement, delay = 0) => {
  if (motionPreference.matches) return;
  element.animate(
    [
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 650, delay, easing: 'cubic-bezier(.22,1,.36,1)' },
  );
};
const revealTargets = document.querySelectorAll<HTMLElement>(
  '.section-head, #about>div, .job, .skill-grid>article, .formal-education, .education-extra, .learning-disclosure, #contact>h2, #contact>.email, #contact>.contact-links',
);
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entrance(entry.target as HTMLElement);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  revealTargets.forEach((element) => revealObserver.observe(element));
}
document.querySelectorAll<HTMLDetailsElement>('.learning-disclosure').forEach((details) =>
  details.addEventListener('toggle', () => {
    if (details.open) {
      details
        .querySelectorAll<HTMLElement>('.learning-group')
        .forEach((group, index) => entrance(group, index * 75));
    }
  }),
);
document
  .querySelectorAll<HTMLElement>(
    '.hero>.eyebrow, .hero>.location, .hero>h1, .hero>.hero-bottom, .hero>.hero-portrait',
  )
  .forEach((element, index) => entrance(element, index * 65));
const track = document.querySelector<HTMLDivElement>('#products-track');
if (track && track.children.length > 1) {
  const slides = Array.from(track.querySelectorAll<HTMLElement>('.product-slide'));
  let cycle = 0,
    frame = 0,
    lastTime = 0,
    remainder = 0;
  const copy = () =>
    slides.map((slide) => {
      const clone = slide.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      // Keep visible copies clickable without duplicating keyboard navigation.
      clone.tabIndex = -1;
      clone.dataset.clone = 'true';
      return clone;
    });
  track.prepend(...copy());
  track.append(...copy());
  track.classList.add('is-looping');
  const normalize = () => {
    if (cycle <= 0) return;
    if (track.scrollLeft >= cycle * 2) track.scrollLeft -= cycle;
    else if (track.scrollLeft < cycle) track.scrollLeft += cycle;
  };
  const tick = (time: number) => {
    if (lastTime) {
      remainder += Math.min(time - lastTime, 50) * 0.032;
      const pixels = Math.floor(remainder);
      if (pixels) {
        track.scrollLeft += pixels;
        remainder -= pixels;
        normalize();
      }
    }
    lastTime = time;
    frame = requestAnimationFrame(tick);
  };
  const measure = () => {
    const previousCycle = cycle;
    // Measure equivalent slides so fractional card widths don't accumulate drift.
    cycle = slides[0].offsetLeft - (track.firstElementChild as HTMLElement).offsetLeft;
    track.scrollLeft = previousCycle > 0 ? (track.scrollLeft / previousCycle) * cycle : cycle;
    normalize();
  };
  new ResizeObserver(measure).observe(track);
  measure();
  track.addEventListener('scroll', normalize, { passive: true });
  window.addEventListener('pagehide', () => cancelAnimationFrame(frame));
  window.addEventListener('pageshow', () => {
    cancelAnimationFrame(frame);
    lastTime = 0;
    frame = requestAnimationFrame(tick);
  });
  frame = requestAnimationFrame(tick);
}
