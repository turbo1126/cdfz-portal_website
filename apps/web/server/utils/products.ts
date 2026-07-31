import type {
  CoreProduct,
  RichTextBlock,
  StrapiMedia,
} from '@cdfz/contracts'

export type RawCoreProduct = Omit<CoreProduct, 'tags'> & {
  tags?: Array<{ text?: string | null }> | string[] | null
}

const absoluteMediaUrl = (strapiUrl: string, url: string) => {
  if (/^https?:\/\//i.test(url)) {
    return url
  }

  return `${strapiUrl}${url.startsWith('/') ? '' : '/'}${url}`
}

const normalizeMedia = (media: StrapiMedia | null | undefined, strapiUrl: string) => {
  if (!media?.url) {
    return null
  }

  return {
    ...media,
    url: absoluteMediaUrl(strapiUrl, media.url),
  }
}

const normalizeBlockMedia = (blocks: RichTextBlock[] | null | undefined, strapiUrl: string) => {
  if (!blocks) {
    return blocks
  }

  const normalizeBlock = (block: RichTextBlock): RichTextBlock => ({
    ...block,
    image: normalizeMedia(block.image, strapiUrl) || undefined,
    children: block.children?.map(child => child.type === 'text' || child.type === 'link'
      ? child
      : normalizeBlock(child)),
  })

  return blocks.map(normalizeBlock)
}

const normalizeTags = (tags: RawCoreProduct['tags']) => (tags || [])
  .map(tag => typeof tag === 'string' ? tag : tag.text?.trim())
  .filter((tag): tag is string => Boolean(tag))

export const normalizeCoreProduct = (product: RawCoreProduct, strapiUrl: string): CoreProduct => ({
  id: product.id,
  documentId: product.documentId,
  title: product.title,
  slug: product.slug,
  category: product.category,
  summary: product.summary,
  tags: normalizeTags(product.tags),
  icon: normalizeMedia(product.icon, strapiUrl),
  cover: normalizeMedia(product.cover, strapiUrl),
  content: normalizeBlockMedia(product.content, strapiUrl),
  sortOrder: product.sortOrder,
  featured: product.featured,
  publishedAt: product.publishedAt,
})
