<script setup lang="ts">
const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
</script>

<template>
  <section class="contact-banner">
    <div class="contact-pattern"><span v-for="i in 16" :key="i" /></div>
    <div class="site-container contact-content">
      <p>{{ isEnglish ? 'LET INNOVATION LAND' : '让创新落地' }}</p>
      <h2>{{ isEnglish ? 'Ready to turn a possibility into a real solution?' : '准备好，把一种可能变成真实方案了吗？' }}</h2>
      <NuxtLink :to="localePath('/contact')">{{ isEnglish ? 'Start a conversation' : '发起合作咨询' }}<span>↗</span></NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.contact-banner { position: relative; overflow: hidden; padding: 104px 0; color: white; background: var(--accent); }
.contact-pattern { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(8, 1fr); opacity: .2; transform: rotate(-8deg) scale(1.2); }
.contact-pattern span { border: 1px solid rgba(255,255,255,.35); }
.contact-content { position: relative; z-index: 1; display: grid; grid-template-columns: 160px 1fr auto; align-items: center; gap: 45px; }
.contact-content > p { font-size: 11px; font-weight: 700; letter-spacing: .2em; }
.contact-content h2 { max-width: 750px; margin: 0; font-size: clamp(34px, 4vw, 57px); font-weight: 500; letter-spacing: -.045em; line-height: 1.2; }
.contact-content a { display: flex; width: 150px; height: 150px; flex-direction: column; align-items: center; justify-content: center; gap: 16px; border: 1px solid rgba(255,255,255,.55); border-radius: 50%; font-size: 13px; font-weight: 700; text-align: center; transition: 200ms ease; }
.contact-content a span { font-size: 20px; }
.contact-content a:hover { color: var(--accent-dark); background: white; transform: rotate(-5deg); }
@media (max-width: 1050px) {
  .contact-content { grid-template-columns: 1fr auto; }
  .contact-content > p { grid-column: 1 / -1; }
}
@media (max-width: 767px) {
  .contact-banner { padding: 80px 0; }
  .contact-content { grid-template-columns: 1fr; gap: 28px; }
  .contact-content a { width: auto; height: auto; flex-direction: row; padding: 17px 20px; border-radius: 8px; }
  .contact-pattern { grid-template-columns: repeat(4,1fr); }
}
</style>
