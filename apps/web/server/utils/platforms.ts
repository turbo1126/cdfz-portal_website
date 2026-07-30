import type {
  InnovationPlatform,
  RichTextBlock,
  StrapiMedia,
} from '@cdfz/contracts'

export type RawInnovationPlatform = Omit<InnovationPlatform, 'tags'> & {
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

const normalizeTags = (tags: RawInnovationPlatform['tags']) => (tags || [])
  .map(tag => typeof tag === 'string' ? tag : tag.text?.trim())
  .filter((tag): tag is string => Boolean(tag))

export const normalizeInnovationPlatform = (platform: RawInnovationPlatform, strapiUrl: string): InnovationPlatform => ({
  id: platform.id,
  documentId: platform.documentId,
  title: platform.title,
  slug: platform.slug,
  shortName: platform.shortName,
  eyebrow: platform.eyebrow,
  summary: platform.summary,
  tags: normalizeTags(platform.tags),
  cover: normalizeMedia(platform.cover, strapiUrl),
  content: normalizeBlockMedia(platform.content, strapiUrl),
  sortOrder: platform.sortOrder,
  featured: platform.featured,
  publishedAt: platform.publishedAt,
})
