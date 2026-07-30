import { describe, expect, it } from 'vitest'

import { getFallbackHomeHeroSlides, mergeHomeHeroSlidesWithFallbacks } from '../app/utils/home-hero-content'
import { getLocaleContent, resolveSectionBySlug } from '../app/utils/site-content'

describe('site content helpers', () => {
  it('returns Chinese content by default for unknown locale', () => {
    expect(getLocaleContent('fr-FR').hero.primaryAction).toBe('预约演示')
  })

  it('resolves a known section slug', () => {
    expect(resolveSectionBySlug(['products'])).toBe('products')
  })

  it('returns null for an unknown section slug', () => {
    expect(resolveSectionBySlug(['unknown'])).toBeNull()
  })

  it('keeps the three default hero slides when CMS has no published content', () => {
    expect(mergeHomeHeroSlidesWithFallbacks([], 'zh-CN')).toHaveLength(3)
  })

  it('uses enabled CMS hero slides and sorts them by sortOrder', () => {
    const [fallback] = getFallbackHomeHeroSlides('zh-CN')
    const slides = mergeHomeHeroSlidesWithFallbacks([
      { ...fallback!, name: 'second', title: '第二张', sortOrder: 2 },
      { ...fallback!, name: 'disabled', title: '隐藏', sortOrder: 0, enabled: false },
      { ...fallback!, name: 'first', title: '第一张', sortOrder: 1 },
    ], 'zh-CN')

    expect(slides.map(slide => slide.title)).toEqual(['第一张', '第二张'])
  })
})
