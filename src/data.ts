// All content is sourced from Muhammad_Umar_Liaqat_Resume.pdf — edit here to update the site.

export const profile = {
  name: 'Muhammad Umar Liaqat',
  firstLine: 'Muhammad Umar',
  lastLine: 'Liaqat',
  initials: 'UL',
  title: 'Full Stack Developer',
  tagline: 'MERN Stack & AI Automation Specialist',
  roles: ['Full Stack Developer', 'MERN Stack Engineer', 'AI Automation Specialist', 'Web3 Technical Lead'],
  intro:
    'I design, build and scale web products — from MERN and TypeScript applications to microservices, Web3 platforms and AI-driven automation.',
  location: 'Lahore, Pakistan',
  email: 'mu24081999@gmail.com',
  phone: '+92 317 4660027',
  whatsapp: 'https://wa.me/923174660027',
  linkedin: 'https://www.linkedin.com/in/muhammad-umar-liaqat-00b578181',
  linkedinLabel: 'muhammad-umar-liaqat',
  github: 'https://github.com/mu24081999',
  githubLabel: 'mu24081999',
  stackoverflowLabel: 'mu24081999',
  resume: '/Muhammad_Umar_Liaqat_Resume.pdf',
};

export const summary =
  'Results-driven Full Stack Developer with 5+ years of experience designing, building, and scaling web applications across the MERN stack, TypeScript, and AI-driven automation. I lead cross-functional engineering teams, architect microservices, and ship high-performance products for Web3, fintech, and enterprise clients.';

export const summaryExtra =
  'Passionate about clean architecture, DevOps automation, and delivering measurable business impact.';

export const stats = [
  { value: 5, suffix: '+', label: 'Years building' },
  { value: 5, suffix: '', label: 'Companies' },
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

export type Project = {
  title: string;
  kind: string;
  description: string;
  highlights: string[];
  tags: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    title: 'Smart Call Center',
    kind: 'Personal project · AI · Microservices',
    description:
      'A scalable AI-driven call center built on a microservices architecture, supporting hundreds of concurrent users.',
    highlights: ['Dedicated auth, AI call-handling, analytics and gateway services', 'Real-time voice over Twilio and WebRTC'],
    tags: ['Node.js', 'Express', 'TypeScript', 'Twilio', 'WebRTC', 'Microservices'],
    accent: '#6ee7f9',
  },
  {
    title: 'Astra Web3 Suite',
    kind: 'Astra Protocol · Technical lead',
    description:
      'A family of Web3 products: a KYC platform, on-chain data services, Fireblocks wallet integration and the custom Astra wallet.',
    highlights: ['Architecture and delivery across concurrent product lines', 'Custody-grade wallet integration with Fireblocks'],
    tags: ['Web3', 'Fireblocks', 'KYC', 'Wallets', 'On-chain data'],
    accent: '#a78bfa',
  },
  {
    title: 'AI-Powered CRM',
    kind: 'JustCall · Full stack',
    description:
      'A full-featured CRM for voice, SMS and email marketing, with AI automation, real-time chat and granular permissions.',
    highlights: ['Role-based authentication and permissions management', 'AI workflows that cut manual support intervention by 30%'],
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io', 'AI automation'],
    accent: '#f0abfc',
  },
  {
    title: 'Digital Marketing Kit',
    kind: 'Personal project · Marketing automation',
    description:
      'An AI-driven marketing platform for email, SMS and voice campaigns with analytics and lead management.',
    highlights: ['Handles hundreds of concurrent campaigns', 'Campaign analytics and lead pipeline in one place'],
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'AI'],
    accent: '#5eead4',
  },
  {
    title: 'Real Estate Marketplace',
    kind: 'JustCall · Full stack',
    description:
      'A Zameen.com-style property marketplace connecting buyers, sellers and agents, with secure role-based access control.',
    highlights: ['Separate experiences for buyers, sellers and agents', 'Secure role-based access across the platform'],
    tags: ['MERN', 'RBAC', 'REST APIs'],
    accent: '#fbbf24',
  },
  {
    title: 'Mahir',
    kind: 'Personal project · Apr – Oct 2024',
    description:
      'A freelancer-booking platform that connects people with home-service professionals — mechanics, plumbers, electricians and more.',
    highlights: ['Discover and book verified local professionals', 'Built end to end, from concept to deployment'],
    tags: ['Marketplace', 'Booking', 'Full stack'],
    accent: '#60a5fa',
  },
];

export const achievements = [
  { value: 40, suffix: '%', label: 'Faster API responses', detail: 'through refactoring and caching strategies' },
  { value: 30, suffix: '%', label: 'Less manual support', detail: 'with AI-driven customer-support workflows' },
  { value: 100, suffix: 's', label: 'Concurrent users', detail: 'real-time with WebRTC, Twilio and Socket.io' },
  { value: 4, suffix: '+', label: 'Product domains', detail: 'CRM, POS, real estate and social media platforms' },
];

export const scenes = [
  { id: 'home', label: 'Opening' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Arsenal' },
  { id: 'experience', label: 'Journey' },
  { id: 'projects', label: 'Work' },
  { id: 'impact', label: 'Impact' },
  { id: 'contact', label: 'Contact' },
];
