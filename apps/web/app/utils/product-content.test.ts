import type { CoreProduct } from '@cdfz/contracts'
import { describe, expect, it } from 'vitest'
import {
  findProductWithFallbacks,
  getFallbackProducts,
  mergeProductsWithFallbacks,
} from './product-content'

const product = (slug: string, sortOrder: number): CoreProduct => ({
  title: slug,
  slug,
  category: 'Test',
  summary: 'Test product',
  sortOrder,
})

describe('product content', () => {
  it('uses the localized defaults while CMS is empty', () => {
    expect(mergeProductsWithFallbacks([], 'zh-CN')).toEqual(getFallbackProducts('zh-CN'))
  })

  it('uses only CMS products once at least one is published', () => {
    const products = [product('cms-product', 1)]

    expect(findProductWithFallbacks(products, 'zh-CN', 'ai-mediation-assistant')).toBeNull()
    expect(findProductWithFallbacks(products, 'zh-CN', 'cms-product')).toEqual(products[0])
  })

  it('orders CMS products by sortOrder without mutating the response', () => {
    const products = [product('second', 2), product('first', 1)]

    expect(mergeProductsWithFallbacks(products, 'zh-CN').map(item => item.slug)).toEqual(['first', 'second'])
    expect(products.map(item => item.slug)).toEqual(['second', 'first'])
  })
})
