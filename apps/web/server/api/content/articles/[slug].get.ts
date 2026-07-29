import type {
  CaseArticle,
  LocaleCode,
} from '@cdfz/contracts'
import { normalizeCaseArticle } from '../../../utils/case-articles'
import { fetchLocalizedCollection } from '../../../utils/strapi'

export default defineEventHandler(async (event): Promise<CaseArticle> => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const slug = getRouterParam(event, 'slug')
  const locale: LocaleCode = query.locale === 'en-US' ? 'en-US' : 'zh-CN'
  const strapiUrl = config.internalStrapiUrl.replace(/\/$/, '')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Article slug is required.' })
  }

  const articles = await fetchLocalizedCollection<CaseArticle>(
    strapiUrl,
    '/api/case-articles',
    locale,
    {
      'filters[slug][$eq]': slug,
      populate: '*',
      'pagination[pageSize]': 1,
    },
  )

  const article = articles[0]
  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found.' })
  }

  return normalizeCaseArticle(article, strapiUrl)
})
