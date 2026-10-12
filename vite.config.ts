import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Bundle the animation libraries into the SSR build so the prerenderer can import them in Node.
  ssr: { noExternal: ['gsap', '@gsap/react', 'lenis'] },
});
