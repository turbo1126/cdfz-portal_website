import type { InnovationPlatform, RichTextBlock } from '@cdfz/contracts'
import { getLocaleContent } from './site-content'

const fallbackBody = (paragraphs: string[]): RichTextBlock[] => paragraphs.map(text => ({
  type: 'paragraph',
  children: [{ type: 'text', text }],
}))

export const getFallbackPlatforms = (locale: string): InnovationPlatform[] => getLocaleContent(locale).home.platforms.map((platform, index) => ({
  title: platform.title,
  slug: platform.slug,
  shortName: platform.short,
  eyebrow: platform.short,
  summary: platform.description,
  tags: platform.tags,
  cover: {
    url: platform.cover,
    alternativeText: platform.title,
  },
  content: fallbackBody(platform.body),
  sortOrder: index + 1,
  featured: true,
}))

export const mergePlatformsWithFallbacks = (platforms: InnovationPlatform[] | null | undefined, locale: string) => {
  const items = platforms?.length ? [...platforms] : getFallbackPlatforms(locale)
  return items.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
}

export const getFallbackPlatform = (locale: string, slug: string) => getFallbackPlatforms(locale)
  .find(platform => platform.slug === slug) || null
