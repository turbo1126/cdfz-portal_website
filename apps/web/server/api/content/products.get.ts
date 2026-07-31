import type {
  CoreProduct,
  LocaleCode,
} from '@cdfz/contracts'
import { normalizeCoreProduct, type RawCoreProduct } from '../../utils/products'
import { fetchLocalizedCollection } from '../../utils/strapi'

export default defineEventHandler(async (event): Promise<CoreProduct[]> => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const locale: LocaleCode = query.locale === 'en-US' ? 'en-US' : 'zh-CN'
  const strapiUrl = config.internalStrapiUrl.replace(/\/$/, '')
  const publicStrapiUrl = config.public.strapiUrl.replace(/\/$/, '')

  try {
    const products = await fetchLocalizedCollection<RawCoreProduct>(
      strapiUrl,
      '/api/core-products',
      locale,
      {
        populate: '*',
        'sort[0]': 'sortOrder:asc',
        'sort[1]': 'publishedAt:asc',
        'pagination[pageSize]': 100,
      },
    )

    return products.map(product => normalizeCoreProduct(product, publicStrapiUrl))
  }
  catch (error) {
    console.warn('Unable to load core products from Strapi.', error)
    return []
  }
})
