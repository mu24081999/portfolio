import { useRef } from 'react';
import { Link } from 'react-router';
import { gsap, useGSAP, MOTION, scrollToTarget } from '../lib/motion';
import { profile, services } from '../data';
import { Logo } from './Chrome';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

const company = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
  { to: '/sitemap', label: 'Sitemap' },
];

export function Footer() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        gsap.from('.footer-giant', {
          yPercent: 40,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center bottom', scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <footer className="footer" ref={root}>
      <div className="footer-giant" aria-hidden>
        UMAR LIAQAT
      </div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p className="muted">{profile.intro}</p>
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <MailIcon />
            </a>
          </div>
        </div>
        <nav className="footer-col" aria-label="Services">
          <h2 className="mono">Services</h2>
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`}>
              {s.title}
            </Link>
          ))}
        </nav>
        <nav className="footer-col" aria-label="Company">
          <h2 className="mono">Company</h2>
          {company.map((c) => (
            <Link key={c.to} to={c.to}>
              {c.label}
            </Link>
          ))}
        </nav>
        <div className="footer-col">
          <h2 className="mono">Contact</h2>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`tel:${profile.phoneE164}`}>{profile.phone}</a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <span className="muted">{profile.location}</span>
        </div>
      </div>
      <div className="container footer-row">
        <span className="muted">
          © {new Date().getFullYear()} {profile.brand} · Software Development Services
        </span>
        <button className="mono back-top" onClick={() => scrollToTarget('main')}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
