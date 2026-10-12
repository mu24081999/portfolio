import { useRef, useState, type FormEvent } from 'react';
import { gsap, SplitText, useGSAP, MOTION, revealUp, scrollToTarget } from '../lib/motion';
import { profile } from '../data';
import { Logo, SceneLabel } from '../components/Chrome';
import { ArrowUpRight, ChatIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, PinIcon, SendIcon } from '../components/Icons';

const channels = [
  { icon: MailIcon, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: ChatIcon, label: 'WhatsApp', value: profile.phone, href: profile.whatsapp, external: true },
  { icon: LinkedInIcon, label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, external: true },
  { icon: GitHubIcon, label: 'GitHub', value: profile.githubLabel, href: profile.github, external: true },
];

/** Scene 07 — Contact. The closing title rises line by line out of a mask; the form panel slides up. */
export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        const split = SplitText.create('.contact-title', { type: 'words,lines', mask: 'lines' });
        gsap.from(split.lines, {
          yPercent: 110,
          stagger: 0.12,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.contact-title', start: 'top 85%', toggleActions: 'play none none reverse' },
        });
        gsap.from('.channel', {
          x: -50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.channels', start: 'top 85%', toggleActions: 'play none none reverse' },
        });
        gsap.from('.contact-form', {
          y: 100,
          rotateX: 14,
          autoAlpha: 0,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.contact-form', start: 'top 100%', end: 'top 55%', scrub: 1 },
        });
        gsap.from('.footer-giant', {
          yPercent: 40,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true },
        });
        revealUp(root.current);
        return () => split.revert();
      });
    },
    { scope: root },
  );

  // No backend: compose the message in the visitor's mail app.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = String(data.get('subject') || 'Project inquiry');
    const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section contact" ref={root}>
      <div className="container">
        <SceneLabel n="07">Contact</SceneLabel>
        <h2 className="contact-title">
          Let's build something <span className="gradient-text">remarkable.</span>
        </h2>

        <div className="contact-grid">
          <div className="contact-left">
            <p className="muted reveal-up">
              Have a product to build, a team that needs a technical lead, or a workflow to automate? Tell me about it. I usually reply within a day.
            </p>
            <div className="status-pill glass reveal-up">
              <span className="status-dot" /> Open to freelance &amp; full-time roles
            </div>
            <div className="channels">
              {channels.map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  className="channel glass"
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <span className="channel-icon">
                    <Icon />
                  </span>
                  <span className="channel-text">
                    <span className="mono">{label}</span>
                    <span>{value}</span>
                  </span>
                  <ArrowUpRight className="channel-arrow" />
                </a>
              ))}
            </div>
            <p className="contact-loc muted reveal-up">
              <PinIcon width={14} height={14} /> {profile.location} · <PhoneIcon width={14} height={14} /> {profile.phone}
            </p>
          </div>

          <form className="contact-form glass" onSubmit={onSubmit}>
            <div className="form-row">
              <label>
                <span>Name</span>
                <input name="name" required placeholder="Your name" autoComplete="name" />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
              </label>
            </div>
            <label>
              <span>Subject</span>
              <input name="subject" placeholder="Project inquiry" />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" required rows={5} placeholder="Tell me about your project, timeline and goals…" />
            </label>
            <button className="btn btn-primary btn-block" type="submit">
              {sent ? 'Opening your mail app…' : 'Send message'} <SendIcon />
            </button>
          </form>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-giant" aria-hidden>
          UMAR LIAQAT
        </div>
        <div className="container footer-row">
          <div className="footer-brand">
            <Logo />
            <span className="muted">© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          </div>
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
            <button className="mono back-top" onClick={() => scrollToTarget('#home')}>
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
}
