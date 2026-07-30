import type { HomeHeroSlide, StrapiMedia } from '@cdfz/contracts'

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

export const normalizeHomeHeroSlide = (slide: HomeHeroSlide, strapiUrl: string): HomeHeroSlide => ({
  id: slide.id,
  documentId: slide.documentId,
  name: slide.name,
  tag: slide.tag,
  title: slide.title,
  description: slide.description,
  backgroundImage: normalizeMedia(slide.backgroundImage, strapiUrl),
  backgroundPosition: slide.backgroundPosition,
  primaryLabel: slide.primaryLabel,
  primaryLink: slide.primaryLink,
  secondaryLabel: slide.secondaryLabel,
  secondaryLink: slide.secondaryLink,
  sortOrder: slide.sortOrder,
  enabled: slide.enabled,
  publishedAt: slide.publishedAt,
})
