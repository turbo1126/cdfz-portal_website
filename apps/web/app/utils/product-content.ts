import type { CoreProduct, RichTextBlock } from '@cdfz/contracts'
import { getLocaleContent } from './site-content'

const fallbackBody = (paragraphs: string[]): RichTextBlock[] => paragraphs.map(text => ({
  type: 'paragraph',
  children: [{ type: 'text', text }],
}))

export const getFallbackProducts = (locale: string): CoreProduct[] => getLocaleContent(locale).home.products.map((product, index) => ({
  title: product.title,
  slug: product.slug,
  category: product.category,
  summary: product.description,
  tags: product.tags,
  content: fallbackBody(product.body),
  sortOrder: index + 1,
  featured: true,
}))

export const mergeProductsWithFallbacks = (products: CoreProduct[] | null | undefined, locale: string) => {
  const items = products?.length ? [...products] : getFallbackProducts(locale)
  return items.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
}

export const findProductWithFallbacks = (
  products: CoreProduct[] | null | undefined,
  locale: string,
  slug: string,
) => mergeProductsWithFallbacks(products, locale).find(product => product.slug === slug) || null
