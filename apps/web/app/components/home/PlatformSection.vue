<script setup lang="ts">
import type { InnovationPlatform } from '@cdfz/contracts'
import { mergePlatformsWithFallbacks } from '~/utils/platform-content'

const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const { data: cmsPlatforms } = await useAsyncData<InnovationPlatform[]>(
  () => `home-platforms-${locale.value}`,
  () => $fetch<InnovationPlatform[]>('/api/content/platforms', { query: { locale: locale.value } }),
  { watch: [locale], default: () => [] },
)
const platforms = computed(() => mergePlatformsWithFallbacks(cmsPlatforms.value, locale.value)
  .filter(platform => platform.featured !== false))
</script>

<template>
  <section id="platforms" class="platform-section">
    <div class="site-container">
      <div class="intro-grid">
        <div>
          <p class="section-kicker">{{ isEnglish ? 'TWO INNOVATION ENGINES' : '双平台驱动' }}</p>
          <h2 class="section-heading">{{ isEnglish ? 'Innovation platforms built for industrial outcomes.' : '面向产业落地，建设两大创新能力支点。' }}</h2>
        </div>
        <div>
          <p class="section-description">{{ isEnglish ? 'We connect intelligent systems innovation with embodied robotics pilot validation, forming a service base that spans technology, engineering and industry.' : '以智能系统科创平台连接前沿技术与应用场景，以具身智能零部件中试平台打通工程验证与量产导入，形成跨越技术、工程与产业的公共服务底座。' }}</p>
          <NuxtLink :to="localePath('/platforms')" class="arrow-link platform-more">{{ isEnglish ? 'Explore both platforms' : '查看双平台详情' }}<span>→</span></NuxtLink>
        </div>
      </div>

      <div class="platform-grid">
        <ContentPlatformCard v-for="(platform, index) in platforms" :key="platform.slug" :platform="platform" :index="index" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.platform-section { padding: 88px 0 94px; }
.intro-grid { display: grid; grid-template-columns: 1.08fr .92fr; gap: 64px; align-items: end; }
.platform-more { margin-top: 22px; }
.platform-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 48px; }
@media (max-width: 767px) {
  .platform-section { padding: 66px 0 72px; }
  .intro-grid, .platform-grid { grid-template-columns: 1fr; gap: 28px; }
  .platform-grid { margin-top: 36px; }
}
</style>
