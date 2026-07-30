import type { HomeHeroSlide } from '@cdfz/contracts'
import { getLocaleContent } from './site-content'

export const getFallbackHomeHeroSlides = (locale: string): HomeHeroSlide[] => {
  const isEnglish = locale === 'en-US'
  const content = getLocaleContent(locale)

  return [
    {
      name: '智能系统与产业创新',
      tag: isEnglish ? 'Intelligent systems · industrial innovation' : '智能系统 · 产业创新',
      title: content.hero.title,
      description: content.hero.description,
      backgroundImage: { url: '/images/platforms/lingang-building.png', alternativeText: isEnglish ? 'Lingang innovation platform building' : '上海临港智能系统科创平台大楼' },
      backgroundPosition: 'center 48%',
      primaryLabel: content.hero.primaryAction,
      primaryLink: '/contact',
      secondaryLabel: content.hero.secondaryAction,
      secondaryLink: '/platforms',
      sortOrder: 1,
      enabled: true,
    },
    {
      name: '基层治理智能产品',
      tag: isEnglish ? 'Governance AI product portfolio' : '基层治理智能产品矩阵',
      title: isEnglish ? 'Put trusted intelligence into every real workflow.' : '让可信智能，进入每一个真实业务流程。',
      description: isEnglish
        ? 'From legal retrieval and document generation to visual safety and automated inspection, our products support private deployment and scenario integration.'
        : '从法律检索、文书生成到视觉安防与自动巡检，以可私有化部署、可场景集成的产品能力服务基层治理。',
      backgroundImage: { url: '/images/hero/uestc-campus.jpg', alternativeText: isEnglish ? 'Product and solution background' : '产品与解决方案轮播背景' },
      backgroundPosition: 'center center',
      primaryLabel: isEnglish ? 'Explore products' : '探索核心产品',
      primaryLink: '/products',
      secondaryLabel: isEnglish ? 'Talk to an expert' : '咨询解决方案',
      secondaryLink: '/contact',
      sortOrder: 2,
      enabled: true,
    },
    {
      name: '具身智能中试验证',
      tag: isEnglish ? 'Embodied robotics pilot validation' : '具身智能零部件中试验证',
      title: isEnglish ? 'Bridge the last mile from prototype to production.' : '跨越从研发样机到规模量产的最后一公里。',
      description: isEnglish
        ? 'A shared pilot platform for key robotics components, connecting prototype development, performance testing, process validation and scale-up support.'
        : '面向人形机器人关键零部件，打通研发样机、性能测试、工艺验证与量产支撑，建设开放共享的中试服务平台。',
      backgroundImage: { url: '/images/hero/finance-center.jpg', alternativeText: isEnglish ? 'Pilot platform background' : '创新平台轮播背景' },
      backgroundPosition: 'center center',
      primaryLabel: isEnglish ? 'View the platform' : '了解中试平台',
      primaryLink: '/platforms/embodied-robotics-pilot',
      secondaryLabel: isEnglish ? 'Cooperation inquiry' : '发起平台合作',
      secondaryLink: '/contact',
      sortOrder: 3,
      enabled: true,
    },
  ]
}

export const mergeHomeHeroSlidesWithFallbacks = (slides: HomeHeroSlide[] | null | undefined, locale: string) => {
  const items = slides?.length ? [...slides] : getFallbackHomeHeroSlides(locale)
  return items
    .filter(slide => slide.enabled !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
}
