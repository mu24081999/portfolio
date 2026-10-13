import { useRef } from 'react';
import { Link } from 'react-router';
import { useGSAP, gsap, MOTION, revealUp } from '../lib/motion';
import { projects, services } from '../data';
import { SceneLabel } from '../components/Chrome';
import { CtaBand, ServiceCards } from '../components/Blocks';
import { ArrowUpRight } from '../components/Icons';
import { Hero } from '../sections/Hero';
import { Founder } from '../sections/About';
import { ProjectStack } from '../sections/Projects';
import { Impact } from '../sections/Impact';
import { posts } from '../blog';
import { PostGrid } from './Blog';

function ServicesOverview() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => gsap.matchMedia().add(MOTION, () => revealUp(root.current, '.services-grid')), { scope: root });
  return (
    <section className="section services-overview" ref={root} data-scene="Services">
      <div className="container">
        <div className="section-head">
          <SceneLabel n="02">Services</SceneLabel>
          <h2 className="section-title reveal-up">
            Software that moves <span className="gradient-text">your business.</span>
          </h2>
          <p className="section-sub muted reveal-up">
            Six focused services, one engineering standard: clean architecture, measurable results and code your team can own.
          </p>
        </div>
        <ServiceCards items={services} />
        <div className="section-foot reveal-up">
          <Link className="text-link" to="/services">
            Compare all services <ArrowUpRight width={16} height={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <Founder n="03" variant="teaser" />
      <ProjectStack
        n="04"
        items={projects.slice(0, 4)}
        sub="Platforms built for clients and products: real-time communication, Web3, CRM and marketing automation."
        footer={
          <Link className="text-link" to="/projects">
            View all case studies <ArrowUpRight width={16} height={16} />
          </Link>
        }
      />
      <Impact n="05" />
      <section className="section" data-scene="Insights">
        <div className="container">
          <div className="section-head">
            <SceneLabel n="06">Insights</SceneLabel>
            <h2 className="section-title">
              From the <span className="gradient-text">blog.</span>
            </h2>
          </div>
          <PostGrid items={posts.slice(0, 3)} />
          <div className="section-foot">
            <Link className="text-link" to="/blog">
              Read all articles <ArrowUpRight width={16} height={16} />
            </Link>
          </div>
        </div>
      </section>
      <CtaBand n="07" />
    </>
  );
}
