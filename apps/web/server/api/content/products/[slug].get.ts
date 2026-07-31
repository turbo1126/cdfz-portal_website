import type {
  CoreProduct,
  LocaleCode,
} from '@cdfz/contracts'
import { normalizeCoreProduct, type RawCoreProduct } from '../../../utils/products'
import { fetchLocalizedCollection } from '../../../utils/strapi'

export default defineEventHandler(async (event): Promise<CoreProduct> => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const slug = getRouterParam(event, 'slug')
  const locale: LocaleCode = query.locale === 'en-US' ? 'en-US' : 'zh-CN'
  const strapiUrl = config.internalStrapiUrl.replace(/\/$/, '')
  const publicStrapiUrl = config.public.strapiUrl.replace(/\/$/, '')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Product slug is required.' })
  }

  const products = await fetchLocalizedCollection<RawCoreProduct>(
    strapiUrl,
    '/api/core-products',
    locale,
    {
      'filters[slug][$eq]': slug,
      populate: '*',
      'pagination[pageSize]': 1,
    },
  )

  const product = products[0]
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Core product not found.' })
  }

  return normalizeCoreProduct(product, publicStrapiUrl)
})
