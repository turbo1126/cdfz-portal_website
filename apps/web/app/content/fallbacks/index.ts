import type { LocaleCode } from '@cdfz/contracts'
import { enUSContent } from './en-US'
import type { SectionKey } from './types'
import { zhCNContent } from './zh-CN'

export const siteContent = {
  'zh-CN': zhCNContent,
  'en-US': enUSContent,
}

export const getLocaleContent = (locale: string) => {
  return siteContent[(locale === 'en-US' ? 'en-US' : 'zh-CN') as LocaleCode]
}

export const resolveSectionBySlug = (slug?: string | string[]) => {
  const raw = Array.isArray(slug) ? slug[0] : slug
  if (!raw) {
    return null
  }

  return raw in siteContent['zh-CN'].sections ? raw as SectionKey : null
}

export type {
  HomeCapabilityStep,
  HomeNewsFallbackItem,
  HomePageContent,
  HomePlatformItem,
  HomeProductItem,
  LocaleContent,
  SectionKey,
  SectionPageContent,
} from './types'
