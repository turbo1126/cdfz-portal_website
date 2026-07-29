<script setup lang="ts">
import type {
  ArticleCategory,
  CaseArticle,
} from '@cdfz/contracts'
import { getLocaleContent } from '~/utils/site-content'

type CategoryFilter = 'all' | ArticleCategory

const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const content = computed(() => getLocaleContent(locale.value))
const section = computed(() => content.value.sections.cases)
const activeCategory = ref<CategoryFilter>('all')

const { data: articles } = await useAsyncData<CaseArticle[]>(
  () => `case-articles-${locale.value}`,
  () => $fetch<CaseArticle[]>('/api/content/articles', { query: { locale: locale.value } }),
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

const filteredArticles = computed(() => activeCategory.value === 'all'
  ? articles.value
  : articles.value.filter(article => article.category === activeCategory.value))

useSeoMeta({
  title: () => isEnglish.value ? 'Cases & News | Chengdian Fuzhi' : '案例与动态 | 上海成电福智',
  description: () => section.value?.description || '',
})
</script>

<template>
  <div class="cases-page">
    <section class="cases-hero">
      <div class="hero-grid" />
      <div class="site-container hero-inner">
        <p class="section-kicker">{{ section?.eyebrow }}</p>
        <h1>{{ section?.title }}</h1>
        <p>{{ section?.description }}</p>
      </div>
    </section>

    <section class="article-section">
      <div class="site-container">
        <div class="article-toolbar">
          <div>
            <p>{{ isEnglish ? 'LATEST UPDATES' : '最新内容' }}</p>
            <h2>{{ isEnglish ? 'Cases, news and events' : '案例、动态与活动资讯' }}</h2>
          </div>
          <div v-if="articles.length" class="category-tabs" role="tablist" :aria-label="isEnglish ? 'Article categories' : '内容分类'">
            <button
              v-for="category in categories"
              :key="category.value"
              type="button"
              :class="{ active: activeCategory === category.value }"
              @click="activeCategory = category.value"
            >
              {{ category.label }}
            </button>
          </div>
        </div>

        <div v-if="filteredArticles.length" class="article-grid">
          <ContentArticleCard v-for="article in filteredArticles" :key="article.documentId || article.slug" :article="article" />
        </div>

        <div v-else-if="articles.length" class="filter-empty">
          {{ isEnglish ? 'No published content in this category.' : '该分类下暂时没有已发布内容。' }}
        </div>

        <div v-else class="empty-state">
          <p>{{ isEnglish ? 'CONTENT WILL BE PUBLISHED SOON' : '内容即将发布' }}</p>
          <h2>{{ isEnglish ? 'The publishing channel is ready.' : '案例与动态发布通道已经准备就绪。' }}</h2>
          <div class="fallback-grid">
            <article v-for="(point, index) in section?.featuredPoints || []" :key="point">
              <span>0{{ index + 1 }}</span><h3>{{ point }}</h3>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cases-page { padding-top: 86px; }
.cases-hero { position: relative; overflow: hidden; padding: 100px 0 105px; color: white; background: #1a1d19; }
.hero-grid { position: absolute; inset: 0; opacity: .22; background-image: linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px); background-size: 70px 70px; mask-image: linear-gradient(90deg,black,transparent 78%); }
.hero-inner { position: relative; }.hero-inner .section-kicker { color: #8db8ff; }.hero-inner .section-kicker::before { background: #77a9fa; }
.hero-inner h1 { max-width: 950px; margin: 24px 0 0; font-size: clamp(42px,5.3vw,72px); font-weight: 480; letter-spacing: -.055em; line-height: 1.13; }
.hero-inner > p:last-child { max-width: 760px; margin: 30px 0 0; color: rgba(255,255,255,.62); font-size: 16px; line-height: 1.9; }
.article-section { padding: 95px 0 125px; }
.article-toolbar { display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; margin-bottom: 46px; }
.article-toolbar > div:first-child > p { margin: 0; color: var(--accent-dark); font-size: 10px; font-weight: 750; letter-spacing: .17em; }
.article-toolbar h2 { margin: 14px 0 0; font-size: clamp(29px,3.2vw,44px); font-weight: 540; letter-spacing: -.04em; }
.category-tabs { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
.category-tabs button { padding: 10px 15px; border: 1px solid var(--line); border-radius: 999px; color: #696c64; background: transparent; font-size: 12px; cursor: pointer; transition: 160ms ease; }
.category-tabs button:hover,.category-tabs button.active { border-color: var(--accent); color: white; background: var(--accent); }
.article-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 24px; }
.filter-empty { padding: 80px 25px; border: 1px dashed #d4d6ce; color: var(--muted); text-align: center; }
.empty-state { padding: 68px; border: 1px solid var(--line); border-radius: 15px; background: white; }
.empty-state > p { margin: 0; color: var(--accent-dark); font-size: 10px; font-weight: 750; letter-spacing: .17em; }.empty-state > h2 { max-width: 720px; margin: 18px 0 40px; font-size: clamp(28px,3.2vw,43px); font-weight: 540; letter-spacing: -.04em; }
.fallback-grid { display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }.fallback-grid article { min-height: 180px; padding: 25px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }.fallback-grid span { color: var(--accent-dark); font-size: 9px; font-weight: 750; }.fallback-grid h3 { margin: 45px 0 0; font-size: 18px; font-weight: 560; line-height: 1.55; }
@media (max-width: 1023px) { .cases-page { padding-top: 74px; }.article-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
@media (max-width: 767px) { .cases-hero { padding: 72px 0 78px; }.article-section { padding: 70px 0 85px; }.article-toolbar { align-items: flex-start; flex-direction: column; gap: 28px; }.category-tabs { justify-content: flex-start; }.article-grid { grid-template-columns: 1fr; }.empty-state { padding: 30px 23px; }.fallback-grid { grid-template-columns: 1fr; } }
</style>
