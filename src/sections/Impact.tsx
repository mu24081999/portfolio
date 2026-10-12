import { useRef } from 'react';
import { gsap, SplitText, useGSAP, MOTION, countUp, revealUp } from '../lib/motion';
import { achievements, interests } from '../data';
import { SceneLabel } from '../components/Chrome';

/** Scene 06 — Impact. A statement line types itself in with scroll, then the metric tiles zoom out of the blur. */
export function Impact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        const split = SplitText.create('.impact-statement', { type: 'words', mask: 'words' });
        gsap.from(split.words, {
          yPercent: 100,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.impact-statement', start: 'top 85%', end: 'top 45%', scrub: 1 },
        });
        gsap.from('.impact-tile', {
          scale: 0.7,
          autoAlpha: 0,
          filter: 'blur(14px)',
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.impact-grid', start: 'top 95%', end: 'top 50%', scrub: 1 },
        });
        revealUp(root.current);
        countUp(root.current);
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section id="impact" className="section impact" ref={root}>
      <div className="container">
        <SceneLabel n="06">Impact</SceneLabel>
        <p className="impact-statement">
          I care about results you can measure: faster systems, fewer manual hours, and products that scale when users arrive.
        </p>
        <div className="impact-grid">
          {achievements.map((a) => (
            <div key={a.label} className="impact-tile glass">
              <div className="impact-value gradient-text">
                <span data-count={a.value}>{a.value}</span>
                {a.suffix}
              </div>
              <div className="impact-label">{a.label}</div>
              <div className="impact-detail muted">{a.detail}</div>
            </div>
          ))}
        </div>
        <div className="interests reveal-up">
          <span className="mono">Currently exploring</span>
          {interests.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
