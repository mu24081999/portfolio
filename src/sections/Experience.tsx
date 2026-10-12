import { useRef } from 'react';
import { gsap, useGSAP, MOTION, DESKTOP, revealUp } from '../lib/motion';
import { experience } from '../data';
import { SceneLabel } from '../components/Chrome';

/**
 * Scene 04 — Journey. On desktop the scene pins and vertical scroll becomes a horizontal
 * dolly shot along the career timeline; each card swings into focus as it reaches centre frame.
 * On small screens (or with reduced motion) it falls back to a vertical timeline.
 */
export function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION, desktop: DESKTOP }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        revealUp(root.current, '.exp-track');

        if (!desktop) {
          gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card) => {
            gsap.from(card, {
              x: -40,
              autoAlpha: 0,
              duration: 1.1,
              ease: 'expo.out',
              scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
            });
          });
          return;
        }

        const track = root.current!.querySelector<HTMLElement>('.exp-track')!;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const dolly = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.exp-pin',
            start: 'top top',
            end: () => `+=${distance() * 1.1}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to('.exp-progress span', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.exp-pin', start: 'top top', end: () => `+=${distance() * 1.1}`, scrub: 1, invalidateOnRefresh: true },
        });

        gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card) => {
          gsap.fromTo(
            card,
            { rotateY: -24, scale: 0.86, autoAlpha: 0.25, z: -120 },
            {
              rotateY: 0,
              scale: 1,
              autoAlpha: 1,
              z: 0,
              ease: 'power1.out',
              scrollTrigger: { trigger: card, containerAnimation: dolly, start: 'left 100%', end: 'left 55%', scrub: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="experience" className="section experience" ref={root}>
      <div className="exp-pin">
        <div className="container section-head exp-head">
          <SceneLabel n="04">Experience</SceneLabel>
          <div className="exp-head-row">
            <h2 className="section-title reveal-up">
              The <span className="gradient-text">journey.</span>
            </h2>
            <p className="mono exp-hint reveal-up">2022 → Present · scroll ⟶</p>
          </div>
        </div>

        <div className="exp-viewport">
          <ol className="exp-track">
            {experience.map((job, i) => (
              <li key={job.company} className="exp-item">
                <div className="exp-node" aria-hidden>
                  <span className={`exp-dot ${job.current ? 'is-current' : ''}`} />
                  <span className="mono">{String(experience.length - i).padStart(2, '0')}</span>
                </div>
                <article className="exp-card glass">
                  <div className="exp-card-top">
                    <span className="mono exp-period">{job.period}</span>
                    {job.current && <span className="badge">Current</span>}
                  </div>
                  <h3>{job.role}</h3>
                  <p className="exp-company">
                    <span className="gradient-text">@ {job.company}</span>
                    {job.location && <span className="muted"> · {job.location}</span>}
                  </p>
                  <ul>
                    {job.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
        <div className="container exp-progress-wrap" aria-hidden>
          <div className="exp-progress">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
