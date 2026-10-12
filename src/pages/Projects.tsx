import { useRef } from 'react';
import { Link, useParams } from 'react-router';
import { gsap, useGSAP, MOTION, revealUp } from '../lib/motion';
import { projectBySlug, projects, serviceBySlug } from '../data';
import { getSeo } from '../seo';
import { SceneLabel } from '../components/Chrome';
import { CtaBand, PageHero } from '../components/Blocks';
import { ArrowUpRight } from '../components/Icons';
import { ProjectStack } from '../sections/Projects';
import NotFound from './NotFound';

export function ProjectsPage() {
  return (
    <>
      <PageHero
        label="Projects"
        crumbs={getSeo('/projects')!.crumbs}
        title={
          <>
            Projects & <span className="gradient-text">case studies.</span>
          </>
        }
        lead="Real-time call centers, Web3 wallets, AI-powered CRMs, marketing automation and marketplaces — built for clients and as in-house products."
      />
      <ProjectStack n="02" items={projects} headless />
      <CtaBand n="03" title={<>Want results like these? <span className="gradient-text">Let's talk.</span></>} />
    </>
  );
}

export function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const project = projectBySlug(slug);
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        revealUp(root.current);
        gsap.from('.case-visual', {
          scale: 1.15,
          autoAlpha: 0,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.case-visual', start: 'top 100%', end: 'top 40%', scrub: 1 },
        });
      });
    },
    { scope: root, dependencies: [slug], revertOnUpdate: true },
  );

  if (!project) return <NotFound />;
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const usedServices = project.services.map((s) => serviceBySlug(s)!).filter(Boolean);

  return (
    <>
      <PageHero
        key={project.slug}
        label="Case study"
        crumbs={getSeo(`/projects/${project.slug}`)!.crumbs}
        title={<>{project.title}</>}
        lead={project.description}
      >
        <div className="chips">
          {project.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="section case" ref={root} data-scene="Overview" style={{ ['--accent' as string]: project.accent }}>
        <div className="container case-grid">
          <div className="case-main">
            <SceneLabel n="02">Overview</SceneLabel>
            {project.overview.map((p) => (
              <p key={p} className="case-text reveal-up">
                {p}
              </p>
            ))}
            <h2 className="sub-title reveal-up">Highlights</h2>
            <ul className="pc-highlights case-highlights">
              {project.highlights.map((h) => (
                <li key={h} className="reveal-up">
                  {h}
                </li>
              ))}
            </ul>
            <div className="case-visual pc-visual glass" aria-hidden>
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
            </div>
          </div>
          <aside className="case-facts glass reveal-up">
            <div>
              <span className="mono fact-k">Role</span>
              <p>{project.role}</p>
            </div>
            {project.period && (
              <div>
                <span className="mono fact-k">Timeline</span>
                <p>{project.period}</p>
              </div>
            )}
            <div>
              <span className="mono fact-k">Category</span>
              <p>{project.kind}</p>
            </div>
            <div>
              <span className="mono fact-k">Services</span>
              {usedServices.map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="text-link">
                  {s.title}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section next-project" data-scene="Next project">
        <div className="container">
          <Link to={`/projects/${next.slug}`} className="next-card glass">
            <span className="mono">Next case study</span>
            <span className="next-title">{next.title}</span>
            <ArrowUpRight width={32} height={32} />
          </Link>
        </div>
      </section>
      <CtaBand n="04" />
    </>
  );
}
