<script setup lang="ts">
import type { CaseArticle } from '@cdfz/contracts'

const props = defineProps<{
  article: CaseArticle
  to?: string
}>()

const { locale } = useI18n()
const localePath = useLocalePath()
const isEnglish = computed(() => locale.value === 'en-US')
const NuxtLinkComponent = resolveComponent('NuxtLink')
const isExternal = computed(() => !props.to && props.article.contentMode === 'external' && Boolean(props.article.externalUrl))
const linkComponent = computed(() => isExternal.value ? 'a' : NuxtLinkComponent)
const linkAttributes = computed(() => {
  if (props.to) {
    return { to: props.to }
  }

  return isExternal.value
    ? {
        href: props.article.externalUrl || '#',
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {
        to: localePath(`/cases/${props.article.slug}`),
      }
})

const categoryLabel = computed(() => {
  const labels = isEnglish.value
    ? { case: 'CASE', news: 'NEWS', event: 'EVENT' }
    : { case: '案例', news: '动态', event: '活动' }

  return labels[props.article.category]
})

const displayDate = computed(() => {
  const value = props.article.publishedDate || props.article.publishedAt
  if (!value) {
    return ''
  }

  return new Intl.DateTimeFormat(isEnglish.value ? 'en-US' : 'zh-CN', {
    year: 'numeric',
    month: isEnglish.value ? 'short' : '2-digit',
    day: '2-digit',
  }).format(new Date(value))
})
</script>

<template>
  <component :is="linkComponent" v-bind="linkAttributes" class="article-card">
    <div class="article-cover" :class="{ 'article-cover--empty': !article.cover?.url }">
      <img v-if="article.cover?.url" :src="article.cover.url" :alt="article.cover.alternativeText || article.title" />
      <div v-else class="cover-placeholder"><span>CDFZ</span><b>CASE / NEWS</b></div>
      <span v-if="article.featured" class="featured-badge">{{ isEnglish ? 'FEATURED' : '置顶' }}</span>
    </div>

    <div class="article-content">
      <div class="article-meta">
        <span>{{ categoryLabel }}</span>
        <time v-if="displayDate">{{ displayDate }}</time>
      </div>
      <h2>{{ article.title }}</h2>
      <p>{{ article.summary }}</p>
      <div class="article-footer">
        <span v-if="article.sourceName">{{ article.sourceName }}</span>
        <b>{{ isExternal ? (isEnglish ? 'WECHAT ARTICLE' : '微信公众号') : (isEnglish ? 'READ MORE' : '查看详情') }} <i>↗</i></b>
      </div>
    </div>
  </component>
</template>

<style scoped>
.article-card { display: flex; min-width: 0; flex-direction: column; overflow: hidden; border: 1px solid var(--line); border-radius: 14px; background: white; box-shadow: 0 18px 50px rgba(24,28,22,.04); transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease; }
.article-card:hover { border-color: rgba(23,105,224,.28); box-shadow: 0 25px 65px rgba(24,28,22,.1); transform: translateY(-5px); }
.article-cover { position: relative; height: 245px; overflow: hidden; background: #dfe5eb; }
.article-cover img { width: 100%; height: 100%; object-fit: cover; transition: transform 500ms ease; }
.article-card:hover .article-cover img { transform: scale(1.035); }
.article-cover--empty { background: linear-gradient(135deg,#192b43,#1769e0); }
.cover-placeholder { position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: space-between; padding: 25px; color: white; background-image: linear-gradient(rgba(255,255,255,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.09) 1px,transparent 1px); background-size: 40px 40px; }
.cover-placeholder span { font-size: 34px; font-weight: 750; letter-spacing: -.04em; }
.cover-placeholder b { font-size: 9px; letter-spacing: .18em; opacity: .7; }
.featured-badge { position: absolute; top: 18px; left: 18px; padding: 7px 10px; border-radius: 5px; color: #144d9f; background: rgba(255,255,255,.92); font-size: 9px; font-weight: 800; letter-spacing: .12em; backdrop-filter: blur(10px); }
.article-content { display: flex; flex: 1; flex-direction: column; padding: 28px; }
.article-meta { display: flex; align-items: center; justify-content: space-between; gap: 16px; color: #898c84; font-size: 10px; font-weight: 700; letter-spacing: .12em; }
.article-meta > span { color: var(--accent-dark); }
.article-content h2 { margin: 22px 0 0; font-size: 23px; font-weight: 560; letter-spacing: -.025em; line-height: 1.45; }
.article-content > p { display: -webkit-box; overflow: hidden; margin: 16px 0 0; color: var(--muted); font-size: 13px; line-height: 1.8; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
.article-footer { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-top: auto; padding-top: 28px; }
.article-footer > span { overflow: hidden; color: #92958d; font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }
.article-footer b { flex: 0 0 auto; color: var(--accent-dark); font-size: 10px; letter-spacing: .1em; }
.article-footer i { margin-left: 6px; font-size: 13px; font-style: normal; }
@media (max-width: 600px) { .article-cover { height: 210px; }.article-content { padding: 23px; }.article-content h2 { font-size: 21px; } }
</style>
