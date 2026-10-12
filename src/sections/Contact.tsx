import { useRef, useState, type FormEvent } from 'react';
import { gsap, useGSAP, MOTION, revealUp } from '../lib/motion';
import { profile, services } from '../data';
import { ArrowUpRight, ChatIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, PinIcon, SendIcon } from '../components/Icons';

const channels = [
  { icon: MailIcon, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: ChatIcon, label: 'WhatsApp', value: profile.phone, href: profile.whatsapp, external: true },
  { icon: LinkedInIcon, label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, external: true },
  { icon: GitHubIcon, label: 'GitHub', value: profile.githubLabel, href: profile.github, external: true },
];

/** Contact scene: channels slide in from the left, the project brief form rises into place. */
export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        gsap.from('.channel', {
          x: -50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.channels', start: 'top 92%', toggleActions: 'play none none reverse' },
        });
        gsap.from('.contact-form', {
          y: 100,
          rotateX: 14,
          autoAlpha: 0,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.contact-form', start: 'top 100%', end: 'top 55%', scrub: 1 },
        });
        revealUp(root.current);
      });
    },
    { scope: root },
  );

  // No backend: compose the brief in the visitor's mail app.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const service = String(data.get('service') || '');
    const subject = `${service ? `${service} — ` : ''}Project inquiry from ${data.get('name')}`;
    const body = [
      String(data.get('message')),
      '',
      `Service: ${service || 'Not sure yet'}`,
      `Budget: ${data.get('budget') || 'Not specified'}`,
      `— ${data.get('name')}${data.get('company') ? `, ${data.get('company')}` : ''} (${data.get('email')})`,
    ].join('\n');
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="section contact" ref={root} data-scene="Contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-left">
            <h2 className="contact-sub reveal-up">Talk to the team</h2>
            <p className="muted reveal-up">
              Building a product, need a technical lead, or want to automate a workflow? Share a few details and you'll get a reply — usually within a day.
            </p>
            <div className="status-pill glass reveal-up">
              <span className="status-dot" /> Accepting new projects
            </div>
            <div className="channels">
              {channels.map(({ icon: Icon, label, value, href, external }) => (
                <a key={label} className="channel glass" href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
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
            <address className="contact-loc muted reveal-up">
              <PinIcon width={14} height={14} /> {profile.brand}, {profile.location} · <PhoneIcon width={14} height={14} />{' '}
              <a href={`tel:${profile.phoneE164}`}>{profile.phone}</a>
            </address>
          </div>

          <form className="contact-form glass" onSubmit={onSubmit} aria-label="Project inquiry">
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
            <div className="form-row">
              <label>
                <span>Company</span>
                <input name="company" placeholder="Company (optional)" autoComplete="organization" />
              </label>
              <label>
                <span>Service</span>
                <select name="service" defaultValue="">
                  <option value="">Not sure yet</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              <span>Budget</span>
              <select name="budget" defaultValue="">
                <option value="">Prefer to discuss</option>
                <option>Under $5k</option>
                <option>$5k – $15k</option>
                <option>$15k – $50k</option>
                <option>$50k+</option>
              </select>
            </label>
            <label>
              <span>Project details</span>
              <textarea name="message" required rows={5} placeholder="What are you building, who is it for, and when do you need it?" />
            </label>
            <button className="btn btn-primary btn-block" type="submit">
              {sent ? 'Opening your mail app…' : 'Send project brief'} <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
