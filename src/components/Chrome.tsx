import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { gsap, useGSAP, scrollToTarget } from '../lib/motion';
import { getTheme, setTheme, watchSystemTheme, type Theme } from '../lib/theme';
import { MoonIcon, SunIcon } from './Icons';
import { profile, scenes } from '../data';

/** Fixed atmosphere: drifting light orbs (tinted per scene), a perspective grid, film grain and a vignette. */
export function Background() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.orb-a', { yPercent: 60, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 1.5 } });
        gsap.to('.orb-b', { yPercent: -40, xPercent: -20, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 1.5 } });
        gsap.to('.bg-grid', { backgroundPositionY: '-600px', ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
      });
    },
    { scope: root },
  );
  return (
    <div className="bg" ref={root} aria-hidden>
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="bg-grid" />
      <div className="bg-grain" />
      <div className="bg-vignette" />
    </div>
  );
}

/** Horizontal logo; CSS shows the silver-wordmark file on dark and the slate-wordmark file on light. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      <img className="logo-img logo-on-dark" src="/brand/logo-dark.png" alt={profile.name} width={1387} height={401} />
      <img className="logo-img logo-on-light" src="/brand/logo-light.png" alt="" aria-hidden width={1387} height={401} />
    </span>
  );
}

export function Mark({ className = '' }: { className?: string }) {
  return <img className={`mark ${className}`} src="/brand/mark.png" alt="" aria-hidden width={311} height={401} />;
}

export function ThemeToggle() {
  const [theme, setLocal] = useState<Theme>(() => getTheme());
  useEffect(() => {
    const onTheme = (e: Event) => setLocal((e as CustomEvent<Theme>).detail);
    window.addEventListener('themechange', onTheme);
    const unwatch = watchSystemTheme();
    return () => {
      window.removeEventListener('themechange', onTheme);
      unwatch();
    };
  }, []);
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      className="theme-toggle"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTheme(next, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
    >
      <SunIcon className="icon-sun" />
      <MoonIcon className="icon-moon" />
    </button>
  );
}

const navLinks = scenes.filter((s) => !['home', 'impact'].includes(s.id));
const navLabel: Record<string, string> = { skills: 'Skills', experience: 'Experience', projects: 'Projects' };

export function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e: MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(`#${id}`);
  };

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-inner glass">
        <a href="#home" className="nav-logo" onClick={(e) => go(e, 'home')}>
          <Logo />
        </a>
        <nav className="nav-links" aria-label="Sections">
          {navLinks.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'is-active' : ''} onClick={(e) => go(e, s.id)}>
              {navLabel[s.id] ?? s.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
        <a href="#contact" className="btn btn-primary btn-sm nav-cta" onClick={(e) => go(e, 'contact')}>
          Hire me
        </a>
        <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
        </button>
      </div>
      <div className="nav-sheet glass" aria-hidden={!open}>
        {navLinks.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} onClick={(e) => go(e, s.id)} style={{ transitionDelay: `${open ? 80 + i * 50 : 0}ms` }} tabIndex={open ? 0 : -1}>
            <span className="mono">0{i + 1}</span>
            {navLabel[s.id] ?? s.label}
          </a>
        ))}
      </div>
    </header>
  );
}

/** Film-style HUD: scene counter bottom-left, chapter dots on the right, and a top progress bar. */
export function SceneHUD({ active }: { active: string }) {
  const idx = Math.max(0, scenes.findIndex((s) => s.id === active));
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <>
      <div className="progress" aria-hidden>
        <span />
      </div>
      <div className="hud" aria-hidden>
        <span className="hud-rec" />
        <span className="mono">SC {pad(idx + 1)}</span>
        <span className="hud-sep">/ {pad(scenes.length)}</span>
        <span className="hud-title" key={active}>
          {scenes[idx].label}
        </span>
      </div>
      <nav className="chapters" aria-label="Scenes">
        {scenes.map((s, i) => (
          <button
            key={s.id}
            className={i === idx ? 'is-active' : ''}
            onClick={() => scrollToTarget(`#${s.id}`)}
            aria-label={`Go to ${s.label}`}
          >
            <span className="chapter-label">{s.label}</span>
            <span className="chapter-dot" />
          </button>
        ))}
      </nav>
    </>
  );
}

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current!;
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      el.style.opacity = '1';
      // Spotlight + edge glow on whichever glass panel sits under the pointer.
      const glass = (e.target as Element | null)?.closest?.<HTMLElement>('.glass');
      if (glass) {
        const r = glass.getBoundingClientRect();
        glass.style.setProperty('--mx', `${e.clientX - r.left}px`);
        glass.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return <div className="cursor-glow" ref={ref} aria-hidden />;
}

export function SceneLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="scene-label reveal-up">
      <span className="mono">{n}</span>
      <span className="scene-label-line" />
      <span>{children}</span>
    </div>
  );
}
