import type {
  CaseArticle,
  RichTextBlock,
  StrapiMedia,
} from '@cdfz/contracts'

const absoluteMediaUrl = (strapiUrl: string, url: string) => {
  if (/^https?:\/\//i.test(url)) {
    return url
  }

  return `${strapiUrl}${url.startsWith('/') ? '' : '/'}${url}`
}

const normalizeExternalUrl = (url: string | null | undefined) => {
  const trimmed = url?.trim()
  return trimmed && /^https?:\/\//i.test(trimmed) ? trimmed : null
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

export const normalizeCaseArticle = (article: CaseArticle, strapiUrl: string): CaseArticle => ({
  id: article.id,
  documentId: article.documentId,
  title: article.title,
  slug: article.slug,
  summary: article.summary,
  category: article.category,
  contentMode: article.contentMode,
  externalUrl: normalizeExternalUrl(article.externalUrl),
  content: normalizeBlockMedia(article.content, strapiUrl),
  cover: normalizeMedia(article.cover, strapiUrl),
  sourceName: article.sourceName,
  publishedDate: article.publishedDate,
  featured: article.featured,
  publishedAt: article.publishedAt,
})
