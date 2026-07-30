import type {
  InnovationPlatform,
  LocaleCode,
} from '@cdfz/contracts'
import { normalizeInnovationPlatform, type RawInnovationPlatform } from '../../../utils/platforms'
import { fetchLocalizedCollection } from '../../../utils/strapi'

export default defineEventHandler(async (event): Promise<InnovationPlatform> => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const slug = getRouterParam(event, 'slug')
  const locale: LocaleCode = query.locale === 'en-US' ? 'en-US' : 'zh-CN'
  const strapiUrl = config.internalStrapiUrl.replace(/\/$/, '')
  const publicStrapiUrl = config.public.strapiUrl.replace(/\/$/, '')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Platform slug is required.' })
  }

  const platforms = await fetchLocalizedCollection<RawInnovationPlatform>(
    strapiUrl,
    '/api/innovation-platforms',
    locale,
    {
      'filters[slug][$eq]': slug,
      populate: '*',
      'pagination[pageSize]': 1,
    },
  )

  const platform = platforms[0]
  if (!platform) {
    throw createError({ statusCode: 404, statusMessage: 'Innovation platform not found.' })
  }

  return normalizeInnovationPlatform(platform, publicStrapiUrl)
})
