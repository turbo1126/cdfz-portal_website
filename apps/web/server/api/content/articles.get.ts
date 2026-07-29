import type {
  CaseArticle,
  LocaleCode,
} from '@cdfz/contracts'
import { normalizeCaseArticle } from '../../utils/case-articles'
import { fetchLocalizedCollection } from '../../utils/strapi'

export default defineEventHandler(async (event): Promise<CaseArticle[]> => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const locale: LocaleCode = query.locale === 'en-US' ? 'en-US' : 'zh-CN'
  const strapiUrl = config.internalStrapiUrl.replace(/\/$/, '')
  const publicStrapiUrl = config.public.strapiUrl.replace(/\/$/, '')
  const requestedLimit = Number(query.limit)
  const pageSize = Number.isInteger(requestedLimit)
    ? Math.min(100, Math.max(1, requestedLimit))
    : 100
  const latestFirst = query.order === 'latest'

  const sortQuery = latestFirst
    ? {
        'sort[0]': 'publishedDate:desc',
        'sort[1]': 'publishedAt:desc',
      }
    : {
        'sort[0]': 'featured:desc',
        'sort[1]': 'publishedDate:desc',
        'sort[2]': 'publishedAt:desc',
      }

  try {
    const articles = await fetchLocalizedCollection<CaseArticle>(
      strapiUrl,
      '/api/case-articles',
      locale,
      {
        populate: 'cover',
        'pagination[pageSize]': pageSize,
        ...sortQuery,
      },
    )

    return articles.map(article => normalizeCaseArticle(article, publicStrapiUrl))
  }
  catch (error) {
    console.warn('Unable to load case articles from Strapi.', error)
    return []
  }
})
