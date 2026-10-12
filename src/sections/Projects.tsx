import { useRef, type CSSProperties } from 'react';
import { gsap, useGSAP, MOTION, revealUp } from '../lib/motion';
import { projects } from '../data';
import { SceneLabel } from '../components/Chrome';

/**
 * Scene 05 — Work. Project panels are sticky and stack like a deck: as each new card slides up,
 * the one beneath recedes (scales down, dims, tips back).
 */
export function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        revealUp(root.current, '.stack');
        const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          gsap.from(card.querySelectorAll('.pc-reveal'), {
            y: 30,
            autoAlpha: 0,
            stagger: 0.07,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 75%', toggleActions: 'play none none reverse' },
          });
          gsap.from(card.querySelector('.pc-visual'), {
            scale: 1.25,
            autoAlpha: 0,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 30%', scrub: 1 },
          });
          if (!next) return;
          gsap
            .timeline({ scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true } })
            .to(card, { scale: 0.9 - (cards.length - i) * 0.01, rotateX: 8, ease: 'none' }, 0)
            .to(card.querySelector('.pc-shade'), { opacity: 0.65, ease: 'none' }, 0);
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="projects" className="section projects" ref={root}>
      <div className="container">
        <div className="section-head">
          <SceneLabel n="05">Selected work</SceneLabel>
          <h2 className="section-title reveal-up">
            Things I've <span className="gradient-text">shipped.</span>
          </h2>
          <p className="section-sub muted reveal-up">
            Products and platforms from my roles and personal builds: real-time communication, Web3, CRM and marketplaces.
          </p>
        </div>

        <div className="stack">
          {projects.map((p, i) => (
            <article key={p.title} className="stack-card glass" style={{ '--i': i, '--accent': p.accent } as CSSProperties}>
              <div className="pc-body">
                <div className="pc-top pc-reveal">
                  <span className="mono pc-index">{String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                  <span className="mono pc-kind">{p.kind}</span>
                </div>
                <h3 className="pc-title pc-reveal">{p.title}</h3>
                <p className="pc-desc pc-reveal">{p.description}</p>
                <ul className="pc-highlights pc-reveal">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="chips pc-reveal">
                  {p.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pc-visual" aria-hidden>
                <div className="pc-orb" />
                <div className="pc-window glass">
                  <div className="pc-window-bar">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="pc-window-lines">
                    <span style={{ width: '72%' }} />
                    <span style={{ width: '48%' }} />
                    <span style={{ width: '86%' }} />
                    <span style={{ width: '34%' }} />
                  </div>
                  <div className="pc-window-grid">
                    <b />
                    <b />
                    <b />
                  </div>
                </div>
                <span className="pc-big-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="pc-shade" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
