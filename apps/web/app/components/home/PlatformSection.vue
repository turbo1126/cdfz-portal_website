<script setup lang="ts">
import { getLocaleContent } from '~/utils/site-content'

const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const platforms = computed(() => getLocaleContent(locale.value).home.platforms)
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
        <NuxtLink v-for="platform in platforms" :key="platform.no" :to="localePath('/platforms')" class="platform-card">
          <div class="platform-photo">
            <img
              :src="platform.no === '01' ? '/images/platforms/lingang-building.png' : '/images/platforms/pilot-platform.jpg'"
              :alt="platform.title"
            >
            <div class="photo-index">{{ platform.no }}</div>
            <div class="photo-arrow">↗</div>
          </div>
          <div class="platform-body">
            <p>{{ platform.short }}</p>
            <h3>{{ platform.title }}</h3>
            <div class="platform-meta"><span v-for="tag in platform.tags" :key="tag">{{ tag }}</span></div>
            <p class="platform-description">{{ platform.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.platform-section { padding: 118px 0; }
.intro-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 80px; align-items: end; }
.platform-more { margin-top: 28px; }
.platform-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; margin-top: 72px; }
.platform-card { overflow: hidden; border: 1px solid var(--line); border-radius: 18px; background: #fff; transition: 260ms ease; }
.platform-card:hover { box-shadow: 0 25px 65px rgba(30,32,28,.11); transform: translateY(-5px); }
.platform-photo { position: relative; height: 360px; overflow: hidden; background: #2b2e29; }
.platform-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform 650ms ease; }
.platform-card:hover .platform-photo img { transform: scale(1.04); }
.platform-photo::after { position: absolute; inset: 0; content: ''; background: linear-gradient(180deg, transparent 45%, rgba(15,17,15,.68)); }
.photo-index { position: absolute; z-index: 2; left: 26px; bottom: 22px; color: white; font-size: 12px; letter-spacing: .15em; }
.photo-arrow { position: absolute; z-index: 2; right: 22px; top: 22px; display: grid; width: 46px; height: 46px; place-items: center; border-radius: 50%; color: white; background: rgba(255,255,255,.14); backdrop-filter: blur(9px); transition: 180ms ease; }
.platform-card:hover .photo-arrow { background: var(--accent); }
.platform-body { padding: 30px 32px 34px; }
.platform-body > p:first-child { margin: 0; color: var(--accent-dark); font-size: 11px; font-weight: 700; letter-spacing: .16em; }
.platform-body h3 { min-height: 64px; margin: 13px 0 0; font-size: 25px; font-weight: 560; letter-spacing: -.03em; line-height: 1.3; }
.platform-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.platform-meta span { padding: 7px 10px; border-radius: 999px; color: #676a63; background: #f1f1eb; font-size: 11px; }
.platform-description { margin: 22px 0 0; padding-top: 21px; border-top: 1px solid var(--line); color: var(--muted); font-size: 14px; line-height: 1.75; }
@media (max-width: 767px) {
  .platform-section { padding: 82px 0; }
  .intro-grid, .platform-grid { grid-template-columns: 1fr; gap: 38px; }
  .platform-grid { margin-top: 48px; }
  .platform-photo { height: 260px; }
  .platform-body { padding: 25px 23px 28px; }
  .platform-body h3 { min-height: 0; font-size: 22px; }
}
</style>
