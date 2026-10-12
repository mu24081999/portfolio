import { useEffect, useRef, useState } from 'react';
import { gsap, SplitText, useGSAP, MOTION, scrollToTarget } from '../lib/motion';
import { profile } from '../data';
import { ArrowDown, ArrowUpRight, DownloadIcon } from '../components/Icons';

function RoleCycler() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="role-cycler" aria-live="polite">
      <span key={i} className="role-word">
        {profile.roles[i]}
      </span>
    </span>
  );
}

/**
 * Scene 01 — Opening. The title assembles character by character after the letterbox opens;
 * scrolling then pushes the camera "through" the title (scale + blur + fade) while the rings spin away.
 */
export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        const split = SplitText.create('.hero-name .line', { type: 'words,chars', charsClass: 'char', mask: 'chars' });
        // Masked chars break a shared background-clip gradient, so give each char its own slice of it.
        const paintGradient = () => {
          const line = root.current!.querySelector<HTMLElement>('.hero-name .gradient-text');
          if (!line) return;
          const box = line.getBoundingClientRect();
          line.querySelectorAll<HTMLElement>('.char').forEach((c) => {
            const r = c.getBoundingClientRect();
            c.style.backgroundSize = `${box.width}px 100%`;
            c.style.backgroundPosition = `${box.left - r.left}px 0`;
          });
        };
        paintGradient();
        window.addEventListener('resize', paintGradient);
        gsap.set(split.chars, { yPercent: 115, rotate: 6 });
        gsap.set('.hero-fade', { autoAlpha: 0, y: 30 });
        gsap.set('.hero-ring', { scale: 0.6, autoAlpha: 0 });

        gsap
          .timeline({
            scrollTrigger: { trigger: '.hero-pin', start: 'top top', end: '+=85%', scrub: 1, pin: true },
          })
          .to('.hero-inner', { scale: 1.35, autoAlpha: 0, filter: 'blur(16px)', ease: 'power2.in' }, 0)
          .to('.hero-ring-1', { rotate: 140, scale: 2.4, autoAlpha: 0, ease: 'none' }, 0)
          .to('.hero-ring-2', { rotate: -120, scale: 2.0, autoAlpha: 0, ease: 'none' }, 0)
          .to('.hero-beam', { scaleY: 3, autoAlpha: 0, ease: 'none' }, 0)
          .to('.scroll-cue', { autoAlpha: 0, y: 40, duration: 0.2 }, 0);

        return () => {
          window.removeEventListener('resize', paintGradient);
          split.revert();
        };
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!ready || !root.current?.querySelector('.hero-name .char')) return;
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .to('.hero-ring', { scale: 1, autoAlpha: 1, duration: 2.4, stagger: 0.15 }, 0)
        .to('.hero-name .char', { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.028 }, 0.15)
        .to('.hero-fade', { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.09 }, 0.7);
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="home" className="hero" ref={root}>
      <div className="hero-pin">
        <div className="hero-ring hero-ring-1" aria-hidden />
        <div className="hero-ring hero-ring-2" aria-hidden />
        <div className="hero-beam" aria-hidden />
        <div className="hero-inner container">
          <div className="hero-fade status-pill glass">
            <span className="status-dot" /> Available for new projects · {profile.location}
          </div>
          <h1 className="hero-name" aria-label={profile.name}>
            <span className="line line-1">{profile.firstLine}</span>
            <span className="line gradient-text">{profile.lastLine}</span>
          </h1>
          <p className="hero-role hero-fade">
            <RoleCycler />
          </p>
          <p className="hero-copy hero-fade">{profile.intro}</p>
          <div className="hero-ctas hero-fade">
            <a
              className="btn btn-primary"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget('#projects');
              }}
            >
              View my work <ArrowUpRight />
            </a>
            <a className="btn btn-ghost glass" href={profile.resume} download>
              <DownloadIcon /> Résumé
            </a>
          </div>
        </div>
        <div className="scroll-cue hero-fade" aria-hidden>
          <span className="mono">Scroll to begin</span>
          <span className="scroll-cue-line">
            <ArrowDown />
          </span>
        </div>
      </div>
    </section>
  );
}
