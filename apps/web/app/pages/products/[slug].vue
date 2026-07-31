<script setup lang="ts">
import type { CoreProduct } from '@cdfz/contracts'
import { findProductWithFallbacks } from '~/utils/product-content'

const route = useRoute()
const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const slug = computed(() => String(route.params.slug || ''))

const { data: cmsProducts } = await useAsyncData<CoreProduct[]>(
  () => `product-detail-list-${locale.value}`,
  () => $fetch<CoreProduct[]>('/api/content/products', { query: { locale: locale.value } }),
  { watch: [locale], default: () => [] },
)

const product = computed(() => findProductWithFallbacks(cmsProducts.value, locale.value, slug.value))
const productMark = computed(() => product.value?.title.replace(/\s+/g, '').slice(0, 2) || 'AI')

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: isEnglish.value ? 'Product not found' : '产品内容不存在或尚未发布',
  })
}

useSeoMeta({
  title: () => `${product.value?.title || ''} | ${isEnglish.value ? 'Chengdian Fuzhi' : '上海成电福智'}`,
  description: () => product.value?.summary || '',
  ogTitle: () => product.value?.title || '',
  ogDescription: () => product.value?.summary || '',
  ogImage: () => product.value?.cover?.url || '',
})
</script>

<template>
  <article v-if="product" class="product-detail-page">
    <header class="product-detail-hero">
      <div class="hero-grid" />
      <div class="site-container product-detail-hero-inner">
        <div class="product-hero-copy">
          <NuxtLink :to="localePath('/products')" class="back-link">← {{ isEnglish ? 'All products' : '返回产品与解决方案' }}</NuxtLink>
          <p class="section-kicker">{{ product.category }}</p>
          <h1>{{ product.title }}</h1>
          <p class="product-summary">{{ product.summary }}</p>
          <div v-if="product.tags?.length" class="product-tags">
            <span v-for="tag in product.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="product-hero-media">
          <img v-if="product.cover?.url" class="product-cover" :src="product.cover.url" :alt="product.cover.alternativeText || product.title">
          <div v-else class="product-hero-symbol">
            <img v-if="product.icon?.url" :src="product.icon.url" :alt="product.icon.alternativeText || product.title">
            <strong v-else>{{ productMark }}</strong>
            <span>INTELLIGENT PRODUCT</span>
          </div>
        </div>
      </div>
    </header>

    <div class="site-container product-detail-layout">
      <main>
        <p class="body-kicker">{{ isEnglish ? 'PRODUCT OVERVIEW' : '产品介绍' }}</p>
        <ContentArticleBody v-if="product.content?.length" :blocks="product.content" />
        <p v-else class="body-empty">{{ isEnglish ? 'The product content is being prepared.' : '产品详细内容正在完善中。' }}</p>
      </main>

      <aside>
        <p>{{ isEnglish ? 'KEY CAPABILITIES' : '核心能力' }}</p>
        <div class="aside-tags">
          <span v-for="tag in product.tags || []" :key="tag">{{ tag }}</span>
        </div>
        <NuxtLink :to="localePath('/contact')">
          {{ isEnglish ? 'Book a product demo' : '预约产品演示' }}
          <span>↗</span>
        </NuxtLink>
      </aside>
    </div>
  </article>
</template>

<style scoped>
.product-detail-page { padding-top: 86px; }
.product-detail-hero { position: relative; overflow: hidden; padding: 76px 0 88px; color: white; background: #111923; }
.hero-grid { position: absolute; inset: 0; opacity: .15; background-image: linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px); background-size: 64px 64px; mask-image: linear-gradient(90deg,black,transparent 88%); }
.product-detail-hero-inner { display: grid; position: relative; grid-template-columns: minmax(0,1fr) minmax(360px,.72fr); gap: 76px; align-items: center; }
.back-link { display: flex; width: max-content; margin-bottom: 68px; color: rgba(255,255,255,.5); font-size: 12px; transition: color 160ms ease; }.back-link:hover { color: white; }
.product-hero-copy h1 { max-width: 820px; margin: 22px 0 0; overflow-wrap: anywhere; text-wrap: balance; font-size: clamp(43px,4.4vw,62px); font-weight: 490; letter-spacing: -.052em; line-height: 1.16; }
.product-summary { max-width: 720px; margin: 27px 0 0; color: rgba(255,255,255,.65); font-size: 16px; line-height: 1.85; }
.product-tags { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 30px; }.product-tags span { padding: 8px 12px; border: 1px solid rgba(255,255,255,.16); border-radius: 999px; color: rgba(255,255,255,.72); font-size: 11px; }
.product-hero-media { height: 470px; overflow: hidden; border: 1px solid rgba(255,255,255,.12); border-radius: 18px; background: linear-gradient(145deg,#172638,#215fa8); box-shadow: 0 32px 80px rgba(0,0,0,.24); }.product-cover { width: 100%; height: 100%; object-fit: cover; }.product-hero-symbol { display: flex; position: relative; width: 100%; height: 100%; align-items: center; flex-direction: column; justify-content: center; overflow: hidden; background: radial-gradient(circle at 50% 42%,rgba(91,156,255,.3),transparent 42%); }.product-hero-symbol::before { position: absolute; width: 270px; height: 270px; border: 1px solid rgba(255,255,255,.16); border-radius: 50%; content: ''; }.product-hero-symbol img { z-index: 1; width: 110px; height: 110px; object-fit: contain; }.product-hero-symbol strong { z-index: 1; font-size: 86px; font-weight: 300; letter-spacing: -.06em; }.product-hero-symbol span { z-index: 1; margin-top: 32px; color: rgba(255,255,255,.55); font-size: 9px; font-weight: 700; letter-spacing: .22em; }
.product-detail-layout { display: grid; grid-template-columns: minmax(0,780px) 250px; justify-content: center; gap: 88px; padding-top: 88px; padding-bottom: 125px; }
.body-kicker { margin: 0 0 32px; padding-bottom: 18px; border-bottom: 1px solid var(--line); color: var(--accent-dark); font-size: 10px; font-weight: 750; letter-spacing: .18em; }.body-empty { padding: 50px; border: 1px dashed #d5d7cf; color: var(--muted); text-align: center; }
.product-detail-layout aside { position: sticky; top: 116px; align-self: start; }.product-detail-layout aside > p { margin: 0 0 18px; color: #969990; font-size: 9px; font-weight: 750; letter-spacing: .16em; }.aside-tags { display: flex; flex-direction: column; border-top: 1px solid var(--line); }.aside-tags span { padding: 15px 0; border-bottom: 1px solid var(--line); color: #454942; font-size: 12px; }.product-detail-layout aside > a { display: flex; align-items: center; justify-content: space-between; margin-top: 25px; padding: 14px 15px; border-radius: 7px; color: white; background: var(--accent); font-size: 12px; font-weight: 700; }
@media (max-width: 1023px) { .product-detail-page { padding-top: 74px; }.product-detail-hero-inner { grid-template-columns: 1fr; }.product-hero-media { height: min(60vw,480px); }.product-detail-layout { grid-template-columns: minmax(0,780px); }.product-detail-layout aside { position: static; } }
@media (max-width: 600px) { .product-detail-hero { padding: 55px 0 62px; }.product-detail-hero-inner { gap: 45px; }.back-link { margin-bottom: 48px; }.product-hero-media { height: 250px; }.product-detail-layout { gap: 50px; padding-top: 58px; padding-bottom: 82px; } }
</style>
