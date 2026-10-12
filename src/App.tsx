import { useEffect, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, initSmoothScroll, lockScroll } from './lib/motion';
import { scenes } from './data';
import { Preloader } from './components/Preloader';
import { Background, CursorGlow, Nav, SceneHUD } from './components/Chrome';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Impact } from './sections/Impact';
import { Contact } from './sections/Contact';

export default function App() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const destroy = initSmoothScroll();
    lockScroll(true);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return destroy;
  }, []);

  useEffect(() => {
    if (!ready) return;
    lockScroll(false);
    ScrollTrigger.refresh();
  }, [ready]);

  useEffect(() => {
    document.documentElement.dataset.scene = active;
  }, [active]);

  // Children create their pins first (child layout effects run before the parent's), so these see final positions.
  useGSAP(() => {
    scenes.forEach((s) =>
      ScrollTrigger.create({
        trigger: `#${s.id}`,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setActive(s.id),
      }),
    );
    gsap.to('.progress span', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
  });

  return (
    <>
      <Preloader onReveal={() => setReady(true)} />
      <Background />
      <CursorGlow />
      <Nav active={active} />
      <SceneHUD active={active} />
      <main>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Impact />
        <Contact />
      </main>
    </>
  );
}
