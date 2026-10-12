import { experience, profile, projects, services, serviceBySlug, projectBySlug, skills, education } from './data';

/** Public origin used for canonical URLs, the sitemap and structured data. Override with VITE_SITE_URL. */
export const SITE_URL = String(import.meta.env.VITE_SITE_URL || 'https://devumar-portfolio.vercel.app').replace(/\/$/, '');

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const PERSON_ID = `${SITE_URL}/#founder`;
const BRAND = profile.brand;
const DEFAULT_IMAGE = '/brand/og.jpg';

export type Crumb = { name: string; path: string };

export type Seo = {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'profile' | 'article';
  noindex?: boolean;
  crumbs: Crumb[];
  priority: number;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  graph: Record<string, unknown>[];
};

const abs = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path === '/' ? '/' : path}`);

const organization = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: BRAND,
  alternateName: `${BRAND} — Software Development Services`,
  description: profile.intro,
  url: abs('/'),
  logo: { '@type': 'ImageObject', url: abs('/icon-512.png'), width: 512, height: 512 },
  image: abs(DEFAULT_IMAGE),
  email: profile.email,
  telephone: profile.phoneE164,
  address: { '@type': 'PostalAddress', addressLocality: profile.city, addressRegion: profile.region, addressCountry: profile.country },
  areaServed: 'Worldwide',
  founder: { '@id': PERSON_ID },
  sameAs: [profile.linkedin, profile.github],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: profile.email,
    telephone: profile.phoneE164,
    availableLanguage: ['English', 'Urdu'],
  },
  knowsAbout: ['Custom software development', 'Web application development', 'AI automation', 'Chatbots', 'Web3', 'Blockchain', 'CRM development', 'API development', 'DevOps', 'Cloud deployment'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Software development services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, url: abs(`/services/${s.slug}`) },
    })),
  },
};

const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  name: BRAND,
  alternateName: `${BRAND} Software Development`,
  url: abs('/'),
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
};

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: profile.name,
  jobTitle: profile.founderTitle,
  description: 'Full Stack Developer — MERN stack, TypeScript, Web3 and AI automation.',
  image: abs(profile.photo),
  url: abs('/about'),
  email: profile.email,
  worksFor: { '@id': ORG_ID },
  sameAs: [profile.linkedin, profile.github],
  address: { '@type': 'PostalAddress', addressLocality: profile.city, addressCountry: profile.country },
  alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
  knowsLanguage: ['English', 'Urdu'],
  knowsAbout: skills.flatMap((g) => g.items).slice(0, 24),
};

function breadcrumbList(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

function webPage(type: string, path: string, title: string, description: string, extra: Record<string, unknown> = {}) {
  return {
    '@type': type,
    '@id': `${abs(path)}#webpage`,
    url: abs(path),
    name: title,
    description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en',
    ...extra,
  };
}

const HOME: Crumb = { name: 'Home', path: '/' };

function page(
  path: string,
  title: string,
  description: string,
  opts: Partial<Omit<Seo, 'path' | 'title' | 'description' | 'graph'>> & { pageType?: string; extra?: Record<string, unknown>[] } = {},
): Seo {
  const crumbs = opts.crumbs ?? [HOME];
  const graph: Record<string, unknown>[] = [
    organization,
    website,
    webPage(opts.pageType ?? 'WebPage', path, title, description),
    ...(crumbs.length > 1 ? [breadcrumbList(crumbs)] : []),
    ...(opts.extra ?? []),
  ];
  return {
    path,
    title,
    description,
    image: opts.image,
    type: opts.type ?? 'website',
    noindex: opts.noindex,
    crumbs,
    priority: opts.priority ?? 0.7,
    changefreq: opts.changefreq ?? 'monthly',
    graph,
  };
}

const SERVICES: Crumb = { name: 'Services', path: '/services' };
const PROJECTS: Crumb = { name: 'Projects', path: '/projects' };

export function getSeo(path: string): Seo | null {
  const clean = path.replace(/\/+$/, '') || '/';

  if (clean === '/')
    return page(
      '/',
      `${BRAND} — Software Development Services in Lahore`,
      'Custom web applications, AI automation, Web3 platforms, CRMs and DevOps. Umar Liaqat builds scalable software for startups and enterprises from Lahore, Pakistan.',
      { priority: 1, changefreq: 'weekly', extra: [person] },
    );

  if (clean === '/services')
    return page(
      '/services',
      `Software Development Services | ${BRAND}`,
      'Explore software development services: custom web apps, AI automation and chatbots, Web3 and blockchain, CRM and business software, APIs and backend, DevOps and cloud.',
      {
        crumbs: [HOME, SERVICES],
        priority: 0.9,
        pageType: 'CollectionPage',
        extra: [
          {
            '@type': 'ItemList',
            name: 'Software development services',
            itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title, url: abs(`/services/${s.slug}`) })),
          },
        ],
      },
    );

  const serviceMatch = clean.match(/^\/services\/([\w-]+)$/);
  if (serviceMatch) {
    const s = serviceBySlug(serviceMatch[1]);
    if (!s) return null;
    const p = `/services/${s.slug}`;
    return page(p, `${s.seoTitle} | ${BRAND}`, s.metaDescription, {
      crumbs: [HOME, SERVICES, { name: s.title, path: p }],
      priority: 0.9,
      extra: [
        {
          '@type': 'Service',
          '@id': `${abs(p)}#service`,
          name: s.title,
          serviceType: s.title,
          description: s.metaDescription,
          url: abs(p),
          provider: { '@id': ORG_ID },
          areaServed: 'Worldwide',
          audience: { '@type': 'BusinessAudience', name: 'Startups and enterprises' },
        },
        {
          '@type': 'FAQPage',
          mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
      ],
    });
  }

  if (clean === '/projects')
    return page(
      '/projects',
      `Projects & Case Studies | ${BRAND}`,
      'Case studies from Umar Liaqat: an AI call center, Web3 wallet and KYC suite, AI-powered CRM, marketing automation, real estate marketplace and a home-services booking platform.',
      {
        crumbs: [HOME, PROJECTS],
        priority: 0.8,
        pageType: 'CollectionPage',
        extra: [
          {
            '@type': 'ItemList',
            name: 'Projects',
            itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: abs(`/projects/${p.slug}`) })),
          },
        ],
      },
    );

  const projectMatch = clean.match(/^\/projects\/([\w-]+)$/);
  if (projectMatch) {
    const pr = projectBySlug(projectMatch[1]);
    if (!pr) return null;
    const p = `/projects/${pr.slug}`;
    return page(p, `${pr.title} — Case Study | ${BRAND}`, `${pr.description} Built with ${pr.tags.slice(0, 4).join(', ')}.`, {
      crumbs: [HOME, PROJECTS, { name: pr.title, path: p }],
      type: 'article',
      priority: 0.6,
      extra: [
        {
          '@type': 'CreativeWork',
          '@id': `${abs(p)}#work`,
          name: pr.title,
          description: pr.description,
          url: abs(p),
          creator: { '@id': PERSON_ID },
          publisher: { '@id': ORG_ID },
          keywords: pr.tags.join(', '),
        },
      ],
    });
  }

  if (clean === '/about')
    return page(
      '/about',
      `About the Founder, Muhammad Umar Liaqat | ${BRAND}`,
      'Meet Muhammad Umar Liaqat, founder and lead engineer: 5+ years building MERN, TypeScript, Web3 and AI automation products for fintech, Web3 and enterprise clients.',
      { crumbs: [HOME, { name: 'About', path: '/about' }], type: 'profile', image: profile.photo, priority: 0.8, pageType: 'AboutPage', extra: [person] },
    );

  if (clean === '/experience')
    return page(
      '/experience',
      `Experience & Career Timeline | ${BRAND}`,
      `Career timeline of ${profile.name}: ${experience.map((j) => j.company).join(', ')} — from React front ends to leading Web3 product lines.`,
      { crumbs: [HOME, { name: 'Experience', path: '/experience' }], priority: 0.6, extra: [person] },
    );

  if (clean === '/contact')
    return page(
      '/contact',
      `Contact — Start Your Software Project | ${BRAND}`,
      'Tell us about your product, automation or Web3 idea. Email, WhatsApp or send a message — based in Lahore, Pakistan, working with clients worldwide.',
      { crumbs: [HOME, { name: 'Contact', path: '/contact' }], priority: 0.8, pageType: 'ContactPage' },
    );

  if (clean === '/sitemap')
    return page('/sitemap', `Sitemap | ${BRAND}`, 'Every page on the Umar Liaqat website: services, projects, about, experience and contact.', {
      crumbs: [HOME, { name: 'Sitemap', path: '/sitemap' }],
      priority: 0.3,
      changefreq: 'yearly',
    });

  return null;
}

export const notFoundSeo: Seo = {
  ...page('/404', `Page not found | ${BRAND}`, 'This page does not exist. Explore services, projects or get in touch.', { noindex: true }),
};

/** Every indexable path — used by the prerenderer and sitemap.xml. */
export const allPaths: string[] = [
  '/',
  '/services',
  ...services.map((s) => `/services/${s.slug}`),
  '/projects',
  ...projects.map((p) => `/projects/${p.slug}`),
  '/about',
  '/experience',
  '/contact',
  '/sitemap',
];

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Head tags for a page. Every managed tag carries data-seo so the client can swap them on navigation. */
export function renderHead(seo: Seo) {
  const url = abs(seo.path === '/404' ? '/' : seo.path);
  const image = abs(seo.image ?? DEFAULT_IMAGE);
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': seo.graph }).replace(/</g, '\\u003c');
  return [
    `<meta data-seo name="description" content="${esc(seo.description)}" />`,
    `<meta data-seo name="robots" content="${seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    seo.noindex ? '' : `<link data-seo rel="canonical" href="${url}" />`,
    `<meta data-seo property="og:site_name" content="${BRAND}" />`,
    `<meta data-seo property="og:type" content="${seo.type ?? 'website'}" />`,
    `<meta data-seo property="og:title" content="${esc(seo.title)}" />`,
    `<meta data-seo property="og:description" content="${esc(seo.description)}" />`,
    `<meta data-seo property="og:url" content="${url}" />`,
    `<meta data-seo property="og:image" content="${image}" />`,
    `<meta data-seo property="og:locale" content="en_US" />`,
    `<meta data-seo name="twitter:card" content="summary_large_image" />`,
    `<meta data-seo name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta data-seo name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta data-seo name="twitter:image" content="${image}" />`,
    `<script data-seo type="application/ld+json">${json}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');
}

export function renderTitle(seo: Seo) {
  return `<title>${esc(seo.title)}</title>`;
}

/** Client-side: swap head tags after an in-app navigation. */
export function applySeo(seo: Seo) {
  document.title = seo.title;
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
  document.head.insertAdjacentHTML('beforeend', renderHead(seo));
}

export function sitemapXml(lastmod: string) {
  const urls = allPaths
    .map((p) => getSeo(p)!)
    .map(
      (s) =>
        `  <url>\n    <loc>${abs(s.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${s.changefreq}</changefreq>\n    <priority>${s.priority.toFixed(1)}</priority>\n  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function robotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}
