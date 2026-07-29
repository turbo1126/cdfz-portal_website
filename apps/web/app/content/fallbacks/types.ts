import type { NavigationItem, SiteSection } from '@cdfz/contracts'

export type HeroContent = SiteSection & {
  badge: string
  primaryAction: string
  secondaryAction: string
}

export type SectionPageContent = SiteSection & {
  highlights: string[]
  featuredPoints: string[]
}

export type SectionKey = 'about' | 'products' | 'platforms' | 'services' | 'cases' | 'contact' | 'privacy'

export type HomePlatformItem = {
  no: string
  title: string
  short: string
  description: string
  tags: string[]
}

export type HomeProductItem = {
  no: string
  title: string
  category: string
  description: string
  tags: string[]
}

export type HomeCapabilityStep = {
  no: string
  title: string
  text: string
}

export type HomeNewsFallbackItem = {
  type: string
  date: string
  title: string
}

export type HomePageContent = {
  platforms: HomePlatformItem[]
  products: HomeProductItem[]
  capabilitySteps: HomeCapabilityStep[]
  news: HomeNewsFallbackItem[]
}

export type LocaleContent = {
  navigation: NavigationItem[]
  hero: HeroContent
  home: HomePageContent
  sections: Record<SectionKey, SectionPageContent>
}
