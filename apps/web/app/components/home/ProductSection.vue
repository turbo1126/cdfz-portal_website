<script setup lang="ts">
import type { CoreProduct } from '@cdfz/contracts'
import { mergeProductsWithFallbacks } from '~/utils/product-content'

const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const { data: cmsProducts } = await useAsyncData<CoreProduct[]>(
  () => `home-products-${locale.value}`,
  () => $fetch<CoreProduct[]>('/api/content/products', { query: { locale: locale.value } }),
  { watch: [locale], default: () => [] },
)
const products = computed(() => mergeProductsWithFallbacks(cmsProducts.value, locale.value)
  .filter(product => product.featured !== false))
</script>

<template>
  <section id="products" class="products-section">
    <HomeTechPattern variant="products" />
    <div class="site-container">
      <div class="products-heading">
        <div>
          <p class="section-kicker">{{ isEnglish ? 'FLAGSHIP PRODUCTS' : '核心产品矩阵' }}</p>
          <h2 class="section-heading">{{ isEnglish ? 'Intelligence designed around real work.' : '围绕真实业务，打造可落地的智能产品。' }}</h2>
        </div>
        <NuxtLink :to="localePath('/products')" class="arrow-link">{{ isEnglish ? 'All products & solutions' : '全部产品与解决方案' }}<span>→</span></NuxtLink>
      </div>

      <div class="product-grid">
        <ContentProductCard v-for="(product, index) in products" :key="product.slug" :product="product" :index="index" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.products-section { position: relative; overflow: hidden; padding: 118px 0; background: #fff; }
.products-section > .site-container { position: relative; z-index: 1; }
.products-heading { display: flex; align-items: end; justify-content: space-between; gap: 45px; }
.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 66px; }
@media (max-width: 1050px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 767px) {
  .products-section { padding: 82px 0; }
  .products-heading { align-items: flex-start; flex-direction: column; }
  .product-grid { grid-template-columns: 1fr; margin-top: 45px; }
}
</style>
