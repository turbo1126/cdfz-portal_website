<script setup lang="ts">
import type { InnovationPlatform } from '@cdfz/contracts'

const props = defineProps<{
  platform: InnovationPlatform
  index: number
}>()

const localePath = useLocalePath()
const number = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<template>
  <NuxtLink :to="localePath(`/platforms/${platform.slug}`)" class="platform-card">
    <div class="platform-photo">
      <img v-if="platform.cover?.url" :src="platform.cover.url" :alt="platform.cover.alternativeText || platform.title">
      <div v-else class="platform-photo-placeholder">CDFZ</div>
      <div class="photo-index">{{ number }}</div>
      <div class="photo-arrow">↗</div>
    </div>
    <div class="platform-body">
      <p>{{ platform.shortName || platform.eyebrow || 'INNOVATION PLATFORM' }}</p>
      <h3>{{ platform.title }}</h3>
      <div v-if="platform.tags?.length" class="platform-meta">
        <span v-for="tag in platform.tags" :key="tag">{{ tag }}</span>
      </div>
      <p class="platform-description">{{ platform.summary }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.platform-card { display: flex; height: 100%; flex-direction: column; overflow: hidden; border: 1px solid var(--line); border-radius: 16px; background: #fff; transition: 260ms ease; }
.platform-card:hover { box-shadow: 0 25px 65px rgba(30,32,28,.11); transform: translateY(-5px); }
.platform-photo { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: linear-gradient(135deg,#182533,#275c9e); }
.platform-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform 650ms ease; }
.platform-photo-placeholder { display: grid; width: 100%; height: 100%; place-items: center; color: rgba(255,255,255,.5); font-size: 44px; font-weight: 700; letter-spacing: .18em; }
.platform-card:hover .platform-photo img { transform: scale(1.04); }
.platform-photo::after { position: absolute; inset: 0; content: ''; background: linear-gradient(180deg,transparent 45%,rgba(15,17,15,.68)); }
.photo-index { position: absolute; z-index: 2; bottom: 18px; left: 22px; color: white; font-size: 11px; letter-spacing: .15em; }
.photo-arrow { display: grid; position: absolute; z-index: 2; top: 18px; right: 18px; width: 40px; height: 40px; place-items: center; border-radius: 50%; color: white; background: rgba(255,255,255,.14); backdrop-filter: blur(9px); transition: 180ms ease; }
.platform-card:hover .photo-arrow { background: var(--accent); }
.platform-body { display: flex; flex: 1; flex-direction: column; padding: 24px 26px 26px; }
.platform-body > p:first-child { margin: 0; color: var(--accent-dark); font-size: 11px; font-weight: 700; letter-spacing: .16em; }
.platform-body h3 { margin: 10px 0 0; overflow-wrap: anywhere; font-size: 24px; font-weight: 560; letter-spacing: -.03em; line-height: 1.32; }
.platform-meta { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 16px; }
.platform-meta span { padding: 6px 9px; border-radius: 999px; color: #676a63; background: #f1f1eb; font-size: 10px; }
.platform-description { margin: 17px 0 0; padding-top: 16px; border-top: 1px solid var(--line); color: var(--muted); font-size: 13px; line-height: 1.68; }
@media (max-width: 767px) { .platform-photo { aspect-ratio: 16 / 10; }.platform-body { padding: 22px 21px 24px; }.platform-body h3 { font-size: 21px; }.platform-description { margin-top: 15px; padding-top: 14px; } }
</style>
