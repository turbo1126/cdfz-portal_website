<script setup lang="ts">
import { getLocaleContent } from '~/utils/site-content'

const localePath = useLocalePath()
const { locale } = useI18n()
const content = computed(() => getLocaleContent(locale.value).hero)
</script>

<template>
  <section class="mx-auto grid max-w-7xl gap-8 px-6 pb-20 pt-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:pt-20">
    <div>
      <div class="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs tracking-[0.28em] text-cyan-100">
        {{ content.badge }}
      </div>
      <p class="mt-8 text-sm uppercase tracking-[0.34em] text-cyan-200/70">
        {{ content.eyebrow }}
      </p>
      <h1 class="section-title mt-6 max-w-4xl text-4xl leading-tight text-white md:text-6xl">
        {{ content.title }}
      </h1>
      <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
        {{ content.description }}
      </p>
      <div class="mt-10 flex flex-wrap gap-4">
        <NuxtLink
          :to="localePath('/contact')"
          class="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          {{ content.primaryAction }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/platforms')"
          class="rounded-full border border-cyan-200/30 px-6 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-white/5"
        >
          {{ content.secondaryAction }}
        </NuxtLink>
      </div>
    </div>

    <div class="glass-panel relative overflow-hidden rounded-[2rem] p-5">
      <div class="absolute inset-0 bg-gradient-to-br from-cyan-300/12 via-transparent to-blue-500/20" />
      <img
        src="/brand/cdfz-building.png"
        alt="上海成电福智大楼"
        class="relative h-full min-h-[320px] w-full rounded-[1.5rem] object-cover object-center"
      />
    </div>
  </section>
</template>
