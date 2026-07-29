<script setup lang="ts">
import type { CaseArticle } from '@cdfz/contracts'
import { getLocaleContent } from '~/utils/site-content'

type HomeNewsItem = {
  type: string
  date: string
  title: string
  href: string
  external: boolean
}

const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const NuxtLinkComponent = resolveComponent('NuxtLink')
const fallbackNews = computed(() => getLocaleContent(locale.value).home.news)

const { data: latestArticles } = await useAsyncData<CaseArticle[]>(
  () => `home-latest-articles-${locale.value}`,
  () => $fetch<CaseArticle[]>('/api/content/articles', {
    query: {
      locale: locale.value,
      order: 'latest',
      limit: 3,
    },
  }),
  {
    default: () => [],
    watch: [locale],
  },
)

const articleCategoryLabel = (article: CaseArticle) => {
  const labels = isEnglish.value
    ? { case: 'CASE', news: 'NEWS', event: 'EVENT' }
    : { case: '客户案例', news: '公司动态', event: '活动资讯' }

  return labels[article.category]
}

const articleDate = (article: CaseArticle) => {
  const value = article.publishedDate || article.publishedAt
  if (!value) return ''

  const date = new Date(value)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

const news = computed<HomeNewsItem[]>(() => {
  if (latestArticles.value.length) {
    return latestArticles.value.map((article) => {
      const external = article.contentMode === 'external' && Boolean(article.externalUrl)

      return {
        type: articleCategoryLabel(article),
        date: articleDate(article),
        title: article.title,
        href: external ? article.externalUrl || '#' : localePath(`/cases/${article.slug}`),
        external,
      }
    })
  }

  return fallbackNews.value.map(item => ({
    ...item,
    href: localePath('/cases'),
    external: false,
  }))
})

const newsLinkComponent = (item: HomeNewsItem) => item.external ? 'a' : NuxtLinkComponent
const newsLinkAttributes = (item: HomeNewsItem) => item.external
  ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
  : { to: item.href }
</script>

<template>
  <section class="news-section">
    <div class="site-container">
      <div class="news-heading">
        <div><p class="section-kicker">{{ isEnglish ? 'CASES & NEWS' : '案例与动态' }}</p><h2 class="section-heading">{{ isEnglish ? 'See innovation happening.' : '看见创新，正在真实发生。' }}</h2></div>
        <NuxtLink :to="localePath('/cases')" class="arrow-link">{{ isEnglish ? 'View all updates' : '查看全部动态' }}<span>→</span></NuxtLink>
      </div>
      <div class="news-list">
        <component
          :is="newsLinkComponent(item)"
          v-for="item in news"
          :key="item.title"
          v-bind="newsLinkAttributes(item)"
          class="news-item"
        >
          <div class="news-type">{{ item.type }}<small v-if="item.external">{{ isEnglish ? 'WECHAT' : '微信' }}</small></div>
          <div class="news-date">{{ item.date }}</div>
          <h3>{{ item.title }}</h3>
          <div class="news-arrow">↗</div>
        </component>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-section { padding: 118px 0; }
.news-heading { display: flex; align-items: end; justify-content: space-between; gap: 45px; }
.news-list { margin-top: 60px; border-top: 1px solid var(--line); }
.news-item { display: grid; grid-template-columns: 110px 100px 1fr 44px; align-items: center; gap: 25px; min-height: 116px; padding: 18px 3px; border-bottom: 1px solid var(--line); transition: 180ms ease; }
.news-item:hover { padding-right: 16px; padding-left: 16px; background: #fff; }
.news-type { color: var(--accent-dark); font-size: 14px; font-weight: 700; }
.news-type small { display: block; margin-top: 6px; color: #7c8795; font-size: 12px; letter-spacing: .12em; }
.news-date { color: #8b8e87; font-size: 12px; }
.news-item h3 { margin: 0; font-size: 19px; font-weight: 520; line-height: 1.5; }
.news-arrow { display: grid; width: 42px; height: 42px; place-items: center; border: 1px solid var(--line); border-radius: 50%; transition: 180ms ease; }
.news-item:hover .news-arrow { color: white; border-color: var(--accent); background: var(--accent); }
@media (max-width: 767px) {
  .news-section { padding: 82px 0; }
  .news-heading { align-items: flex-start; flex-direction: column; }
  .news-item { grid-template-columns: 82px 1fr 40px; gap: 14px; min-height: 128px; }
  .news-date { display: none; }
  .news-item h3 { font-size: 16px; }
}
</style>
