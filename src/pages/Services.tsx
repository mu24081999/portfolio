import { useRef } from 'react';
import { Link, useParams } from 'react-router';
import { gsap, useGSAP, MOTION, revealUp, countUp } from '../lib/motion';
import { projects, serviceBySlug, services } from '../data';
import { getSeo } from '../seo';
import { SceneLabel } from '../components/Chrome';
import { CtaBand, FaqList, PageHero, ProcessSection, ServiceCards } from '../components/Blocks';
import { ArrowUpRight } from '../components/Icons';
import NotFound from './NotFound';

export function ServicesPage() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => gsap.matchMedia().add(MOTION, () => revealUp(root.current, '.services-grid')), { scope: root });
  const generalFaqs = [services[0].faqs[2], services[0].faqs[1], services[4].faqs[0], services[1].faqs[0]];
  return (
    <>
      <PageHero
        label="Services"
        crumbs={getSeo('/services')!.crumbs}
        title={
          <>
            Software development <span className="gradient-text">services.</span>
          </>
        }
        lead="Custom web applications, AI automation, Web3, CRMs, APIs and DevOps — designed, built and shipped by one accountable team in Lahore, for clients worldwide."
      />
      <section className="section" ref={root} data-scene="All services">
        <div className="container">
          <div className="section-head">
            <SceneLabel n="02">What we do</SceneLabel>
            <h2 className="section-title reveal-up">
              Pick a service, or <span className="gradient-text">combine them.</span>
            </h2>
          </div>
          <ServiceCards items={services} as="h2" />
        </div>
      </section>
      <ProcessSection n="03" />
      <FaqList n="04" items={generalFaqs} />
      <CtaBand n="05" />
    </>
  );
}

export function ServiceDetailPage() {
  const { slug = '' } = useParams();
  const service = serviceBySlug(slug);
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        revealUp(root.current, '.deliverables, .outcome-grid');
        gsap.from('.deliverable', {
          y: 60,
          autoAlpha: 0,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.deliverables', start: 'top 90%', end: 'top 45%', scrub: 1 },
        });
        gsap.from('.outcome', {
          scale: 0.8,
          autoAlpha: 0,
          filter: 'blur(10px)',
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.outcome-grid', start: 'top 95%', end: 'top 60%', scrub: 1 },
        });
        countUp(root.current);
      });
    },
    { scope: root, dependencies: [slug], revertOnUpdate: true },
  );

  if (!service) return <NotFound />;
  const related = projects.filter((p) => service.projects.includes(p.slug));
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        key={service.slug}
        label="Service"
        crumbs={getSeo(`/services/${service.slug}`)!.crumbs}
        title={<>{service.title}</>}
        lead={service.intro}
      >
        <div className="chips">
          {service.stack.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="section service-body" ref={root} data-scene="What's included">
        <div className="container">
          <div className="section-head">
            <SceneLabel n="02">What's included</SceneLabel>
            <h2 className="section-title reveal-up">
              Everything you need, <span className="gradient-text">end to end.</span>
            </h2>
          </div>
          <ul className="deliverables">
            {service.deliverables.map((d, i) => (
              <li key={d} className="deliverable glass">
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <div className="outcome-grid">
            {service.outcomes.map((o) => (
              <div key={o} className="outcome glass">
                <span className="mono fact-k">Track record</span>
                <p>{o}</p>
              </div>
            ))}
          </div>

          {related.length > 0 && (
            <div className="related">
              <h2 className="sub-title reveal-up">Related case studies</h2>
              <div className="related-grid">
                {related.map((p) => (
                  <Link key={p.slug} to={`/projects/${p.slug}`} className="related-card glass reveal-up" style={{ ['--accent' as string]: p.accent }}>
                    <span className="mono pc-kind">{p.kind}</span>
                    <h3>{p.title}</h3>
                    <p className="muted">{p.description}</p>
                    <span className="card-link">
                      Read case study <ArrowUpRight width={16} height={16} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <ProcessSection n="03" />
      <FaqList n="04" items={service.faqs} heading={`${service.title}: FAQ`} />

      <section className="section other-services" data-scene="More services">
        <div className="container">
          <h2 className="sub-title">Other services</h2>
          <div className="pill-links">
            {others.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="pill-link glass">
                {s.title} <ArrowUpRight width={14} height={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand n="05" title={<>Ready to start your <span className="gradient-text">{service.title.toLowerCase()}</span> project?</>} />
    </>
  );
}
