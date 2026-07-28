<script setup lang="ts">
import { getLocaleContent, resolveSectionBySlug } from '~/utils/site-content'

const route = useRoute()
const localePath = useLocalePath()
const { locale, t } = useI18n()

const sectionKey = computed(() => resolveSectionBySlug(route.params.slug as string | string[]))
const content = computed(() => getLocaleContent(locale.value))
const section = computed(() => {
  if (!sectionKey.value) {
    return null
  }

  return content.value.sections[sectionKey.value]
})
</script>

<template>
  <SectionPage
    v-if="section"
    :eyebrow="section.eyebrow || ''"
    :title="section.title"
    :description="section.description"
    :highlights="section.highlights"
    :featured-points="section.featuredPoints"
  />

  <section v-else class="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
    <div class="glass-panel rounded-[2rem] p-12">
      <p class="text-sm uppercase tracking-[0.3em] text-cyan-200/70">404</p>
      <h1 class="section-title mt-4 text-4xl">{{ t('common.notFound') }}</h1>
      <NuxtLink
        :to="localePath('/')"
        class="mt-8 inline-flex rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950"
      >
        {{ t('common.backHome') }}
      </NuxtLink>
    </div>
  </section>
</template>
