<script setup lang="ts">
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')

useSeoMeta({
  title: () => isEnglish.value ? 'Chengdian Fuzhi Technology' : '上海成电福智科技有限公司',
  description: () => isEnglish.value
    ? 'Intelligent systems, embodied robotics pilot validation and industrial innovation services.'
    : '上海成电福智科技有限公司官方网站，聚焦智能系统、具身智能中试验证与产业创新服务。',
})
</script>

<template>
  <div>
    <HomeHeroCarousel />
    <HomePlatformSection />
    <HomeProductSection />
    <HomeCapabilitySection />
    <HomeTrustSection />
    <HomeLatestNewsSection />
    <HomeContactBanner />
  </div>
</template>
