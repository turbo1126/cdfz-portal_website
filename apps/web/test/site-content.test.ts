import { describe, expect, it } from 'vitest'

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
})
