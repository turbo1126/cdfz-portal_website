<script setup lang="ts">
import type { InnovationPlatform } from '@cdfz/contracts'
import { getFallbackPlatform } from '~/utils/platform-content'

const route = useRoute()
const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const slug = computed(() => String(route.params.slug || ''))

const { data: cmsPlatform } = await useAsyncData<InnovationPlatform | null>(
  () => `platform-detail-${locale.value}-${slug.value}`,
  async () => {
    try {
      return await $fetch<InnovationPlatform>(`/api/content/platforms/${encodeURIComponent(slug.value)}`, {
        query: { locale: locale.value },
      })
    }
    catch {
      return null
    }
  },
  { watch: [locale, slug] },
)

const platform = computed(() => cmsPlatform.value || getFallbackPlatform(locale.value, slug.value))

if (!platform.value) {
  throw createError({
    statusCode: 404,
    statusMessage: isEnglish.value ? 'Platform not found' : '平台内容不存在或尚未发布',
  })
}

useSeoMeta({
  title: () => `${platform.value?.title || ''} | ${isEnglish.value ? 'Chengdian Fuzhi' : '上海成电福智'}`,
  description: () => platform.value?.summary || '',
  ogTitle: () => platform.value?.title || '',
  ogDescription: () => platform.value?.summary || '',
  ogImage: () => platform.value?.cover?.url || '',
})
</script>

<template>
  <article v-if="platform" class="platform-detail-page">
    <header class="platform-detail-hero">
      <div class="hero-grid" />
      <div class="site-container platform-detail-hero-inner">
        <div class="platform-hero-copy">
          <NuxtLink :to="localePath('/platforms')" class="back-link">← {{ isEnglish ? 'All platforms' : '返回创新平台' }}</NuxtLink>
          <p class="section-kicker">{{ platform.eyebrow || platform.shortName || (isEnglish ? 'INNOVATION PLATFORM' : '创新平台') }}</p>
          <h1>{{ platform.title }}</h1>
          <p class="platform-summary">{{ platform.summary }}</p>
          <div v-if="platform.tags?.length" class="platform-tags">
            <span v-for="tag in platform.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="platform-hero-media">
          <img v-if="platform.cover?.url" :src="platform.cover.url" :alt="platform.cover.alternativeText || platform.title">
          <div v-else class="cover-placeholder">CDFZ</div>
        </div>
      </div>
    </header>

    <div class="site-container platform-detail-layout">
      <main>
        <p class="body-kicker">{{ isEnglish ? 'PLATFORM OVERVIEW' : '平台介绍' }}</p>
        <ContentArticleBody v-if="platform.content?.length" :blocks="platform.content" />
        <p v-else class="body-empty">{{ isEnglish ? 'The platform content is being prepared.' : '平台详细内容正在完善中。' }}</p>
      </main>

      <aside>
        <p>{{ isEnglish ? 'SERVICE AREAS' : '服务方向' }}</p>
        <div class="aside-tags">
          <span v-for="tag in platform.tags || []" :key="tag">{{ tag }}</span>
        </div>
        <NuxtLink :to="localePath('/contact')">
          {{ isEnglish ? 'Discuss cooperation' : '咨询平台合作' }}
          <span>↗</span>
        </NuxtLink>
      </aside>
    </div>
  </article>
</template>

<style scoped>
.platform-detail-page { padding-top: 86px; }
.platform-detail-hero { position: relative; overflow: hidden; padding: 76px 0 88px; color: white; background: #111923; }
.hero-grid { position: absolute; inset: 0; opacity: .15; background-image: linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px); background-size: 64px 64px; mask-image: linear-gradient(90deg,black,transparent 88%); }
.platform-detail-hero-inner { display: grid; position: relative; grid-template-columns: minmax(0,1fr) minmax(360px,.72fr); gap: 76px; align-items: center; }
.back-link { display: flex; width: max-content; margin-bottom: 68px; color: rgba(255,255,255,.5); font-size: 12px; transition: color 160ms ease; }.back-link:hover { color: white; }
.platform-hero-copy h1 { max-width: 820px; margin: 22px 0 0; overflow-wrap: anywhere; text-wrap: balance; font-size: clamp(43px,4.4vw,62px); font-weight: 490; letter-spacing: -.052em; line-height: 1.16; }
.platform-summary { max-width: 720px; margin: 27px 0 0; color: rgba(255,255,255,.65); font-size: 16px; line-height: 1.85; }
.platform-tags { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 30px; }.platform-tags span { padding: 8px 12px; border: 1px solid rgba(255,255,255,.16); border-radius: 999px; color: rgba(255,255,255,.72); font-size: 11px; }
.platform-hero-media { height: 470px; overflow: hidden; border: 1px solid rgba(255,255,255,.12); border-radius: 18px; background: linear-gradient(135deg,#172638,#2b66ab); box-shadow: 0 32px 80px rgba(0,0,0,.24); }.platform-hero-media img { width: 100%; height: 100%; object-fit: cover; }.cover-placeholder { display: grid; width: 100%; height: 100%; place-items: center; color: rgba(255,255,255,.5); font-size: 44px; letter-spacing: .2em; }
.platform-detail-layout { display: grid; grid-template-columns: minmax(0,780px) 250px; justify-content: center; gap: 88px; padding-top: 88px; padding-bottom: 125px; }
.body-kicker { margin: 0 0 32px; padding-bottom: 18px; border-bottom: 1px solid var(--line); color: var(--accent-dark); font-size: 10px; font-weight: 750; letter-spacing: .18em; }
.body-empty { padding: 50px; border: 1px dashed #d5d7cf; color: var(--muted); text-align: center; }
.platform-detail-layout aside { position: sticky; top: 116px; align-self: start; }.platform-detail-layout aside > p { margin: 0 0 18px; color: #969990; font-size: 9px; font-weight: 750; letter-spacing: .16em; }.aside-tags { display: flex; flex-direction: column; border-top: 1px solid var(--line); }.aside-tags span { padding: 15px 0; border-bottom: 1px solid var(--line); color: #454942; font-size: 12px; }.platform-detail-layout aside > a { display: flex; align-items: center; justify-content: space-between; margin-top: 25px; padding: 14px 15px; border-radius: 7px; color: white; background: var(--accent); font-size: 12px; font-weight: 700; }
@media (max-width: 1023px) { .platform-detail-page { padding-top: 74px; }.platform-detail-hero-inner { grid-template-columns: 1fr; }.platform-hero-media { height: min(60vw,480px); }.platform-detail-layout { grid-template-columns: minmax(0,780px); }.platform-detail-layout aside { position: static; } }
@media (max-width: 600px) { .platform-detail-hero { padding: 55px 0 62px; }.platform-detail-hero-inner { gap: 45px; }.back-link { margin-bottom: 48px; }.platform-hero-media { height: 250px; }.platform-detail-layout { gap: 50px; padding-top: 58px; padding-bottom: 82px; } }
</style>
