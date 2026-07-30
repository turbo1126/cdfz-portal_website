import type {
  HomeHeroSlide,
  LocaleCode,
} from '@cdfz/contracts'
import { normalizeHomeHeroSlide } from '../../utils/home-hero-slides'
import { fetchLocalizedCollection } from '../../utils/strapi'

export default defineEventHandler(async (event): Promise<HomeHeroSlide[]> => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const locale: LocaleCode = query.locale === 'en-US' ? 'en-US' : 'zh-CN'
  const strapiUrl = config.internalStrapiUrl.replace(/\/$/, '')
  const publicStrapiUrl = config.public.strapiUrl.replace(/\/$/, '')

  try {
    const slides = await fetchLocalizedCollection<HomeHeroSlide>(
      strapiUrl,
      '/api/home-hero-slides',
      locale,
      {
        'filters[enabled][$eq]': 'true',
        populate: 'backgroundImage',
        'sort[0]': 'sortOrder:asc',
        'sort[1]': 'publishedAt:asc',
        'pagination[pageSize]': 20,
      },
    )

    return slides.map(slide => normalizeHomeHeroSlide(slide, publicStrapiUrl))
  }
  catch (error) {
    console.warn('Unable to load home hero slides from Strapi.', error)
    return []
  }
})
