import { useRef, type PointerEvent } from 'react';
import { Link } from 'react-router';
import { gsap, SplitText, useGSAP, MOTION, DESKTOP, countUp, revealUp } from '../lib/motion';
import { education, languages, profile, stats, summary, summaryExtra } from '../data';
import { SceneLabel } from '../components/Chrome';
import { ArrowUpRight, DownloadIcon, PinIcon } from '../components/Icons';

function tilt(e: PointerEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  gsap.to(el, { rotateY: px * 12, rotateX: -py * 12, duration: 0.6, ease: 'power3.out' });
}
const untilt = (e: PointerEvent<HTMLDivElement>) =>
  gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' });

/**
 * Founder scene. On desktop it pins while the summary "lights up" word by word,
 * and the photo card swings in from the side in 3D.
 * `teaser` (home page) links on to /about; `full` adds education, languages and the résumé.
 */
export function Founder({ n, variant }: { n: string; variant: 'teaser' | 'full' }) {
  const root = useRef<HTMLElement>(null);
  const full = variant === 'full';

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION, desktop: DESKTOP }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        const split = SplitText.create('.about-reveal', { type: 'words' });
        gsap.fromTo(
          split.words,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: desktop
              ? { trigger: '.about-pin', start: 'top top', end: '+=90%', scrub: true, pin: true }
              : { trigger: '.about-reveal', start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        );

        gsap.from('.photo-card-wrap', {
          rotateY: -35,
          x: -120,
          autoAlpha: 0,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 25%', scrub: 1 },
        });
        gsap.from('.stat', {
          y: 60,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.stats', start: 'top 92%', toggleActions: 'play none none reverse' },
        });
        revealUp(root.current);
        countUp(root.current);
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section className="section about" ref={root} data-scene="Founder">
      <div className="about-pin">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="photo-card-wrap">
              <div className="photo-card glass" onPointerMove={tilt} onPointerLeave={untilt}>
                <div className="photo-frame">
                  <picture>
                    <source srcSet={profile.photoWebp} type="image/webp" />
                    <img
                      src={profile.photo}
                      alt={`${profile.name}, ${profile.founderTitle} at ${profile.brand}`}
                      width={400}
                      height={400}
                      loading={full ? 'eager' : 'lazy'}
                    />
                  </picture>
                  <span className="photo-badge glass">
                    <span className="status-dot" /> Available
                  </span>
                </div>
                <div className="photo-meta">
                  <div className="id-name">{profile.name}</div>
                  <div className="id-role">{profile.founderTitle}</div>
                  <div className="id-loc">
                    <PinIcon width={14} height={14} /> {profile.location}
                  </div>
                </div>
                <div className="id-card-shine" aria-hidden />
              </div>
            </div>
            <div className="stats">
              {stats.map((s) => (
                <div key={s.label} className="stat glass">
                  <div className="stat-value">
                    <span data-count={s.value}>{s.value}</span>
                    {s.suffix}
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-copy">
            <SceneLabel n={n}>{full ? 'The founder' : 'Who builds it'}</SceneLabel>
            {full ? (
              <h2 className="section-title reveal-up">
                Engineer. Team lead. <span className="gradient-text">Problem solver.</span>
              </h2>
            ) : (
              <h2 className="section-title reveal-up">
                Led by an engineer, <span className="gradient-text">hands on code.</span>
              </h2>
            )}
            <p className="about-reveal">{summary}</p>
            <p className="muted reveal-up">{summaryExtra}</p>
            {full ? (
              <>
                <div className="about-facts">
                  <div className="fact glass reveal-up">
                    <span className="mono fact-k">Education</span>
                    <strong>{education.degree}</strong>
                    <span className="muted">
                      {education.school} · {education.period} · {education.note}
                    </span>
                  </div>
                  <div className="fact glass reveal-up">
                    <span className="mono fact-k">Languages</span>
                    {languages.map((l) => (
                      <span key={l}>{l}</span>
                    ))}
                  </div>
                </div>
                <div className="about-actions reveal-up">
                  <a className="btn btn-ghost glass" href={profile.resume} download>
                    <DownloadIcon /> Download résumé
                  </a>
                  <Link className="text-link" to="/experience">
                    See the full journey <ArrowUpRight width={16} height={16} />
                  </Link>
                </div>
              </>
            ) : (
              <div className="about-actions reveal-up">
                <Link className="btn btn-ghost glass" to="/about">
                  More about Umar <ArrowUpRight />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
