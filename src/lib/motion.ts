import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** Matches every cinematic scene; reduced-motion users get static, fully visible content. */
export const MOTION = '(prefers-reduced-motion: no-preference)';
export const DESKTOP = '(min-width: 900px) and (min-height: 620px)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function lockScroll(locked: boolean) {
  document.documentElement.classList.toggle('is-locked', locked);
  if (locked) lenis?.stop();
  else lenis?.start();
}

export function scrollToElement(el: HTMLElement) {
  if (lenis) lenis.scrollTo(el, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export function scrollToTarget(selector: string) {
  const el = document.querySelector<HTMLElement>(selector);
  if (el) scrollToElement(el);
}

/** Jump to the top instantly (used when a new page mounts). */
export function resetScroll() {
  lenis?.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}

/** Counts every `[data-count]` inside `scope` up from zero when it enters view. */
export function countUp(scope: Element | null) {
  if (!scope) return;
  scope.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 2.2,
      ease: 'expo.out',
      onUpdate: () => {
        el.textContent = String(Math.round(obj.v));
      },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
    el.textContent = '0';
  });
}

/** Fades + lifts every `.reveal-up` inside `scope` as it enters the frame (skipping ones inside `except`). */
export function revealUp(scope: Element | null, except?: string) {
  if (!scope) return;
  scope.querySelectorAll<HTMLElement>('.reveal-up').forEach((el) => {
    if (except && el.closest(except)) return;
    gsap.from(el, {
      y: 48,
      autoAlpha: 0,
      filter: 'blur(8px)',
      duration: 1.3,
      ease: 'expo.out',
      clearProps: 'filter',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
    });
  });
}
