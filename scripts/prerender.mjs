// Renders every route to its own static HTML file (with per-page <title>, meta, canonical and JSON-LD),
// then writes sitemap.xml and robots.txt. Runs after the client and SSR builds.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const ssr = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const build = (url, seo) =>
  template
    .replace('<!--app-head-->', `${ssr.renderTitle(seo)}\n    ${ssr.renderHead(seo)}`)
    .replace('<!--app-html-->', ssr.render(url));

for (const url of ssr.allPaths) {
  const seo = ssr.getSeo(url);
  // /about → about.html (served at /about with clean URLs); / → index.html
  const file = url === '/' ? 'index.html' : `${url.slice(1)}.html`;
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, build(url, seo));
  console.log(`  prerendered ${url.padEnd(48)} → ${file}`);
}

fs.writeFileSync(path.join(dist, '404.html'), build('/404', ssr.notFoundSeo));
fs.writeFileSync(path.join(dist, 'sitemap.xml'), ssr.sitemapXml(new Date().toISOString().slice(0, 10)));
fs.writeFileSync(path.join(dist, 'robots.txt'), ssr.robotsTxt());
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`  wrote 404.html, sitemap.xml, robots.txt (${ssr.SITE_URL})`);
