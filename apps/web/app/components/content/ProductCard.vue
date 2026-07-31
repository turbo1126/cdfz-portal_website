<script setup lang="ts">
import type { CoreProduct } from '@cdfz/contracts'

const props = defineProps<{
  product: CoreProduct
  index: number
}>()

const localePath = useLocalePath()
const number = computed(() => String(props.index + 1).padStart(2, '0'))
const iconVariant = computed(() => String((props.index % 4) + 1).padStart(2, '0'))
const visibleTags = computed(() => (props.product.tags || []).slice(0, 3))
</script>

<template>
  <NuxtLink :to="localePath(`/products/${product.slug}`)" class="product-card">
    <div class="product-top"><span>{{ number }}</span><b>↗</b></div>
    <div class="product-icon" :class="`icon-${iconVariant}`">
      <img v-if="product.icon?.url" :src="product.icon.url" :alt="product.icon.alternativeText || product.title">
      <svg v-else-if="iconVariant === '01'" viewBox="0 0 64 64"><path d="M16 12h32v35H31L20 55v-8h-4z"/><path d="M24 23h16M24 31h12M24 39h8"/></svg>
      <svg v-else-if="iconVariant === '02'" viewBox="0 0 64 64"><path d="M5 32s10-16 27-16 27 16 27 16-10 16-27 16S5 32 5 32Z"/><circle cx="32" cy="32" r="8"/></svg>
      <svg v-else-if="iconVariant === '03'" viewBox="0 0 64 64"><path d="M14 39h36l-4-15H18z"/><circle cx="22" cy="45" r="5"/><circle cx="42" cy="45" r="5"/><path d="M25 24v-7h14v7M32 17V9"/></svg>
      <svg v-else viewBox="0 0 64 64"><path d="m8 31 24-19 24 19v23H8z"/><path d="M24 54V38h16v16M18 28h28"/></svg>
    </div>
    <p class="product-category">{{ product.category }}</p>
    <h3>{{ product.title }}</h3>
    <p class="product-copy">{{ product.summary }}</p>
    <div v-if="visibleTags.length" class="product-tags"><span v-for="tag in visibleTags" :key="tag">{{ tag }}</span></div>
  </NuxtLink>
</template>

<style scoped>
.product-card { display: flex; position: relative; min-height: 465px; padding: 24px; flex-direction: column; overflow: hidden; border: 1px solid var(--line); border-radius: 15px; background: #fafaf7; transition: 240ms ease; }
.product-card::after { position: absolute; right: -35px; bottom: -60px; width: 170px; height: 170px; border-radius: 50%; content: ''; background: var(--accent-soft); opacity: 0; transition: 300ms ease; }
.product-card:hover { border-color: #cddcf1; background: white; box-shadow: 0 20px 52px rgba(35,36,32,.08); transform: translateY(-5px); }
.product-card:hover::after { opacity: .85; transform: scale(1.4); }
.product-top { display: flex; align-items: center; justify-content: space-between; color: #93958f; font-size: 11px; letter-spacing: .12em; }
.product-top b { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid var(--line); border-radius: 50%; color: var(--ink); font-size: 13px; font-weight: 400; transition: 180ms ease; }
.product-card:hover .product-top b { color: white; border-color: var(--accent); background: var(--accent); }
.product-icon { display: grid; width: 86px; height: 86px; margin-top: 45px; overflow: hidden; place-items: center; border-radius: 23px; background: var(--accent-soft); }
.product-icon img { width: 58px; height: 58px; object-fit: contain; }
.product-icon svg { width: 46px; height: 46px; fill: none; stroke: var(--accent-dark); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.icon-02 { background: #eaf0ef; }.icon-03 { background: #efeee7; }.icon-04 { background: #f3eee8; }
.product-category { margin: 34px 0 0; color: var(--accent-dark); font-size: 11px; font-weight: 700; letter-spacing: .12em; }
.product-card h3 { margin: 9px 0 0; overflow-wrap: anywhere; font-size: 26px; font-weight: 570; letter-spacing: -.035em; }
.product-copy { display: -webkit-box; position: relative; z-index: 1; margin: 18px 0 0; overflow: hidden; color: var(--muted); font-size: 14px; line-height: 1.8; -webkit-box-orient: vertical; -webkit-line-clamp: 4; }
.product-tags { display: flex; position: relative; z-index: 1; flex-wrap: wrap; gap: 7px; margin-top: auto; padding-top: 24px; }
.product-tags span { padding: 7px 10px; border-radius: 999px; color: #676a63; background: #f1f1eb; font-size: 11px; }
@media (max-width: 767px) { .product-card { min-height: 420px; } }
</style>
