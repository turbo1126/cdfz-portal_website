import type { FeatureCard, LocaleCode, NavigationItem, PlatformCard, SiteSection, StatItem } from '@cdfz/contracts'

type HeroContent = SiteSection & {
  badge: string
  primaryAction: string
  secondaryAction: string
}

type SectionPageContent = SiteSection & {
  highlights: string[]
  featuredPoints: string[]
}

type LocaleContent = {
  navigation: NavigationItem[]
  hero: HeroContent
  stats: StatItem[]
  products: FeatureCard[]
  platforms: PlatformCard[]
  sections: Record<string, SectionPageContent>
}

export const siteContent: Record<LocaleCode, LocaleContent> = {
  'zh-CN': {
    navigation: [
      { label: '首页', path: '/' },
      { label: '关于我们', path: '/about' },
      { label: '产品与解决方案', path: '/products' },
      { label: '创新平台', path: '/platforms' },
      { label: '产业服务', path: '/services' },
      { label: '案例与动态', path: '/cases' },
      { label: '合作联系', path: '/contact' },
    ],
    hero: {
      badge: '上海临港智能系统科创平台 / 具身智能零部件中试平台',
      eyebrow: '科技-产业-金融-人才高水平循环',
      title: '让前沿智能，真正抵达产业现场。',
      description:
        '聚焦智能系统与具身智能，以科技成果转化为纽带，贯通研发、中试、孵化与产业化，推动创新能力走向真实应用。',
      primaryAction: '预约演示',
      secondaryAction: '查看创新平台',
    },
    stats: [
      { label: '成立时间', value: '2021', description: '依托多方资源设立的新型研发机构' },
      { label: '核心方向', value: '4', description: '大模型、具身智能、成果转化、生态培育' },
      { label: '平台能力', value: '72+', description: '中试验证与性能可靠性测试项' },
    ],
    products: [
      { title: 'AI 调解通', summary: '聚焦基层治理调解场景，覆盖法律检索、方案生成与文书输出。', tags: ['基层治理', '法律检索', '文书自动化'] },
      { title: '视安盾', summary: '面向安防巡查与视觉识别，强化异常发现与联动处置效率。', tags: ['视觉智能', '场景识别', '联动告警'] },
      { title: '巡检小旋风', summary: '用于园区与设施巡检，覆盖路线执行、风险识别与结果归档。', tags: ['巡检', '园区', '自动化'] },
    ],
    platforms: [
      {
        title: '上海临港智能系统科创平台',
        summary: '聚焦智能系统创新、成果转化与生态协同，承接技术孵化与产业合作。',
        highlights: ['创新平台', '生态协同', '成果转化'],
      },
      {
        title: '人形机器人具身智能零部件中试平台',
        summary: '围绕研发样机、工程化验证与量产导入，提供关键零部件中试验证能力。',
        highlights: ['中试验证', '可靠性测试', '量产支撑'],
      },
    ],
    sections: {
      about: {
        eyebrow: '关于我们',
        title: '依托高校、国资与产业资源，面向前沿智能领域协同创新。',
        description: '公司坚持四轮驱动发展战略，聚焦人工智能、大模型与具身智能等赛道，致力于科技成果转化与产业生态培育。',
        highlights: ['新型研发机构定位', '多方资源协同', '科技成果转化'],
        featuredPoints: ['公司成立于 2021 年 12 月', '承载建设上海临港智能系统科创平台', '形成科技、产业、金融、人才循环支撑'],
      },
      products: {
        eyebrow: '产品与解决方案',
        title: '以政和智能体与重点产品矩阵支撑真实业务场景。',
        description: '首版围绕 AI 调解通、安防巡查、园区巡检等方向构建产品表达，强调痛点、能力、部署与案例价值。',
        highlights: ['产品矩阵', '场景方案', '本地化部署'],
        featuredPoints: ['支持 PC 端、移动端与接口调用', '突出业务场景中的流程提效', '后续接入 CMS 做双语内容维护'],
      },
      platforms: {
        eyebrow: '创新平台',
        title: '围绕“一基地三中心”与中试能力，搭建产业共性服务门户。',
        description: '聚焦平台定位、测试验证、中试保险、产业生态和人才培养，形成技术到产业的展示闭环。',
        highlights: ['测试验证', '中试保险', '人才培养'],
        featuredPoints: ['覆盖图纸、原型、小样到量产链路', '支持核心零部件研发与验证', '强化国产替代与行业标准引领'],
      },
      services: {
        eyebrow: '产业服务',
        title: '将研发、验证、孵化和产教融合能力整合为连续服务。',
        description: '通过研发孵化、测试验证、场景开发、科创服务和人才培养，为合作伙伴提供可持续的技术与产业支持。',
        highlights: ['研发孵化', '测试验证', '产教融合'],
        featuredPoints: ['提供合作流程说明', '适配多类合作伙伴角色', '与平台能力联动展示'],
      },
      cases: {
        eyebrow: '案例与动态',
        title: '通过案例、活动和新闻建立可信的品牌叙事。',
        description: '首版以列表和详情结构承载客户案例、实践活动和新闻资讯，后续由 CMS 支持分类、置顶和中英文独立发布。',
        highlights: ['案例展示', '动态发布', 'SEO 友好'],
        featuredPoints: ['适配分类与推荐阅读', '支持发布时间与置顶机制', '避免未翻译内容在英文站混排'],
      },
      contact: {
        eyebrow: '合作联系',
        title: '以清晰的合作入口和咨询表单承接商务线索。',
        description: '表单固定收集姓名、机构、电话、邮箱、合作意向和留言信息，并保留隐私同意和来源字段。',
        highlights: ['合作咨询', '线索采集', '隐私同意'],
        featuredPoints: ['电话或邮箱至少填写一项', '后续通过 BFF 接入 Strapi', '支持中英文来源标记'],
      },
      privacy: {
        eyebrow: '隐私政策',
        title: '我们重视并保护每一位访问者的信息安全。',
        description: '本页面用于说明咨询信息的收集范围、使用目的、保存方式与访问者权利，正式条款将在网站上线前经审核后发布。',
        highlights: ['最小必要原则', '安全存储', '用户权利'],
        featuredPoints: ['仅收集完成合作咨询所需的信息', '未经授权不会向无关第三方披露', '可联系我们查询、更正或删除相关信息'],
      },
    },
  },
  'en-US': {
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
      description:
        'Connect R&D, pilot validation, incubation and industrialization to move intelligent systems and embodied robotics from innovation to real-world impact.',
      primaryAction: 'Book Demo',
      secondaryAction: 'Explore Platforms',
    },
    stats: [
      { label: 'Founded', value: '2021', description: 'A new R&D institution built with multi-party support' },
      { label: 'Focus Areas', value: '4', description: 'LLM, embodied intelligence, transformation and ecosystem' },
      { label: 'Pilot Tests', value: '72+', description: 'Performance and reliability verification items' },
    ],
    products: [
      { title: 'AI Mediation Assistant', summary: 'Built for grassroots governance with legal retrieval, plan generation and document drafting.', tags: ['Governance', 'Legal Search', 'Automation'] },
      { title: 'Vision Shield', summary: 'Targets visual inspection and safety awareness with faster issue detection and response.', tags: ['Vision AI', 'Recognition', 'Alerts'] },
      { title: 'Inspection Cyclone', summary: 'Supports facility and campus patrol workflows from route execution to result archiving.', tags: ['Inspection', 'Campus', 'Automation'] },
    ],
    platforms: [
      {
        title: 'Shanghai Lingang Intelligent Systems Innovation Platform',
        summary: 'A platform for intelligent systems innovation, transformation and industrial ecosystem collaboration.',
        highlights: ['Innovation', 'Ecosystem', 'Transformation'],
      },
      {
        title: 'Embodied Robotics Components Pilot Platform',
        summary: 'Provides pilot validation for key embodied robotics components from prototyping to scale-up.',
        highlights: ['Pilot Validation', 'Reliability Tests', 'Scale-up'],
      },
    ],
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
        featuredPoints: ['Supports desktop, mobile and API-based access', 'Focuses on measurable workflow efficiency', 'Prepared for CMS-driven bilingual maintenance'],
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
        description: 'The first release uses list-detail patterns ready for categorization, pinning and language-specific publishing in CMS.',
        highlights: ['Case Stories', 'News Publishing', 'SEO Ready'],
        featuredPoints: ['Supports categories and related reading', 'Includes publish time and pinning', 'Keeps untranslated entries out of English pages'],
      },
      contact: {
        eyebrow: 'Contact',
        title: 'A clear cooperation entry with an inquiry form built for lead capture.',
        description: 'The form collects name, organization, phone, email, intention and message with privacy consent and source tracking.',
        highlights: ['Lead Capture', 'Inquiry Form', 'Privacy'],
        featuredPoints: ['Phone or email is required', 'BFF integration with Strapi comes next', 'Supports language-aware source tracking'],
      },
      privacy: {
        eyebrow: 'Privacy Policy',
        title: 'We value and protect every visitor’s information.',
        description: 'This page explains the scope, purpose and retention of inquiry information. Final legal terms will be reviewed and published before launch.',
        highlights: ['Data minimization', 'Secure storage', 'User rights'],
        featuredPoints: ['Only information necessary for inquiries is collected', 'No unauthorized disclosure to unrelated third parties', 'You may request access, correction or deletion'],
      },
    },
  },
}

export const getLocaleContent = (locale: string) => {
  return siteContent[(locale === 'en-US' ? 'en-US' : 'zh-CN') as LocaleCode]
}

export const resolveSectionBySlug = (slug?: string | string[]) => {
  const raw = Array.isArray(slug) ? slug[0] : slug
  if (!raw) {
    return null
  }

  return raw in siteContent['zh-CN'].sections ? raw : null
}
