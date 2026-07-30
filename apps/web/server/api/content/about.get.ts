import type {
  AboutPage,
  LocaleCode,
} from '@cdfz/contracts'
import { fetchLocalizedSingleType } from '../../utils/strapi'

export default defineEventHandler(async (event): Promise<AboutPage> => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const locale: LocaleCode = query.locale === 'en-US' ? 'en-US' : 'zh-CN'
  const strapiUrl = config.internalStrapiUrl.replace(/\/$/, '')

  try {
    const aboutPage = await fetchLocalizedSingleType<AboutPage>(
      strapiUrl,
      '/api/about-page',
      locale,
    )

    const needsChineseFallback = locale === 'en-US' && (!aboutPage
      || !aboutPage.eyebrow?.trim()
      || !aboutPage.title?.trim()
      || !aboutPage.description?.trim()
      || !aboutPage.highlights?.length
      || !aboutPage.featuredPoints?.length)

    const chineseFallbackPage = needsChineseFallback
      ? await fetchLocalizedSingleType<AboutPage>(
          strapiUrl,
          '/api/about-page',
          'zh-CN',
        )
      : null

    if (!aboutPage && !chineseFallbackPage) {
      return {}
    }

    return {
      eyebrow: aboutPage?.eyebrow?.trim() || chineseFallbackPage?.eyebrow,
      title: aboutPage?.title?.trim() || chineseFallbackPage?.title,
      description: aboutPage?.description?.trim() || chineseFallbackPage?.description,
      highlights: aboutPage?.highlights?.length
        ? aboutPage.highlights
        : chineseFallbackPage?.highlights,
      featuredPoints: aboutPage?.featuredPoints?.length
        ? aboutPage.featuredPoints
        : chineseFallbackPage?.featuredPoints,
    }
  }
  catch (error) {
    console.warn('Unable to load About page content from Strapi.', error)
    return {}
  }
})
