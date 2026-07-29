<script setup lang="ts">
import type { SectionKey } from '~/utils/site-content'
import { getLocaleContent } from '~/utils/site-content'

const props = defineProps<{
  sectionKey: Exclude<SectionKey, 'about' | 'cases'>
}>()

const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const section = computed(() => getLocaleContent(locale.value).sections[props.sectionKey])

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
