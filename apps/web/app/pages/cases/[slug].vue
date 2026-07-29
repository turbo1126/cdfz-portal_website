<script setup lang="ts">
import type { CaseArticle } from '@cdfz/contracts'

const route = useRoute()
const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const slug = computed(() => String(route.params.slug || ''))

const { data: article, error } = await useAsyncData<CaseArticle>(
  () => `case-article-${locale.value}-${slug.value}`,
  () => $fetch<CaseArticle>(`/api/content/articles/${encodeURIComponent(slug.value)}`, {
    query: { locale: locale.value },
  }),
  { watch: [locale, slug] },
)

if (error.value || !article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: isEnglish.value ? 'Article not found' : '内容不存在或尚未发布',
  })
}

const categoryLabel = computed(() => {
  const labels = isEnglish.value
    ? { case: 'CASE', news: 'NEWS', event: 'EVENT' }
    : { case: '客户案例', news: '公司动态', event: '活动资讯' }
  return labels[article.value?.category || 'news']
})

const displayDate = computed(() => {
  const value = article.value?.publishedDate || article.value?.publishedAt
  if (!value) return ''
  return new Intl.DateTimeFormat(isEnglish.value ? 'en-US' : 'zh-CN', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(new Date(value))
})

useSeoMeta({
  title: () => `${article.value?.title || ''} | ${isEnglish.value ? 'Chengdian Fuzhi' : '上海成电福智'}`,
  description: () => article.value?.summary || '',
  ogTitle: () => article.value?.title || '',
  ogDescription: () => article.value?.summary || '',
  ogImage: () => article.value?.cover?.url || '',
})
</script>

<template>
  <article v-if="article" class="article-page">
    <header class="article-hero">
      <div class="site-container article-hero-inner">
        <NuxtLink :to="localePath('/cases')" class="back-link">← {{ isEnglish ? 'Cases & News' : '返回案例与动态' }}</NuxtLink>
        <div class="article-meta"><span>{{ categoryLabel }}</span><time v-if="displayDate">{{ displayDate }}</time><b v-if="article.sourceName">{{ article.sourceName }}</b></div>
        <h1>{{ article.title }}</h1>
        <p>{{ article.summary }}</p>
      </div>
    </header>

    <div class="site-container article-layout">
      <main>
        <img v-if="article.cover?.url" class="article-cover" :src="article.cover.url" :alt="article.cover.alternativeText || article.title" />

        <div v-if="article.contentMode === 'external'" class="external-panel">
          <span>WECHAT</span>
          <h2>{{ isEnglish ? 'Continue reading on WeChat' : '前往微信公众号阅读完整文章' }}</h2>
          <p>{{ isEnglish ? 'This content was originally published through the company WeChat account.' : '该内容发布在微信公众号，点击下方按钮将在新窗口打开原文。' }}</p>
          <a v-if="article.externalUrl" :href="article.externalUrl" target="_blank" rel="noopener noreferrer">{{ isEnglish ? 'Open WeChat article' : '打开微信公众号文章' }} ↗</a>
        </div>

        <ContentArticleBody v-else-if="article.content?.length" :blocks="article.content" />
        <p v-else class="body-empty">{{ isEnglish ? 'The article body is being prepared.' : '正文内容正在完善中。' }}</p>
      </main>

      <aside>
        <p>{{ isEnglish ? 'CONTENT INFO' : '内容信息' }}</p>
        <dl>
          <div><dt>{{ isEnglish ? 'Category' : '分类' }}</dt><dd>{{ categoryLabel }}</dd></div>
          <div v-if="displayDate"><dt>{{ isEnglish ? 'Date' : '发布日期' }}</dt><dd>{{ displayDate }}</dd></div>
          <div v-if="article.sourceName"><dt>{{ isEnglish ? 'Source' : '来源' }}</dt><dd>{{ article.sourceName }}</dd></div>
        </dl>
        <NuxtLink :to="localePath('/cases')">{{ isEnglish ? 'View all updates' : '查看全部案例与动态' }} <span>↗</span></NuxtLink>
      </aside>
    </div>
  </article>
</template>

<style scoped>
.article-page { padding-top: 86px; }
.article-hero { padding: 72px 0 82px; color: white; background: #1a1d19; }
.article-hero-inner { max-width: 1060px; }.back-link { display: inline-flex; color: rgba(255,255,255,.5); font-size: 12px; transition: color 160ms ease; }.back-link:hover { color: white; }
.article-meta { display: flex; flex-wrap: wrap; gap: 12px 25px; margin-top: 62px; color: rgba(255,255,255,.46); font-size: 10px; font-weight: 650; letter-spacing: .1em; }.article-meta span { color: #8db8ff; }.article-meta b { font-weight: 650; }
.article-hero h1 { max-width: 980px; margin: 25px 0 0; font-size: clamp(39px,5.4vw,68px); font-weight: 500; letter-spacing: -.052em; line-height: 1.18; }.article-hero-inner > p { max-width: 790px; margin: 27px 0 0; color: rgba(255,255,255,.62); font-size: 16px; line-height: 1.85; }
.article-layout { display: grid; grid-template-columns: minmax(0,780px) 250px; justify-content: center; gap: 80px; padding-top: 75px; padding-bottom: 120px; }
.article-cover { display: block; width: 100%; max-height: 540px; margin-bottom: 55px; border-radius: 14px; object-fit: cover; }
.article-layout aside { align-self: start; position: sticky; top: 115px; padding-top: 6px; }.article-layout aside > p { margin: 0 0 19px; color: #969990; font-size: 9px; font-weight: 750; letter-spacing: .16em; }.article-layout dl { margin: 0; border-top: 1px solid var(--line); }.article-layout dl > div { padding: 15px 0; border-bottom: 1px solid var(--line); }.article-layout dt { color: #989b93; font-size: 9px; letter-spacing: .1em; }.article-layout dd { margin: 7px 0 0; color: #3b3e37; font-size: 12px; line-height: 1.6; }.article-layout aside > a { display: flex; align-items: center; justify-content: space-between; margin-top: 24px; padding: 13px 14px; border-radius: 6px; color: white; background: var(--accent); font-size: 11px; font-weight: 700; }.article-layout aside > a span { font-size: 14px; }
.external-panel { padding: 48px; border: 1px solid #dbe5f4; border-radius: 14px; background: var(--accent-soft); }.external-panel > span { color: var(--accent-dark); font-size: 10px; font-weight: 800; letter-spacing: .18em; }.external-panel h2 { margin: 17px 0 0; font-size: 31px; font-weight: 560; letter-spacing: -.035em; }.external-panel p { margin: 18px 0 0; color: var(--muted); font-size: 14px; line-height: 1.8; }.external-panel a { display: inline-flex; margin-top: 28px; padding: 13px 17px; border-radius: 7px; color: white; background: var(--accent); font-size: 13px; font-weight: 700; }
.body-empty { padding: 50px; border: 1px dashed #d5d7cf; color: var(--muted); text-align: center; }
@media (max-width: 1023px) { .article-page { padding-top: 74px; }.article-layout { grid-template-columns: minmax(0,760px); }.article-layout aside { position: static; order: -1; } }
@media (max-width: 600px) { .article-hero { padding: 55px 0 62px; }.article-meta { margin-top: 45px; }.article-layout { padding-top: 50px; padding-bottom: 80px; }.article-cover { margin-bottom: 38px; }.external-panel { padding: 30px 23px; } }
</style>
