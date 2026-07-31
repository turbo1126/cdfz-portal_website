<script setup lang="ts">
import type { CoreProduct } from '@cdfz/contracts'
import { mergeProductsWithFallbacks } from '~/utils/product-content'
import { getLocaleContent } from '~/utils/site-content'

const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const section = computed(() => getLocaleContent(locale.value).sections.products)
const { data: cmsProducts } = await useAsyncData<CoreProduct[]>(
  () => `product-list-${locale.value}`,
  () => $fetch<CoreProduct[]>('/api/content/products', { query: { locale: locale.value } }),
  { watch: [locale], default: () => [] },
)
const products = computed(() => mergeProductsWithFallbacks(cmsProducts.value, locale.value))

useSeoMeta({
  title: () => `${section.value.eyebrow} | ${isEnglish.value ? 'Chengdian Fuzhi' : '上海成电福智'}`,
  description: () => section.value.description,
})
</script>

<template>
  <div class="product-list-page">
    <header class="product-list-hero">
      <div class="hero-grid" />
      <div class="site-container product-list-hero-inner">
        <p class="section-kicker">{{ section.eyebrow }}</p>
        <h1>{{ section.title }}</h1>
        <p>{{ section.description }}</p>
      </div>
    </header>

    <section class="product-list-section">
      <div class="site-container">
        <div class="list-heading">
          <p>{{ isEnglish ? 'PRODUCT DIRECTORY' : '产品目录' }}</p>
          <span>{{ String(products.length).padStart(2, '0') }}</span>
        </div>
        <div class="product-grid">
          <ContentProductCard v-for="(product, index) in products" :key="product.slug" :product="product" :index="index" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.product-list-page { padding-top: 86px; }
.product-list-hero { position: relative; overflow: hidden; padding: 112px 0 118px; color: white; background: radial-gradient(circle at 82% 20%,rgba(40,120,230,.28),transparent 28%),#111923; }
.hero-grid { position: absolute; inset: 0; opacity: .16; background-image: linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px); background-size: 64px 64px; mask-image: linear-gradient(90deg,black,transparent 85%); }
.product-list-hero-inner { position: relative; }
.product-list-hero h1 { max-width: 980px; margin: 23px 0 0; text-wrap: balance; font-size: clamp(44px,5vw,68px); font-weight: 480; letter-spacing: -.055em; line-height: 1.13; }
.product-list-hero-inner > p:last-child { max-width: 720px; margin: 28px 0 0; color: rgba(255,255,255,.65); font-size: 16px; line-height: 1.9; }
.product-list-section { padding: 105px 0 130px; }
.list-heading { display: flex; align-items: center; justify-content: space-between; padding-bottom: 20px; border-bottom: 1px solid var(--line); }
.list-heading p { margin: 0; color: #8d9088; font-size: 10px; font-weight: 750; letter-spacing: .18em; }
.list-heading span { color: var(--accent-dark); font-size: 12px; font-weight: 750; }
.product-grid { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 16px; margin-top: 42px; }
@media (max-width: 1050px) { .product-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
@media (max-width: 767px) { .product-list-page { padding-top: 74px; }.product-list-hero { padding: 76px 0 82px; }.product-list-section { padding: 74px 0 90px; }.product-grid { grid-template-columns: 1fr; gap: 18px; } }
</style>
