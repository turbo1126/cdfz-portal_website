<script setup lang="ts">
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
</script>

<template>
  <section class="trust-section">
    <HomeTechPattern variant="trust" />
    <div class="site-container trust-grid">
      <div class="trust-intro"><p class="section-kicker">{{ isEnglish ? 'TRUSTED FOUNDATION' : '可信能力背书' }}</p><h2>{{ isEnglish ? 'Building long-term value through open collaboration.' : '以开放协同，构建长期产业价值。' }}</h2></div>
      <div class="trust-stat"><strong>2021</strong><span>{{ isEnglish ? 'Founded in Shanghai' : '成立于上海' }}</span></div>
      <div class="trust-stat"><strong>2</strong><span>{{ isEnglish ? 'Core innovation platforms' : '核心创新平台' }}</span></div>
      <div class="trust-stat"><strong>4</strong><span>{{ isEnglish ? 'Full-cycle service stages' : '全链路服务阶段' }}</span></div>
    </div>
    <p class="data-note">{{ isEnglish ? '* Publicity data is subject to final review before launch.' : '* 具体资质、知识产权与服务数据将在上线前完成最终审核后发布。' }}</p>
  </section>
</template>

<style scoped>
.trust-section { position: relative; overflow: hidden; padding: 72px 0 40px; border-bottom: 1px solid var(--line); background: #edede6; }
.trust-grid, .data-note { position: relative; z-index: 1; }
.trust-grid { display: grid; grid-template-columns: 1.35fr repeat(3, .65fr); gap: 24px; align-items: end; }
.trust-intro h2 { max-width: 490px; margin: 17px 0 0; font-size: 31px; font-weight: 520; letter-spacing: -.035em; line-height: 1.35; }
.trust-stat { display: flex; min-height: 135px; flex-direction: column; justify-content: flex-end; padding-left: 25px; border-left: 1px solid #cfcfc7; }
.trust-stat strong { font-size: 56px; font-weight: 450; letter-spacing: -.05em; }
.trust-stat span { margin-top: 9px; color: var(--muted); font-size: 12px; }
.data-note { width: min(100% - 48px, 1320px); margin: 42px auto 0; color: #93958e; font-size: 10px; text-align: right; }
@media (max-width: 1050px) {
  .trust-grid { grid-template-columns: repeat(3,1fr); }
  .trust-intro { grid-column: 1 / -1; margin-bottom: 25px; }
}
@media (max-width: 767px) {
  .trust-section { padding-top: 65px; }
  .trust-grid { grid-template-columns: 1fr; }
  .trust-stat { min-height: 110px; padding: 22px 0 0; border-top: 1px solid #cfcfc7; border-left: 0; }
  .data-note { width: min(100% - 32px, 1320px); text-align: left; line-height: 1.6; }
}
</style>
