<script setup lang="ts">
import type {
  ArticleCategory,
  CaseArticle,
} from '@cdfz/contracts'
import { getLocaleContent } from '~/utils/site-content'

type CategoryFilter = 'all' | ArticleCategory

const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const activeCategory = ref<CategoryFilter>('all')
const fallbackContent = computed(() => getLocaleContent(locale.value))

const { data: articles } = await useAsyncData<CaseArticle[]>(
  () => `home-articles-${locale.value}`,
  () => $fetch<CaseArticle[]>('/api/content/articles', {
    query: {
      locale: locale.value,
      limit: 100,
    },
  }),
  {
    default: () => [],
    watch: [locale],
  },
)

const categories = computed<Array<{ value: CategoryFilter, label: string }>>(() => isEnglish.value
  ? [
      { value: 'all', label: 'All' },
      { value: 'case', label: 'Cases' },
      { value: 'news', label: 'News' },
      { value: 'event', label: 'Events' },
    ]
  : [
      { value: 'all', label: '全部' },
      { value: 'case', label: '客户案例' },
      { value: 'news', label: '公司动态' },
      { value: 'event', label: '活动资讯' },
    ])

const fallbackArticles = computed<CaseArticle[]>(() => {
  const fallbackCategories: ArticleCategory[] = ['event', 'case', 'news']
  const summary = fallbackContent.value.sections.cases.description

  return fallbackContent.value.home.news.map((item, index) => ({
    title: item.title,
    slug: `fallback-${index + 1}`,
    summary,
    category: fallbackCategories[index % fallbackCategories.length] || 'news',
    contentMode: 'internal',
    publishedDate: `${item.date.replace('.', '-')}-01`,
    featured: false,
    sourceName: isEnglish.value ? 'Chengdian Fuzhi' : '成电福智',
  }))
})

const isUsingFallback = computed(() => articles.value.length === 0)
const availableArticles = computed(() => articles.value.length ? articles.value : fallbackArticles.value)
const filteredArticles = computed(() => activeCategory.value === 'all'
  ? availableArticles.value
  : availableArticles.value.filter(article => article.category === activeCategory.value))
const visibleArticles = computed(() => filteredArticles.value.slice(0, 3))
</script>

<template>
  <section class="news-section">
    <HomeTechPattern variant="news" />
    <div class="site-container">
      <div class="news-heading">
        <div>
          <p class="section-kicker">{{ isEnglish ? 'CASES & NEWS' : '案例与动态' }}</p>
          <h2 class="section-heading">{{ isEnglish ? 'Cases, news and events.' : '案例、动态与活动资讯' }}</h2>
        </div>

        <div class="category-tabs" role="tablist" :aria-label="isEnglish ? 'Homepage article categories' : '首页内容分类'">
          <button
            v-for="category in categories"
            :key="category.value"
            type="button"
            role="tab"
            :aria-selected="activeCategory === category.value"
            :class="{ active: activeCategory === category.value }"
            @click="activeCategory = category.value"
          >
            {{ category.label }}
          </button>
        </div>
      </div>

      <div v-if="visibleArticles.length" class="news-grid">
        <ContentArticleCard
          v-for="article in visibleArticles"
          :key="article.documentId || article.slug"
          :article="article"
          :to="isUsingFallback ? localePath('/cases') : undefined"
        />
      </div>

      <div v-else class="filter-empty">
        {{ isEnglish ? 'No published content in this category.' : '该分类下暂时没有已发布内容。' }}
      </div>

      <div class="news-more">
        <NuxtLink :to="localePath('/cases')" class="arrow-link">
          {{ isEnglish ? 'View all cases and updates' : '查看全部案例与动态' }}<span>→</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-section { position: relative; overflow: hidden; padding: 82px 0; }
.news-section > .site-container { position: relative; z-index: 1; }
.news-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 45px; }
.news-heading .section-heading { max-width: 760px; }
.category-tabs { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 9px; }
.category-tabs button { padding: 11px 18px; border: 1px solid var(--line); border-radius: 999px; color: #696c64; background: rgba(246,246,241,.76); font-size: 13px; cursor: pointer; transition: color 160ms ease, border-color 160ms ease, background 160ms ease, transform 160ms ease; }
.category-tabs button:hover { border-color: rgba(23,105,224,.45); color: var(--accent-dark); transform: translateY(-1px); }
.category-tabs button.active { border-color: var(--accent); color: white; background: var(--accent); box-shadow: 0 9px 22px rgba(23,105,224,.2); }
.news-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 24px; margin-top: 40px; }
.filter-empty { margin-top: 40px; padding: 56px 24px; border: 1px dashed #d4d6ce; border-radius: 14px; color: var(--muted); background: rgba(255,255,255,.42); text-align: center; }
.news-more { display: flex; justify-content: flex-end; margin-top: 28px; }
@media (max-width: 1023px) {
  .news-heading { align-items: flex-start; flex-direction: column; gap: 30px; }
  .category-tabs { justify-content: flex-start; }
  .news-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
}
@media (max-width: 767px) {
  .news-section { padding: 62px 0; }
  .category-tabs { gap: 7px; }
  .category-tabs button { padding: 9px 14px; font-size: 12px; }
  .news-grid { grid-template-columns: 1fr; margin-top: 32px; }
  .news-more { justify-content: flex-start; }
}
</style>
