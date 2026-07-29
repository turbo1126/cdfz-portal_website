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

    if (!aboutPage) {
      return {}
    }

    return {
      eyebrow: aboutPage.eyebrow,
      title: aboutPage.title,
      description: aboutPage.description,
      highlights: aboutPage.highlights,
      featuredPoints: aboutPage.featuredPoints,
    }
  }
  catch (error) {
    console.warn('Unable to load About page content from Strapi.', error)
    return {}
  }
})
