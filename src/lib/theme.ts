import { prefersReducedMotion } from './motion';

export type Theme = 'light' | 'dark';

const KEY = 'theme';
const META = { dark: '#04060d', light: '#eef2f9' } as const;

export const getTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

function stored(): Theme | null {
  try {
    const t = localStorage.getItem(KEY);
    return t === 'light' || t === 'dark' ? t : null;
  } catch {
    return null;
  }
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META[theme]);
  window.dispatchEvent(new CustomEvent<Theme>('themechange', { detail: theme }));
}

/** Switches theme; when an origin point is given, the new theme wipes in as an expanding circle. */
export function setTheme(theme: Theme, origin?: { x: number; y: number }) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage unavailable — theme still applies for this visit */
  }
  if (!origin || prefersReducedMotion() || !('startViewTransition' in document)) {
    apply(theme);
    return;
  }
  const radius = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
  const transition = document.startViewTransition(() => apply(theme));
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${radius}px at ${origin.x}px ${origin.y}px)`] },
      { duration: 900, easing: 'cubic-bezier(0.7, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
    );
  });
}

/** Follows the OS setting until the visitor picks a theme themselves. */
export function watchSystemTheme() {
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  const onChange = () => {
    if (!stored()) apply(mq.matches ? 'light' : 'dark');
  };
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}
