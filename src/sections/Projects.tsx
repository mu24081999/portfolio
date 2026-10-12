import { useRef, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router';
import { gsap, useGSAP, MOTION, revealUp } from '../lib/motion';
import type { Project } from '../data';
import { SceneLabel } from '../components/Chrome';
import { ArrowUpRight } from '../components/Icons';

/**
 * Work scene. Project panels are sticky and stack like a deck: as each new card slides up,
 * the one beneath recedes (scales down, dims, tips back). Each card opens its case study.
 */
export function ProjectStack({
  items,
  n,
  title,
  sub,
  footer,
  headless = false,
}: {
  items: Project[];
  n: string;
  title?: ReactNode;
  sub?: string;
  footer?: ReactNode;
  headless?: boolean;
}) {
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
            scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' },
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
    <section className={`section projects ${headless ? 'is-headless' : ''}`} ref={root} data-scene="Work">
      <div className="container">
        {!headless && (
          <div className="section-head">
            <SceneLabel n={n}>Selected work</SceneLabel>
            <h2 className="section-title reveal-up">
              {title ?? (
                <>
                  Things we've <span className="gradient-text">shipped.</span>
                </>
              )}
            </h2>
            {sub && <p className="section-sub muted reveal-up">{sub}</p>}
          </div>
        )}

        <div className="stack">
          {items.map((p, i) => (
            <article key={p.slug} className="stack-card glass" style={{ '--i': i, '--accent': p.accent } as CSSProperties}>
              <div className="pc-body">
                <div className="pc-top pc-reveal">
                  <span className="mono pc-index">
                    {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                  </span>
                  <span className="mono pc-kind">{p.kind}</span>
                </div>
                <h3 className="pc-title pc-reveal">
                  <Link to={`/projects/${p.slug}`}>{p.title}</Link>
                </h3>
                <p className="pc-desc pc-reveal">{p.description}</p>
                <ul className="pc-highlights pc-reveal">
                  {p.highlights.slice(0, 2).map((h) => (
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
                <Link to={`/projects/${p.slug}`} className="card-link pc-reveal">
                  View case study <ArrowUpRight width={16} height={16} />
                </Link>
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
        {footer && <div className="section-foot reveal-up">{footer}</div>}
      </div>
    </section>
  );
}
