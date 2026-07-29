<script setup lang="ts">
import type { AboutPage } from '@cdfz/contracts'
import { getLocaleContent } from '~/utils/site-content'

const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const fallback = computed(() => getLocaleContent(locale.value).sections.about)

const { data: aboutPage } = await useAsyncData<AboutPage>(
  () => `about-page-${locale.value}`,
  () => $fetch<AboutPage>('/api/content/about', { query: { locale: locale.value } }),
  {
    default: () => ({}),
    watch: [locale],
  },
)

const section = computed(() => {
  const cmsHighlights = aboutPage.value?.highlights
    ?.map(item => item.text?.trim())
    .filter((item): item is string => Boolean(item))
  const cmsFeaturedPoints = aboutPage.value?.featuredPoints
    ?.filter(item => item.title?.trim())

  return {
    eyebrow: aboutPage.value?.eyebrow?.trim() || fallback.value.eyebrow,
    title: aboutPage.value?.title?.trim() || fallback.value.title,
    description: aboutPage.value?.description?.trim() || fallback.value.description,
    highlights: cmsHighlights?.length ? cmsHighlights : fallback.value.highlights,
    featuredPoints: cmsFeaturedPoints?.length ? cmsFeaturedPoints : fallback.value.featuredPoints,
  }
})

useSeoMeta({
  title: () => `${section.value.title} | ${isEnglish.value ? 'Chengdian Fuzhi' : '上海成电福智'}`,
  description: () => section.value.description,
})
</script>

<template>
  <ContentSectionPage
    :eyebrow="section.eyebrow || ''"
    :title="section.title"
    :description="section.description"
    :highlights="section.highlights"
    :featured-points="section.featuredPoints"
  />
</template>
