import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion';
import { profile } from '../data';
import { Mark } from './Chrome';

/** Letterbox intro: a counter runs, the title card fades, then the black bars part to reveal the hero. */
export function Preloader({ onReveal }: { onReveal: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.to(root.current, { autoAlpha: 0, duration: 0.3, onComplete: onReveal });
        return;
      }
      const counter = { v: 0 };
      gsap
        .timeline()
        .to(counter, {
          v: 100,
          duration: 1.6,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
          },
        })
        .to('.pl-line span', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0)
        .from('.pl-mark', { scale: 0.5, autoAlpha: 0, filter: 'blur(12px)', duration: 1.2, ease: 'expo.out' }, 0)
        .from('.pl-name span', { yPercent: 110, duration: 1, stagger: 0.06, ease: 'expo.out' }, 0.25)
        .from('.pl-sub', { autoAlpha: 0, y: 10, duration: 0.8 }, 0.5)
        .to('.pl-center', { autoAlpha: 0, y: -24, filter: 'blur(8px)', duration: 0.6, ease: 'power2.in' }, '+=0.15')
        .add(onReveal, '-=0.1')
        .to('.pl-bar-top', { yPercent: -100, duration: 1.3, ease: 'expo.inOut' }, '<')
        .to('.pl-bar-bottom', { yPercent: 100, duration: 1.3, ease: 'expo.inOut' }, '<')
        .set(root.current, { display: 'none' });
    },
    { scope: root },
  );

  return (
    <div className="preloader" ref={root} aria-hidden>
      <div className="pl-bar pl-bar-top" />
      <div className="pl-bar pl-bar-bottom" />
      <div className="pl-center">
        <Mark className="pl-mark" />
        <div className="pl-name">
          {profile.name.split(' ').map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <div className="pl-sub">{profile.tagline}</div>
        <div className="pl-meta">
          <span ref={num}>000</span>
          <div className="pl-line">
            <span />
          </div>
          <span>LOADING SCENES</span>
        </div>
      </div>
    </div>
  );
}
