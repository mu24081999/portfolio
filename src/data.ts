// Content is sourced from Muhammad_Umar_Liaqat_Resume.pdf — edit here to update every page, the sitemap and the structured data.

export const profile = {
  name: 'Muhammad Umar Liaqat',
  brand: 'Umar Liaqat',
  firstLine: 'Muhammad Umar',
  lastLine: 'Liaqat',
  title: 'Full Stack Developer',
  founderTitle: 'Founder & Lead Engineer',
  tagline: 'Custom Software, AI Automation & Web3 Development',
  roles: ['Custom Web Applications', 'AI Automation', 'Web3 & Blockchain', 'CRM & Business Software', 'APIs & DevOps'],
  intro:
    'Umar Liaqat is a software development studio in Lahore building custom web applications, AI automation, Web3 platforms and business software for startups and enterprises worldwide.',
  location: 'Lahore, Pakistan',
  city: 'Lahore',
  region: 'Punjab',
  country: 'PK',
  email: 'mu24081999@gmail.com',
  phone: '+92 317 4660027',
  phoneE164: '+923174660027',
  whatsapp: 'https://wa.me/923174660027',
  linkedin: 'https://www.linkedin.com/in/muhammad-umar-liaqat-00b578181',
  linkedinLabel: 'muhammad-umar-liaqat',
  github: 'https://github.com/mu24081999',
  githubLabel: 'mu24081999',
  resume: '/Muhammad_Umar_Liaqat_Resume.pdf',
  photo: '/brand/umar-liaqat.jpg',
  photoWebp: '/brand/umar-liaqat.webp',
};

export const summary =
  'Results-driven Full Stack Developer with 5+ years of experience designing, building, and scaling web applications across the MERN stack, TypeScript, and AI-driven automation. Umar leads cross-functional engineering teams, architects microservices, and ships high-performance products for Web3, fintech, and enterprise clients.';

export const summaryExtra =
  'The studio is built on the same principles: clean architecture, DevOps automation and measurable business impact for every client.';

export const stats = [
  { value: 5, suffix: '+', label: 'Years building' },
  { value: 6, suffix: '', label: 'Core services' },
  { value: 40, suffix: '%', label: 'Faster APIs' },
];

export const education = {
  degree: 'BS Computer Science',
  school: 'University of Rawalakot',
  period: '2017 – 2021',
  note: 'CGPA 3.01',
};

export const languages = ['English — Full professional', 'Urdu — Full professional'];

export const interests = ['DevOps', 'Docker', 'Artificial Intelligence', 'Automation', 'Machine Learning'];

export type SkillGroup = { title: string; glyph: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    title: 'Frontend',
    glyph: '</>',
    items: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Redux / Zustand', 'Next.js (SSR · SSG)', 'Tailwind CSS', 'SCSS', 'Material UI', 'Bootstrap', 'Mobile-first design'],
  },
  {
    title: 'Backend',
    glyph: '{ }',
    items: ['Node.js', 'Express.js', 'Laravel', 'Flask / Flask-RESTful', 'REST & GraphQL', 'WebSockets', 'JWT / OAuth', 'Microservices', 'Celery / Redis tasks'],
  },
  {
    title: 'Databases',
    glyph: '[db]',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  },
  {
    title: 'Web3 & AI Automation',
    glyph: '◇',
    items: ['Wallet integration', 'Web3.js / Ethers.js', 'Fireblocks', 'AI workflow automation', 'NLP chatbots', 'Twilio · WebRTC'],
  },
  {
    title: 'DevOps & Tools',
    glyph: '>_',
    items: ['Docker & Compose', 'AWS', 'DigitalOcean', 'Vercel · Netlify', 'CI/CD pipelines', 'Rate limiting & caching', 'Git', 'Jira · Confluence'],
  },
];

export const marquee = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'AWS',
  'Web3.js', 'Ethers.js', 'Twilio', 'WebRTC', 'Socket.io', 'Laravel', 'Flask', 'GraphQL', 'Tailwind', 'CI/CD',
];

export type Job = {
  role: string;
  company: string;
  location?: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const experience: Job[] = [
  {
    role: 'Full Stack Developer (Lead)',
    company: 'Astra Protocol',
    location: 'Lahore, Pakistan',
    period: 'Sep 2025 — Present',
    current: true,
    points: [
      'Lead full-stack development across multiple Web3 products — a KYC platform, on-chain data services, Fireblocks wallet integration and a custom Astra wallet.',
      'Technical lead across concurrent product lines, owning architecture decisions, code quality and delivery timelines for a cross-functional team.',
    ],
  },
  {
    role: 'Senior Full Stack Developer',
    company: 'InterTech Global',
    location: 'Lahore, Pakistan',
    period: 'Jun 2025 — Sep 2025',
    points: [
      'Architected AI-driven automation combining NLP, workflow automation and chatbot systems for enterprise clients.',
      'Built scalable apps with TypeScript, Node.js, React and Express on well-documented REST APIs.',
      'Designed automation pipelines and reporting dashboards that cut manual reporting effort; configured cloud deployments and CI/CD.',
    ],
  },
  {
    role: 'MERN Stack Developer',
    company: 'JustCall',
    period: 'Dec 2023 — May 2025',
    points: [
      'Built a full CRM — voice, SMS and email marketing — with MERN and AI automation, real-time chat, role-based auth and permissions.',
      'Delivered a Zameen.com-style real estate marketplace with secure role-based access control.',
      'Shipped multiple full-stack apps end to end, including a social media management platform.',
    ],
  },
  {
    role: 'Frontend Developer (React)',
    company: 'Appify Tech',
    location: 'Lahore, Pakistan',
    period: 'Aug 2022 — Nov 2023',
    points: [
      'Designed and built responsive medical application interfaces with React, Redux, Tailwind and Material UI.',
      'Partnered with doctors and stakeholders to turn clinical workflows into reusable UI components.',
      'Ran sprint planning and cross-team tracking with GitHub, Jira and Confluence.',
    ],
  },
  {
    role: 'Full Stack Developer (Laravel + React)',
    company: 'Tech Consultants',
    period: 'Jan 2022 — Aug 2022',
    points: [
      'Designed and integrated RESTful Laravel APIs with React front ends.',
      'Owned the project roadmap and agile ceremonies while coordinating a small team.',
      'Managed end-to-end delivery, from planning through deployment.',
    ],
  },
];

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;
  short: string;
  glyph: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  deliverables: string[];
  stack: string[];
  outcomes: string[];
  projects: string[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: 'custom-web-application-development',
    title: 'Custom Web Application Development',
    short: 'Full-stack web apps, SaaS platforms and dashboards built on React, Next.js and Node.js.',
    glyph: '</>',
    seoTitle: 'Custom Web Application Development',
    metaDescription:
      'Custom web application development with React, Next.js, Node.js and TypeScript. SaaS platforms, dashboards and marketplaces built to scale, from Lahore for clients worldwide.',
    intro:
      'From first sketch to production, we build fast, maintainable web applications on the MERN stack and Next.js — SaaS products, admin dashboards, marketplaces and customer portals designed to scale with your users.',
    deliverables: [
      'Product architecture and technical planning',
      'Responsive, mobile-first React and Next.js front ends (SSR / SSG)',
      'Node.js and Express back ends with documented REST or GraphQL APIs',
      'Authentication, roles and permissions (JWT / OAuth)',
      'Real-time features with WebSockets and Socket.io',
      'Deployment, CI/CD and post-launch support',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Redux / Zustand'],
    outcomes: ['Marketplaces, CRMs and SaaS platforms shipped end to end', 'Applications scaled to hundreds of concurrent users'],
    projects: ['ai-powered-crm', 'real-estate-marketplace', 'mahir', 'digital-marketing-kit'],
    faqs: [
      { q: 'Which technologies do you use for web applications?', a: 'Most projects use React or Next.js with TypeScript on the front end and Node.js with Express on the back end, backed by MongoDB, PostgreSQL or MySQL. Laravel and Flask are available when a project already depends on them.' },
      { q: 'Can you take over or extend an existing application?', a: 'Yes. Existing codebases are reviewed first, then improved incrementally — refactoring, performance work, new features and better test and deployment pipelines.' },
      { q: 'Do you work with clients outside Pakistan?', a: 'Yes. The studio is based in Lahore and works remotely with clients in other countries and time zones, using Jira, Confluence and GitHub to keep work visible.' },
    ],
  },
  {
    slug: 'ai-automation-and-chatbots',
    title: 'AI Automation & Chatbots',
    short: 'NLP chatbots, AI call handling and workflow automation that remove repetitive work.',
    glyph: '✦',
    seoTitle: 'AI Automation & Chatbot Development',
    metaDescription:
      'AI automation services: NLP chatbots, AI-driven call handling, workflow automation and reporting pipelines that cut manual effort. Built with Node.js, TypeScript, Twilio and WebRTC.',
    intro:
      'We design AI-driven automation that takes repetitive work off your team — customer-support chatbots, AI call handling, data pipelines and reporting dashboards, integrated with the tools you already use.',
    deliverables: [
      'Process review to find the highest-value automation opportunities',
      'NLP-based chatbots for support and lead qualification',
      'AI-driven voice and call handling with Twilio and WebRTC',
      'Workflow automation and background jobs (Celery / Redis)',
      'Automated reporting pipelines and dashboards',
      'Integration with CRMs, email, SMS and internal systems',
    ],
    stack: ['Node.js', 'TypeScript', 'NLP', 'Twilio', 'WebRTC', 'Redis', 'Celery', 'React'],
    outcomes: ['AI workflows that cut manual support intervention by 30%', 'Automation pipelines that reduced manual reporting effort'],
    projects: ['smart-call-center', 'ai-powered-crm', 'digital-marketing-kit'],
    faqs: [
      { q: 'What kinds of tasks can be automated with AI?', a: 'Common wins are customer-support conversations, call routing and handling, lead qualification, data entry between systems and recurring reports. Each project starts by measuring where manual time actually goes.' },
      { q: 'Will automation replace my support team?', a: 'The goal is to remove repetitive work so people handle the conversations that need them. Previous AI support workflows cut manual intervention by around 30%.' },
      { q: 'Can AI automation connect to my existing CRM?', a: 'Yes. Automations are built around APIs, so they can read from and write to CRMs, helpdesks, email and SMS providers you already use.' },
    ],
  },
  {
    slug: 'web3-blockchain-development',
    title: 'Web3 & Blockchain Development',
    short: 'Wallet integration, KYC platforms, on-chain data services and custody with Fireblocks.',
    glyph: '◇',
    seoTitle: 'Web3 & Blockchain Development',
    metaDescription:
      'Web3 development services: crypto wallet integration, Fireblocks custody, KYC platforms and on-chain data services built with Web3.js, Ethers.js and TypeScript.',
    intro:
      'We build production Web3 products — wallet experiences, custody integrations, KYC platforms and on-chain data services — with the same engineering discipline as any enterprise system.',
    deliverables: [
      'Wallet integration with Web3.js and Ethers.js',
      'Custody-grade wallet infrastructure with Fireblocks',
      'Custom wallet products',
      'KYC and onboarding platforms',
      'On-chain data services and APIs',
      'Technical leadership across multiple Web3 product lines',
    ],
    stack: ['Web3.js', 'Ethers.js', 'Fireblocks', 'TypeScript', 'Node.js', 'React'],
    outcomes: ['Leads full-stack delivery of the Astra Protocol Web3 suite', 'Wallet, KYC and data products run as concurrent product lines'],
    projects: ['astra-web3-suite'],
    faqs: [
      { q: 'Do you build crypto wallets?', a: 'Yes — both integrations with existing wallets via Web3.js and Ethers.js, and custom wallet products, including custody-grade setups with Fireblocks.' },
      { q: 'Can you build a KYC platform for a Web3 product?', a: 'Yes. KYC and onboarding platforms are part of current Web3 work at Astra Protocol, alongside wallet and on-chain data services.' },
      { q: 'Do you write smart contracts?', a: 'The focus is the application layer — wallets, custody, KYC, data services and the web apps around them. Smart-contract work can be scoped together with a specialist auditor when a project needs it.' },
    ],
  },
  {
    slug: 'crm-and-business-software',
    title: 'CRM & Business Software',
    short: 'CRMs, marketing platforms, POS and marketplaces with roles, permissions and real-time data.',
    glyph: '▦',
    seoTitle: 'CRM & Business Software Development',
    metaDescription:
      'Custom CRM and business software development: voice, SMS and email marketing CRMs, POS systems, marketplaces and social media tools with role-based access and real-time chat.',
    intro:
      'Off-the-shelf tools rarely fit the way your business actually works. We build CRMs, marketing platforms, POS systems and marketplaces around your process — with the roles, permissions and integrations you need.',
    deliverables: [
      'Custom CRM with voice, SMS and email marketing',
      'Role-based authentication and permissions management',
      'Real-time chat and notifications',
      'Marketplaces and booking platforms',
      'POS and social media management tools',
      'Analytics, lead management and reporting',
    ],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io', 'Twilio', 'Redis'],
    outcomes: ['Multi-module projects spanning CRM, POS, real estate and social media', 'Marketing platforms handling hundreds of concurrent campaigns'],
    projects: ['ai-powered-crm', 'digital-marketing-kit', 'real-estate-marketplace', 'mahir'],
    faqs: [
      { q: 'Why build a custom CRM instead of using an existing one?', a: 'A custom CRM fits your exact sales and support process, avoids per-seat costs at scale and can combine voice, SMS, email and AI automation in one place.' },
      { q: 'Can the CRM handle calls, SMS and email?', a: 'Yes. Previous CRM work combined voice, SMS and email marketing with real-time chat and AI automation.' },
      { q: 'How do you handle user roles and data access?', a: 'Every platform includes role-based access control, so each team member only sees and changes what their role allows.' },
    ],
  },
  {
    slug: 'api-and-backend-development',
    title: 'API & Backend Development',
    short: 'REST & GraphQL APIs, microservices and real-time systems that stay fast under load.',
    glyph: '{ }',
    seoTitle: 'API & Backend Development Services',
    metaDescription:
      'Backend and API development: REST and GraphQL APIs, microservices, WebSockets and real-time communication with Twilio and WebRTC. Caching and refactoring for up to 40% faster responses.',
    intro:
      'We design back ends that stay fast and reliable as you grow — clean REST and GraphQL APIs, microservice architectures and real-time systems for chat, voice and live data.',
    deliverables: [
      'REST and GraphQL API design and documentation',
      'Microservices architecture with gateway routing',
      'Real-time communication with WebSockets, Socket.io, Twilio and WebRTC',
      'Authentication and authorization (JWT / OAuth)',
      'Caching, rate limiting and performance tuning',
      'Background processing with Celery and Redis',
    ],
    stack: ['Node.js', 'Express', 'TypeScript', 'GraphQL', 'Laravel', 'Flask', 'Redis', 'PostgreSQL', 'MongoDB'],
    outcomes: ['API response times reduced by up to 40% through refactoring and caching', 'Real-time systems supporting hundreds of concurrent users'],
    projects: ['smart-call-center', 'ai-powered-crm'],
    faqs: [
      { q: 'Should my product use microservices?', a: 'Not always. Microservices pay off when parts of a system scale or change independently — like the auth, AI call-handling, analytics and gateway services in the Smart Call Center. Smaller products often start as a well-structured monolith.' },
      { q: 'Can you make an existing API faster?', a: 'Usually, yes. Profiling, query optimization, refactoring and caching have previously cut API response times by up to 40%.' },
      { q: 'Do you build real-time features?', a: 'Yes — live chat, notifications, voice and video using WebSockets, Socket.io, Twilio and WebRTC.' },
    ],
  },
  {
    slug: 'devops-and-cloud-deployment',
    title: 'DevOps & Cloud Deployment',
    short: 'Docker, CI/CD pipelines and cloud hosting on AWS, DigitalOcean and Vercel.',
    glyph: '>_',
    seoTitle: 'DevOps & Cloud Deployment Services',
    metaDescription:
      'DevOps and cloud deployment services: Docker and Docker Compose, CI/CD pipelines, and high-availability hosting on AWS, DigitalOcean, Vercel and Netlify.',
    intro:
      'Shipping should be boring. We containerize your applications, automate testing and deployment, and set up cloud hosting that keeps production available.',
    deliverables: [
      'Containerization with Docker and Docker Compose',
      'CI/CD pipelines for automated build, test and deploy',
      'Cloud setup on AWS, DigitalOcean, Vercel or Netlify',
      'High-availability production deployments',
      'API rate limiting and caching',
      'Environment, secrets and release management',
    ],
    stack: ['Docker', 'Docker Compose', 'AWS', 'DigitalOcean', 'Vercel', 'Netlify', 'CI/CD', 'Git'],
    outcomes: ['Cloud deployments and CI/CD for high-availability production apps', 'Rate limiting and caching built into production APIs'],
    projects: ['smart-call-center', 'astra-web3-suite'],
    faqs: [
      { q: 'Which cloud providers do you work with?', a: 'AWS, DigitalOcean, Vercel and Netlify. The right choice depends on your traffic, budget and how much of the infrastructure you want to manage.' },
      { q: 'Can you set up CI/CD for an existing project?', a: 'Yes. Pipelines can be added to existing repositories so every change is built, tested and deployed automatically.' },
      { q: 'Do you containerize applications?', a: 'Yes. Applications are packaged with Docker and Docker Compose so they run the same way in development and production.' },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  kind: string;
  role: string;
  period?: string;
  description: string;
  overview: string[];
  highlights: string[];
  tags: string[];
  services: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    slug: 'smart-call-center',
    title: 'Smart Call Center',
    kind: 'AI · Microservices',
    role: 'Architecture & full-stack development',
    description: 'A scalable AI-driven call center built on a microservices architecture, supporting hundreds of concurrent users.',
    overview: [
      'Smart Call Center is an AI-driven call center system built with Node.js (Express), TypeScript, Twilio and WebRTC.',
      'The platform is split into dedicated microservices for authentication, AI-driven call handling, analytics and gateway routing, so each part can scale and evolve independently.',
    ],
    highlights: ['Dedicated auth, AI call-handling, analytics and gateway services', 'Real-time voice over Twilio and WebRTC', 'Supports hundreds of concurrent users'],
    tags: ['Node.js', 'Express', 'TypeScript', 'Twilio', 'WebRTC', 'Microservices'],
    services: ['ai-automation-and-chatbots', 'api-and-backend-development', 'devops-and-cloud-deployment'],
    accent: '#5eeaff',
  },
  {
    slug: 'astra-web3-suite',
    title: 'Astra Web3 Suite',
    kind: 'Web3 · Technical lead',
    role: 'Full Stack Developer (Lead) at Astra Protocol',
    period: 'Sep 2025 — Present',
    description: 'A family of Web3 products: a KYC platform, on-chain data services, Fireblocks wallet integration and the custom Astra wallet.',
    overview: [
      'At Astra Protocol, Umar leads full-stack development across multiple Web3 products running in parallel.',
      'The suite covers a KYC platform, on-chain data services, Fireblocks wallet integration and a custom Astra wallet, with ownership of architecture decisions, code quality and delivery timelines for a cross-functional engineering team.',
    ],
    highlights: ['Architecture and delivery across concurrent product lines', 'Custody-grade wallet integration with Fireblocks', 'KYC platform and on-chain data services'],
    tags: ['Web3', 'Fireblocks', 'KYC', 'Wallets', 'On-chain data'],
    services: ['web3-blockchain-development', 'devops-and-cloud-deployment'],
    accent: '#818cf8',
  },
  {
    slug: 'ai-powered-crm',
    title: 'AI-Powered CRM',
    kind: 'CRM · Full stack',
    role: 'MERN Stack Developer at JustCall',
    period: 'Dec 2023 — May 2025',
    description: 'A full-featured CRM for voice, SMS and email marketing, with AI automation, real-time chat and granular permissions.',
    overview: [
      'A full-featured CRM combining voice, SMS and email marketing, built on the MERN stack with AI automation.',
      'It includes real-time chat, role-based authentication and permissions management so teams can work from a single, secure workspace.',
    ],
    highlights: ['Voice, SMS and email marketing in one CRM', 'Role-based authentication and permissions management', 'Real-time chat and AI automation'],
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io', 'AI automation'],
    services: ['crm-and-business-software', 'ai-automation-and-chatbots', 'custom-web-application-development'],
    accent: '#38bdf8',
  },
  {
    slug: 'digital-marketing-kit',
    title: 'Digital Marketing Kit',
    kind: 'Marketing automation',
    role: 'Product design & full-stack development',
    description: 'An AI-driven marketing platform for email, SMS and voice campaigns with analytics and lead management.',
    overview: [
      'Digital Marketing Kit is a scalable, AI-driven marketing platform for running email, SMS and voice campaigns from one place.',
      'Built on the MERN stack, it combines campaign analytics with lead management and handles hundreds of concurrent campaigns.',
    ],
    highlights: ['Email, SMS and voice campaigns', 'Campaign analytics and lead management', 'Handles hundreds of concurrent campaigns'],
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'AI'],
    services: ['crm-and-business-software', 'ai-automation-and-chatbots', 'custom-web-application-development'],
    accent: '#2dd4bf',
  },
  {
    slug: 'real-estate-marketplace',
    title: 'Real Estate Marketplace',
    kind: 'Marketplace · Full stack',
    role: 'MERN Stack Developer at JustCall',
    description: 'A Zameen.com-style property marketplace connecting buyers, sellers and agents, with secure role-based access control.',
    overview: [
      'A real estate marketplace in the style of Zameen.com, connecting property buyers, sellers and agents.',
      'Secure role-based access control keeps listings, leads and account data available only to the right people.',
    ],
    highlights: ['Separate experiences for buyers, sellers and agents', 'Secure role-based access control', 'Built end to end on the MERN stack'],
    tags: ['MERN', 'RBAC', 'REST APIs'],
    services: ['custom-web-application-development', 'crm-and-business-software'],
    accent: '#fbbf24',
  },
  {
    slug: 'mahir',
    title: 'Mahir',
    kind: 'Booking marketplace',
    role: 'Product design & full-stack development',
    period: 'Apr 2024 — Oct 2024',
    description: 'A freelancer-booking platform that connects people with home-service professionals — mechanics, plumbers, electricians and more.',
    overview: [
      'Mahir is a freelancer-booking platform that connects users with home-service professionals such as mechanics, plumbers and electricians.',
      'It was built end to end, from concept through deployment, between April and October 2024.',
    ],
    highlights: ['Discover and book local home-service professionals', 'Built end to end, from concept to deployment'],
    tags: ['Marketplace', 'Booking', 'Full stack'],
    services: ['custom-web-application-development', 'crm-and-business-software'],
    accent: '#60a5fa',
  },
];

export const achievements = [
  { value: 40, suffix: '%', label: 'Faster API responses', detail: 'through refactoring and caching strategies' },
  { value: 30, suffix: '%', label: 'Less manual support', detail: 'with AI-driven customer-support workflows' },
  { value: 100, suffix: 's', label: 'Concurrent users', detail: 'real-time with WebRTC, Twilio and Socket.io' },
  { value: 4, suffix: '+', label: 'Product domains', detail: 'CRM, POS, real estate and social media platforms' },
];

export const processSteps = [
  { title: 'Discover', text: 'We map your goals, users and constraints, then agree on scope, milestones and success metrics.' },
  { title: 'Architect', text: 'We design the system — data model, APIs, services and infrastructure — before writing production code.' },
  { title: 'Build in sprints', text: 'Work ships in short agile sprints with demos, so you see progress and can steer every week.' },
  { title: 'Launch & support', text: 'We deploy with CI/CD, monitor production and keep improving after go-live.' },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
