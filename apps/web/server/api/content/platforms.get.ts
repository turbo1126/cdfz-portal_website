import type {
  InnovationPlatform,
  LocaleCode,
} from '@cdfz/contracts'
import { normalizeInnovationPlatform, type RawInnovationPlatform } from '../../utils/platforms'
import { fetchLocalizedCollection } from '../../utils/strapi'

export default defineEventHandler(async (event): Promise<InnovationPlatform[]> => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const locale: LocaleCode = query.locale === 'en-US' ? 'en-US' : 'zh-CN'
  const strapiUrl = config.internalStrapiUrl.replace(/\/$/, '')
  const publicStrapiUrl = config.public.strapiUrl.replace(/\/$/, '')

  try {
    const platforms = await fetchLocalizedCollection<RawInnovationPlatform>(
      strapiUrl,
      '/api/innovation-platforms',
      locale,
      {
        populate: '*',
        'sort[0]': 'sortOrder:asc',
        'sort[1]': 'publishedAt:asc',
        'pagination[pageSize]': 100,
      },
    )

    return platforms.map(platform => normalizeInnovationPlatform(platform, publicStrapiUrl))
  }
  catch (error) {
    console.warn('Unable to load innovation platforms from Strapi.', error)
    return []
  }
})
