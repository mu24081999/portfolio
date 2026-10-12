import { useRef } from 'react';
import { gsap, useGSAP, MOTION, revealUp } from '../lib/motion';
import { marquee, skills } from '../data';
import { SceneLabel } from '../components/Chrome';

/**
 * Scene 03 — Arsenal. Two marquee bands drift in opposite directions (speeding up with scroll),
 * and the skill panels rise out of depth, tilting flat as they land.
 */
export function Skills({ n = '03' }: { n?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        gsap.to('.marquee-a', { xPercent: -25, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
        gsap.fromTo('.marquee-b', { xPercent: -25 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });

        gsap.utils.toArray<HTMLElement>('.skill-card').forEach((card, i) => {
          gsap.from(card, {
            y: 160,
            rotateX: 38,
            scale: 0.85,
            autoAlpha: 0,
            transformOrigin: '50% 100%',
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: `top ${100 + (i % 3) * 6}%`, end: 'top 55%', scrub: 1 },
          });
          gsap.from(card.querySelectorAll('.chip'), {
            autoAlpha: 0,
            y: 12,
            stagger: 0.03,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
          });
        });
        revealUp(root.current, '.skill-card');
      });
    },
    { scope: root },
  );

  const band = [...marquee, ...marquee];

  return (
    <section className="section skills" ref={root} data-scene="Arsenal">
      <div className="marquees" aria-hidden>
        <div className="marquee marquee-a">
          {band.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
        <div className="marquee marquee-b outline">
          {band.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="section-head">
          <SceneLabel n={n}>Skills</SceneLabel>
          <h2 className="section-title reveal-up">
            The <span className="gradient-text">arsenal.</span>
          </h2>
          <p className="section-sub muted reveal-up">
            The tools we use to take products from idea to production: front end, back end, data, Web3, AI and the pipelines that ship them.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((g, i) => (
            <article key={g.title} className={`skill-card glass skill-card-${i}`}>
              <div className="skill-card-head">
                <span className="skill-glyph mono">{g.glyph}</span>
                <span className="mono skill-count">{String(g.items.length).padStart(2, '0')}</span>
              </div>
              <h3>{g.title}</h3>
              <div className="chips">
                {g.items.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
