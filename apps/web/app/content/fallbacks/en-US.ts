import type { LocaleContent } from './types'

export const enUSContent = {
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Platforms', path: '/platforms' },
    { label: 'Services', path: '/services' },
    { label: 'Cases & News', path: '/cases' },
    { label: 'Contact', path: '/contact' },
  ],
  hero: {
    badge: 'Lingang Intelligent Systems Platform / Embodied Robotics Pilot Platform',
    eyebrow: 'High-level circulation across technology, industry, capital and talent',
    title: 'Bring frontier intelligence into the real world.',
    description: 'Connect R&D, pilot validation, incubation and industrialization to move intelligent systems and embodied robotics from innovation to real-world impact.',
    primaryAction: 'Book Demo',
    secondaryAction: 'Explore Platforms',
  },
  home: {
    platforms: [
      {
        no: '01',
        title: 'Shanghai Lingang Intelligent Systems Innovation Platform',
        short: 'Intelligent systems innovation',
        description: 'Connect technology R&D, scenario validation, achievement transformation and ecosystem collaboration to accelerate industrial application.',
        tags: ['Technology R&D', 'Scenario validation', 'Transformation'],
      },
      {
        no: '02',
        title: 'Embodied Robotics Components Pilot Platform',
        short: 'Robotics pilot validation',
        description: 'Provide shared engineering verification and scale-up support for core components such as joint modules, motors, reducers and actuators.',
        tags: ['Pilot testing', 'Reliability', 'Scale-up'],
      },
    ],
    products: [
      { no: '01', title: 'AI Mediation Assistant', category: 'Grassroots governance', description: 'Legal retrieval, dispute analysis, solution assistance and document generation in one secure workflow.', tags: ['Private deployment', 'Legal search'] },
      { no: '02', title: 'Vision Shield', category: 'Visual intelligence', description: 'AI-powered risk identification and multi-level alerts for safety management and inspection scenarios.', tags: ['Visual recognition', 'Smart alerts'] },
      { no: '03', title: 'Inspection Cyclone', category: 'Automated inspection', description: 'Connect inspection routes, issue detection, work-order collaboration and result archiving.', tags: ['Park inspection', 'Closed-loop workflow'] },
      { no: '04', title: 'Housing Manager', category: 'Urban governance', description: 'Build unified housing data, intelligent analysis and collaborative handling for fine-grained governance.', tags: ['Data governance', 'Business collaboration'] },
    ],
    capabilitySteps: [
      { no: '01', title: 'R&D', text: 'Core technology and component incubation' },
      { no: '02', title: 'Pilot', text: 'Performance, reliability and process validation' },
      { no: '03', title: 'Incubation', text: 'Scenario development and product validation' },
      { no: '04', title: 'Industrialization', text: 'Scale-up, delivery and ecosystem support' },
    ],
    news: [
      { type: 'Platform', date: '2026.07', title: 'Building an open pilot validation capability for embodied robotics components' },
      { type: 'Product', date: '2026.06', title: 'AI Mediation Assistant accelerates the digital transformation of grassroots services' },
      { type: 'Ecosystem', date: '2026.05', title: 'Industry-university-research collaboration connects innovation with real scenarios' },
    ],
  },
  sections: {
    about: {
      eyebrow: 'About',
      title: 'Backed by academia, state capital and industry resources for frontier innovation.',
      description: 'The company focuses on AI, LLMs and embodied intelligence while driving technology transformation and ecosystem cultivation.',
      highlights: ['New R&D Institution', 'Resource Synergy', 'Technology Transfer'],
      featuredPoints: ['Founded in December 2021', 'Supports the Lingang intelligent systems platform', 'Builds a loop across technology, industry, capital and talent'],
    },
    products: {
      eyebrow: 'Products',
      title: 'A portfolio of intelligent products and solution narratives for real business scenarios.',
      description: 'The first release highlights product positioning, pain points, capabilities, deployment choices and use-case value.',
      highlights: ['Product Portfolio', 'Scenario Solutions', 'Local Deployment'],
      featuredPoints: ['Supports desktop, mobile and API-based access', 'Focuses on measurable workflow efficiency', 'Fits private deployment and system integration'],
    },
    platforms: {
      eyebrow: 'Platforms',
      title: 'Platform capabilities built around testing, pilot validation and industrial service.',
      description: 'The platform section will cover positioning, verification capability, industrial insurance, ecosystem building and talent development.',
      highlights: ['Verification', 'Pilot Insurance', 'Talent'],
      featuredPoints: ['Supports the chain from drawings to mass production', 'Enables component R&D and validation', 'Strengthens domestic substitution and standards'],
    },
    services: {
      eyebrow: 'Services',
      title: 'An integrated service chain from R&D and verification to incubation and education.',
      description: 'The service area introduces how the company supports partners with incubation, testing, scenario development and talent training.',
      highlights: ['Incubation', 'Testing', 'Education'],
      featuredPoints: ['Explains collaboration pathways', 'Fits multiple partner types', 'Connects closely with platform capabilities'],
    },
    cases: {
      eyebrow: 'Cases & News',
      title: 'Structured stories that turn projects, events and updates into credibility.',
      description: 'Explore product applications, platform progress and industrial ecosystem collaboration through cases, events and company news.',
      highlights: ['Case Stories', 'News Publishing', 'SEO Ready'],
      featuredPoints: ['Supports categories and related reading', 'Includes publish time and pinning', 'Keeps untranslated entries out of English pages'],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'A clear cooperation entry with an inquiry form built for lead capture.',
      description: 'The form collects name, organization, phone, email, intention and message with privacy consent and source tracking.',
      highlights: ['Lead Capture', 'Inquiry Form', 'Privacy'],
      featuredPoints: ['Phone or email is required', 'Inquiries are followed up by the business team', 'Supports product, platform and service inquiries'],
    },
    privacy: {
      eyebrow: 'Privacy Policy',
      title: 'We value and protect every visitor’s information.',
      description: 'This page explains the scope, purpose and retention of inquiry information. Final legal terms will be reviewed and published before launch.',
      highlights: ['Data minimization', 'Secure storage', 'User rights'],
      featuredPoints: ['Only information necessary for inquiries is collected', 'No unauthorized disclosure to unrelated third parties', 'You may request access, correction or deletion'],
    },
  },
} satisfies LocaleContent
