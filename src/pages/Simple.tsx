import { Link } from 'react-router';
import { getSeo } from '../seo';
import { experience, projects, services } from '../data';
import { posts } from '../blog';
import { CtaBand, PageHero } from '../components/Blocks';
import { Founder } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Impact } from '../sections/Impact';
import { Experience } from '../sections/Experience';
import { Contact } from '../sections/Contact';

export function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        crumbs={getSeo('/about')!.crumbs}
        title={
          <>
            The engineer behind <span className="gradient-text">Umar Liaqat.</span>
          </>
        }
        lead="A software development studio founded by Muhammad Umar Liaqat — 5+ years shipping MERN, TypeScript, Web3 and AI automation products for fintech, Web3 and enterprise teams."
      />
      <Founder n="02" variant="full" />
      <Skills n="03" />
      <Impact n="04" />
      <CtaBand n="05" />
    </>
  );
}

export function ExperiencePage() {
  return (
    <>
      <PageHero
        label="Experience"
        crumbs={getSeo('/experience')!.crumbs}
        title={
          <>
            The <span className="gradient-text">journey.</span>
          </>
        }
        lead={`From React interfaces for medical teams to leading Web3 product lines — ${experience.length} roles across ${experience.map((j) => j.company).join(', ')}.`}
      />
      <Experience n="02" headless />
      <CtaBand n="03" title={<>Put this experience <span className="gradient-text">to work.</span></>} />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        crumbs={getSeo('/contact')!.crumbs}
        title={
          <>
            Let's build something <span className="gradient-text">remarkable.</span>
          </>
        }
        lead="Tell us about your product, automation or Web3 idea. You'll get a clear plan, timeline and estimate."
      />
      <Contact />
    </>
  );
}

export function SitemapPage() {
  const groups = [
    {
      title: 'Main pages',
      links: [
        { to: '/', label: 'Home' },
        { to: '/services', label: 'Services' },
        { to: '/projects', label: 'Projects' },
        { to: '/blog', label: 'Blog' },
        { to: '/about', label: 'About' },
        { to: '/experience', label: 'Experience' },
        { to: '/contact', label: 'Contact' },
      ],
    },
    { title: 'Services', links: services.map((s) => ({ to: `/services/${s.slug}`, label: s.title })) },
    { title: 'Case studies', links: projects.map((p) => ({ to: `/projects/${p.slug}`, label: p.title })) },
    { title: 'Blog', links: posts.map((p) => ({ to: `/blog/${p.slug}`, label: p.title })) },
  ];
  return (
    <>
      <PageHero label="Sitemap" crumbs={getSeo('/sitemap')!.crumbs} title={<>Sitemap</>} lead="Every page on this website, in one place." />
      <section className="section sitemap" data-scene="All pages">
        <div className="container sitemap-grid">
          {groups.map((g) => (
            <nav key={g.title} className="sitemap-col glass" aria-label={g.title}>
              <h2 className="mono">{g.title}</h2>
              {g.links.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </section>
    </>
  );
}
