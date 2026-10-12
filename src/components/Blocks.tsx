import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router';
import { gsap, SplitText, useGSAP, MOTION, revealUp } from '../lib/motion';
import { processSteps, profile, type Faq, type Service } from '../data';
import type { Crumb } from '../seo';
import { SceneLabel, useReady } from './Chrome';
import { ArrowUpRight, ChatIcon } from './Icons';

/** Visible breadcrumb trail (mirrors the BreadcrumbList structured data). */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="crumbs ph-fade" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((c, i) => (
          <li key={c.path}>
            {i < crumbs.length - 1 ? <Link to={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Opening scene for inner pages: the title rises line by line out of a mask once the
 * letterbox (or page curtain) opens, then drifts up and dissolves as you scroll on.
 */
export function PageHero({
  label,
  title,
  lead,
  crumbs,
  children,
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const ready = useReady();

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        const split = SplitText.create('.ph-title', { type: 'lines', mask: 'lines', linesClass: 'ph-line' });
        gsap.set(split.lines, { yPercent: 110 });
        gsap.set('.ph-fade', { autoAlpha: 0, y: 24 });
        gsap.to('.ph-inner', {
          yPercent: -18,
          autoAlpha: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!ready || !root.current?.querySelector('.ph-line')) return;
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .to('.ph-line', { yPercent: 0, duration: 1.4, stagger: 0.1 }, 0.05)
        .to('.ph-fade', { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.3);
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section className="page-hero" ref={root} data-scene={label}>
      <div className="ph-ring" aria-hidden />
      <div className="container ph-inner">
        <Breadcrumbs crumbs={crumbs} />
        <div className="scene-label ph-fade">
          <span className="mono">01</span>
          <span className="scene-label-line" />
          <span>{label}</span>
        </div>
        <h1 className="ph-title">{title}</h1>
        {lead && <p className="ph-lead ph-fade">{lead}</p>}
        {children && <div className="ph-extra ph-fade">{children}</div>}
      </div>
    </section>
  );
}

/** Service cards rise out of depth and tilt flat as they land. */
export function ServiceCards({ items, as = 'h3' }: { items: Service[]; as?: 'h2' | 'h3' }) {
  const root = useRef<HTMLDivElement>(null);
  const Heading = as;
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, i) => {
          gsap.from(card, {
            y: 140,
            rotateX: 32,
            scale: 0.88,
            autoAlpha: 0,
            transformOrigin: '50% 100%',
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: `top ${100 + (i % 3) * 5}%`, end: 'top 60%', scrub: 1 },
          });
        });
      });
    },
    { scope: root },
  );
  return (
    <div className="services-grid" ref={root}>
      {items.map((s, i) => (
        <Link key={s.slug} to={`/services/${s.slug}`} className="service-card glass">
          <div className="service-card-head">
            <span className="skill-glyph mono">{s.glyph}</span>
            <span className="mono skill-count">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <Heading>{s.title}</Heading>
          <p className="muted">{s.short}</p>
          <span className="card-link">
            Learn more <ArrowUpRight width={16} height={16} />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function FaqList({ items, n = '05', heading = 'Frequently asked questions' }: { items: Faq[]; n?: string; heading?: string }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => gsap.matchMedia().add(MOTION, () => revealUp(root.current)), { scope: root });
  return (
    <section className="section faq" ref={root} data-scene="FAQ">
      <div className="container faq-grid">
        <div>
          <SceneLabel n={n}>FAQ</SceneLabel>
          <h2 className="section-title reveal-up">{heading}</h2>
        </div>
        <div className="faq-list">
          {items.map((f) => (
            <details key={f.q} className="faq-item glass reveal-up">
              <summary>
                <span>{f.q}</span>
                <span className="faq-icon" aria-hidden />
              </summary>
              <p className="muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection({ n = '04' }: { n?: string }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        revealUp(root.current, '.process-grid');
        gsap.from('.process-step', {
          y: 80,
          autoAlpha: 0,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.process-grid', start: 'top 90%', end: 'top 50%', scrub: 1 },
        });
        gsap.from('.process-line span', {
          scaleX: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.process-grid', start: 'top 80%', end: 'bottom 60%', scrub: true },
        });
      });
    },
    { scope: root },
  );
  return (
    <section className="section process" ref={root} data-scene="Process">
      <div className="container">
        <div className="section-head">
          <SceneLabel n={n}>How we work</SceneLabel>
          <h2 className="section-title reveal-up">
            From idea to <span className="gradient-text">production.</span>
          </h2>
        </div>
        <div className="process-line" aria-hidden>
          <span />
        </div>
        <ol className="process-grid">
          {processSteps.map((s, i) => (
            <li key={s.title} className="process-step glass">
              <span className="mono process-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p className="muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Closing call-to-action panel used at the end of every page. */
export function CtaBand({ n = '06', title, text }: { n?: string; title?: ReactNode; text?: string }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        gsap.from('.cta-panel', {
          scale: 0.86,
          y: 80,
          autoAlpha: 0,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 95%', end: 'top 45%', scrub: 1 },
        });
      });
    },
    { scope: root },
  );
  return (
    <section className="section cta" ref={root} data-scene="Next step">
      <div className="container">
        <div className="cta-panel glass">
          <div className="cta-glow" aria-hidden />
          <SceneLabel n={n}>Next step</SceneLabel>
          <h2 className="cta-title">{title ?? <>Have a project in mind? <span className="gradient-text">Let's talk.</span></>}</h2>
          <p className="muted">{text ?? 'Tell us what you are building. You will get a clear plan, timeline and estimate — usually within a day.'}</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary">
              Start a project <ArrowUpRight />
            </Link>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost glass">
              <ChatIcon /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
