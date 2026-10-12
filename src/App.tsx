import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { gsap, ScrollTrigger, useGSAP, initSmoothScroll, lockScroll, resetScroll, prefersReducedMotion } from './lib/motion';
import { applySeo, getSeo, notFoundSeo } from './seo';
import { Preloader } from './components/Preloader';
import { Background, CursorGlow, Nav, ReadyContext, SceneHUD, type SceneRef } from './components/Chrome';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import { ServiceDetailPage, ServicesPage } from './pages/Services';
import { ProjectDetailPage, ProjectsPage } from './pages/Projects';
import { AboutPage, ContactPage, ExperiencePage, SitemapPage } from './pages/Simple';
import NotFound from './pages/NotFound';

/** Runs before the new page's own effects, so its scroll scenes measure from the top. */
function ScrollReset({ path }: { path: string }) {
  useLayoutEffect(() => {
    resetScroll();
  }, [path]);
  return null;
}

/** Letterbox curtain that parts over each newly navigated page. */
function PageCurtain({ path }: { path: string }) {
  const root = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    gsap
      .timeline()
      .set(root.current, { display: 'block' })
      .fromTo('.curtain-top', { yPercent: 0 }, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, 0.05)
      .fromTo('.curtain-bottom', { yPercent: 0 }, { yPercent: 100, duration: 1, ease: 'expo.inOut' }, 0.05)
      .set(root.current, { display: 'none' });
  }, [path]);
  return (
    <div className="curtain" ref={root} aria-hidden>
      <div className="pl-bar curtain-top" />
      <div className="pl-bar curtain-bottom" />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const path = location.pathname;
  const [ready, setReady] = useState(false);
  const [scenes, setScenes] = useState<SceneRef[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
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
    applySeo(getSeo(path) ?? notFoundSeo);
  }, [path]);

  useEffect(() => {
    document.documentElement.dataset.tint = String(active % 6);
  }, [active]);

  // Each page marks its scenes with data-scene; the HUD, chapter dots and background tint follow them.
  // Children create their pins first (child layout effects run before the parent's), so these see final positions.
  useGSAP(
    () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('main [data-scene]'));
      setScenes(els.map((el) => ({ label: el.dataset.scene!, el })));
      setActive(0);
      els.forEach((el, i) =>
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActive(i),
        }),
      );
      gsap.fromTo('.progress span', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
      ScrollTrigger.refresh();
    },
    { dependencies: [path], revertOnUpdate: true },
  );

  return (
    <ReadyContext.Provider value={ready}>
      <Preloader onReveal={() => setReady(true)} />
      <PageCurtain path={path} />
      <Background />
      <CursorGlow />
      <Nav />
      <SceneHUD scenes={scenes} active={active} />
      <ScrollReset path={path} />
      <main key={path}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </ReadyContext.Provider>
  );
}
