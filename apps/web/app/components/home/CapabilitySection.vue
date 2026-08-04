<script setup lang="ts">
import { getLocaleContent } from '~/utils/site-content'

const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const capabilitySteps = computed(() => getLocaleContent(locale.value).home.capabilitySteps)
</script>

<template>
  <section id="capability" class="capability-section">
    <HomeTechPattern variant="capability" />
    <div class="site-container capability-layout">
      <div class="capability-copy">
        <p class="section-kicker">{{ isEnglish ? 'FULL-CYCLE CAPABILITY' : '全链路能力闭环' }}</p>
        <h2 class="section-heading">{{ isEnglish ? 'From an idea to a scalable industry.' : '从一项创新，走向一个可规模化的产业。' }}</h2>
        <p class="section-description">{{ isEnglish ? 'Combine R&D, pilot testing, incubation and industrialization into one continuous path, reducing the distance between frontier technology and market value.' : '将研发、中试、孵化与产业化组织为一条连续路径，缩短前沿技术走向工程产品和市场价值的距离。' }}</p>
        <NuxtLink :to="localePath('/services')" class="capability-button">{{ isEnglish ? 'View industrial services' : '了解产业服务' }}<span>↗</span></NuxtLink>
      </div>
      <div class="capability-flow">
        <article v-for="step in capabilitySteps" :key="step.no" class="flow-step">
          <div class="flow-number">{{ step.no }}</div>
          <div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></div>
          <span class="flow-arrow">→</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.capability-section {
  position: relative;
  overflow: hidden;
  padding: 120px 0;
  color: white;
  background:
    linear-gradient(90deg, rgba(7, 14, 12, .82), rgba(7, 14, 12, .72)),
    url('http://localhost:1337/uploads/_3156d8b6d4.jpg') center / cover no-repeat;
}
.capability-layout { display: grid; grid-template-columns: .92fr 1.08fr; gap: 100px; align-items: center; }
.capability-layout { position: relative; z-index: 1; }
.capability-section .section-heading { max-width: 570px; }
.capability-section .section-description { color: rgba(255,255,255,.58); }
.capability-button { display: inline-flex; align-items: center; gap: 45px; margin-top: 38px; padding: 15px 18px; border: 1px solid rgba(255,255,255,.17); border-radius: 7px; font-size: 13px; font-weight: 700; transition: 180ms ease; }
.capability-button:hover { border-color: var(--accent); background: var(--accent); }
.capability-flow { position: relative; }
.capability-flow::before { position: absolute; top: 42px; bottom: 42px; left: 27px; width: 1px; content: ''; background: linear-gradient(var(--accent), rgba(255,255,255,.12)); }
.flow-step { position: relative; display: grid; grid-template-columns: 56px 1fr auto; align-items: center; gap: 22px; min-height: 118px; padding: 19px 18px 19px 0; border-bottom: 1px solid rgba(255,255,255,.12); }
.flow-number { z-index: 1; display: grid; width: 56px; height: 56px; place-items: center; border: 1px solid rgba(255,255,255,.25); border-radius: 50%; color: #78adff; background: var(--night); font-size: 11px; }
.flow-step h3 { margin: 0; font-size: 26px; font-weight: 520; }
.flow-step p { margin: 8px 0 0; color: rgba(255,255,255,.5); font-size: 13px; }
.flow-arrow { color: rgba(255,255,255,.35); transition: 180ms ease; }
.flow-step:hover .flow-arrow { color: var(--accent); transform: translateX(5px); }
@media (max-width: 1050px) { .capability-layout { gap: 55px; } }
@media (max-width: 767px) {
  .capability-section { padding: 84px 0; }
  .capability-layout { grid-template-columns: 1fr; gap: 55px; }
  .flow-step { gap: 15px; }
  .flow-step h3 { font-size: 22px; }
  .flow-arrow { display: none; }
}
</style>
