<script setup lang="ts">
import { getLocaleContent } from '~/utils/site-content'

const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const products = computed(() => getLocaleContent(locale.value).home.products)
</script>

<template>
  <section id="products" class="products-section">
    <div class="site-container">
      <div class="products-heading">
        <div>
          <p class="section-kicker">{{ isEnglish ? 'FLAGSHIP PRODUCTS' : '核心产品矩阵' }}</p>
          <h2 class="section-heading">{{ isEnglish ? 'Intelligence designed around real work.' : '围绕真实业务，打造可落地的智能产品。' }}</h2>
        </div>
        <NuxtLink :to="localePath('/products')" class="arrow-link">{{ isEnglish ? 'All products & solutions' : '全部产品与解决方案' }}<span>→</span></NuxtLink>
      </div>

      <div class="product-grid">
        <NuxtLink v-for="product in products" :key="product.no" :to="localePath('/products')" class="product-card">
          <div class="product-top"><span>{{ product.no }}</span><b>↗</b></div>
          <div class="product-icon" :class="`icon-${product.no}`">
            <svg v-if="product.no === '01'" viewBox="0 0 64 64"><path d="M16 12h32v35H31L20 55v-8h-4z"/><path d="M24 23h16M24 31h12M24 39h8"/></svg>
            <svg v-else-if="product.no === '02'" viewBox="0 0 64 64"><path d="M5 32s10-16 27-16 27 16 27 16-10 16-27 16S5 32 5 32Z"/><circle cx="32" cy="32" r="8"/></svg>
            <svg v-else-if="product.no === '03'" viewBox="0 0 64 64"><path d="M14 39h36l-4-15H18z"/><circle cx="22" cy="45" r="5"/><circle cx="42" cy="45" r="5"/><path d="M25 24v-7h14v7M32 17V9"/></svg>
            <svg v-else viewBox="0 0 64 64"><path d="m8 31 24-19 24 19v23H8z"/><path d="M24 54V38h16v16M18 28h28"/></svg>
          </div>
          <p class="product-category">{{ product.category }}</p>
          <h3>{{ product.title }}</h3>
          <p class="product-copy">{{ product.description }}</p>
          <div class="product-tags"><span v-for="tag in product.tags" :key="tag">{{ tag }}</span></div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products-section { padding: 118px 0; background: #fff; }
.products-heading { display: flex; align-items: end; justify-content: space-between; gap: 45px; }
.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 66px; }
.product-card { position: relative; min-height: 465px; padding: 24px; overflow: hidden; border: 1px solid var(--line); border-radius: 15px; background: #fafaf7; transition: 240ms ease; }
.product-card::after { position: absolute; inset: auto -35px -60px auto; width: 170px; height: 170px; content: ''; border-radius: 50%; background: var(--accent-soft); opacity: 0; transition: 300ms ease; }
.product-card:hover { border-color: #d8c5b6; background: white; box-shadow: 0 20px 52px rgba(35,36,32,.08); transform: translateY(-5px); }
.product-card:hover::after { opacity: .85; transform: scale(1.4); }
.product-top { display: flex; align-items: center; justify-content: space-between; color: #93958f; font-size: 11px; letter-spacing: .12em; }
.product-top b { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid var(--line); border-radius: 50%; color: var(--ink); font-size: 13px; font-weight: 400; transition: 180ms ease; }
.product-card:hover .product-top b { color: white; border-color: var(--accent); background: var(--accent); }
.product-icon { display: grid; width: 86px; height: 86px; margin-top: 45px; place-items: center; border-radius: 23px; background: var(--accent-soft); }
.product-icon svg { width: 46px; height: 46px; fill: none; stroke: var(--accent-dark); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.icon-02 { background: #eee8df; }
.icon-03 { background: #efeee7; }
.icon-04 { background: #f4eadf; }
.product-category { margin: 34px 0 0; color: var(--accent-dark); font-size: 11px; font-weight: 700; letter-spacing: .12em; }
.product-card h3 { margin: 9px 0 0; font-size: 26px; font-weight: 570; letter-spacing: -.035em; }
.product-copy { position: relative; z-index: 1; margin: 18px 0 0; color: var(--muted); font-size: 14px; line-height: 1.8; }
.product-tags { position: absolute; z-index: 1; right: 24px; bottom: 23px; left: 24px; display: flex; gap: 7px; }
.product-tags span { padding: 7px 10px; border-radius: 999px; color: #676a63; background: #f1f1eb; font-size: 11px; }
@media (max-width: 1050px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 767px) {
  .products-section { padding: 82px 0; }
  .products-heading { align-items: flex-start; flex-direction: column; }
  .product-grid { grid-template-columns: 1fr; margin-top: 45px; }
  .product-card { min-height: 420px; }
}
</style>
