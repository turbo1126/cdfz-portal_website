<script setup lang="ts">
import { getLocaleContent } from '~/utils/site-content'

type SlideItem = {
  index: string
  tag: string
  title: string
  description: string
  primaryCta: { label: string; to: string }
  secondaryCta: { label: string; to: string }
  visual: 'building' | 'products' | 'platform'
}

const localePath = useLocalePath()
const { locale } = useI18n()
const content = computed(() => getLocaleContent(locale.value))
const isEnglish = computed(() => locale.value === 'en-US')

const slides = computed<SlideItem[]>(() => [
  {
    index: '01',
    tag: isEnglish.value ? 'Intelligent systems · industrial innovation' : '智能系统 · 产业创新',
    title: content.value.hero.title,
    description: content.value.hero.description,
    primaryCta: { label: content.value.hero.primaryAction, to: '/contact' },
    secondaryCta: { label: content.value.hero.secondaryAction, to: '/platforms' },
    visual: 'building',
  },
  {
    index: '02',
    tag: isEnglish.value ? 'Governance AI product portfolio' : '基层治理智能产品矩阵',
    title: isEnglish.value ? 'Put trusted intelligence into every real workflow.' : '让可信智能，进入每一个真实业务流程。',
    description: isEnglish.value
      ? 'From legal retrieval and document generation to visual safety and automated inspection, our products support private deployment and scenario integration.'
      : '从法律检索、文书生成到视觉安防与自动巡检，以可私有化部署、可场景集成的产品能力服务基层治理。',
    primaryCta: { label: isEnglish.value ? 'Explore products' : '探索核心产品', to: '/products' },
    secondaryCta: { label: isEnglish.value ? 'Talk to an expert' : '咨询解决方案', to: '/contact' },
    visual: 'products',
  },
  {
    index: '03',
    tag: isEnglish.value ? 'Embodied robotics pilot validation' : '具身智能零部件中试验证',
    title: isEnglish.value ? 'Bridge the last mile from prototype to production.' : '跨越从研发样机到规模量产的最后一公里。',
    description: isEnglish.value
      ? 'A shared pilot platform for key robotics components, connecting prototype development, performance testing, process validation and scale-up support.'
      : '面向人形机器人关键零部件，打通研发样机、性能测试、工艺验证与量产支撑，建设开放共享的中试服务平台。',
    primaryCta: { label: isEnglish.value ? 'View the platform' : '了解中试平台', to: '/platforms' },
    secondaryCta: { label: isEnglish.value ? 'Cooperation inquiry' : '发起平台合作', to: '/contact' },
    visual: 'platform',
  },
])

const activeIndex = ref(0)
const paused = ref(false)
const activeSlide = computed(() => slides.value[activeIndex.value] ?? slides.value[0]!)

const goTo = (index: number) => {
  activeIndex.value = (index + slides.value.length) % slides.value.length
}

useIntervalFn(() => {
  if (!paused.value) goTo(activeIndex.value + 1)
}, 6200)
</script>

<template>
  <section class="hero" @mouseenter="paused = true" @mouseleave="paused = false">
    <TransitionGroup name="hero-fade">
      <div v-if="activeSlide.visual === 'building'" :key="'building'" class="hero-background hero-building">
        <img src="/brand/cdfz-building.png" alt="上海临港智能系统科创平台大楼" />
      </div>
      <div v-else :key="activeSlide.visual" class="hero-background hero-abstract" :class="`hero-${activeSlide.visual}`">
        <div class="grid-lines" />
        <div class="orbit orbit-one" />
        <div class="orbit orbit-two" />
        <div v-if="activeSlide.visual === 'products'" class="product-visual">
          <div class="visual-card visual-card-main"><span>AI</span><strong>政和智能体</strong><small>ZHENGHE AGENT</small></div>
          <div class="visual-card visual-card-a"><span>01</span><strong>调解通</strong></div>
          <div class="visual-card visual-card-b"><span>02</span><strong>视安盾</strong></div>
          <div class="visual-card visual-card-c"><span>03</span><strong>巡检</strong></div>
        </div>
        <div v-else class="platform-visual">
          <div class="platform-core"><img src="/brand/cdfz-logo.png" alt="" /><span>PILOT<br />PLATFORM</span></div>
          <div class="platform-node node-a">性能测试</div>
          <div class="platform-node node-b">可靠性验证</div>
          <div class="platform-node node-c">工艺优化</div>
          <div class="platform-node node-d">量产支撑</div>
        </div>
      </div>
    </TransitionGroup>

    <div class="hero-shade" />
    <div class="site-container hero-content">
      <div class="hero-copy">
        <div class="hero-tag"><span />{{ activeSlide.tag }}</div>
        <Transition name="copy-shift" mode="out-in">
          <div :key="activeSlide.index">
            <h1>{{ activeSlide.title }}</h1>
            <p>{{ activeSlide.description }}</p>
            <div class="hero-actions">
              <NuxtLink :to="localePath(activeSlide.primaryCta.to)" class="primary-action">
                {{ activeSlide.primaryCta.label }}<span>↗</span>
              </NuxtLink>
              <NuxtLink :to="localePath(activeSlide.secondaryCta.to)" class="secondary-action">
                {{ activeSlide.secondaryCta.label }}<span>→</span>
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </div>

      <div class="hero-controls">
        <div class="slide-count"><strong>{{ activeSlide.index }}</strong><span>/ 0{{ slides.length }}</span></div>
        <div class="progress-track">
          <button
            v-for="(slide, index) in slides"
            :key="slide.index"
            type="button"
            :class="{ active: index === activeIndex }"
            :aria-label="`${isEnglish ? 'Go to slide' : '切换至轮播'} ${index + 1}`"
            @click="goTo(index)"
          ><span /></button>
        </div>
        <div class="arrow-controls">
          <button type="button" aria-label="上一张" @click="goTo(activeIndex - 1)">←</button>
          <button type="button" aria-label="下一张" @click="goTo(activeIndex + 1)">→</button>
        </div>
      </div>
    </div>

    <a href="#platforms" class="scroll-cue"><span />{{ isEnglish ? 'SCROLL TO EXPLORE' : '向下探索' }}</a>
  </section>
</template>

<style scoped>
.hero { position: relative; min-height: 760px; height: min(900px, 100svh); overflow: hidden; color: white; background: #242722; }
.hero-background, .hero-shade { position: absolute; inset: 0; }
.hero-building img { width: 100%; height: 100%; object-fit: cover; object-position: center 48%; transform: scale(1.015); animation: heroZoom 10s ease-out both; }
.hero-shade { z-index: 2; background: linear-gradient(90deg, rgba(19,21,18,.86) 0%, rgba(19,21,18,.66) 48%, rgba(19,21,18,.18) 100%), linear-gradient(180deg, rgba(10,12,10,.36) 0%, transparent 28%, rgba(10,12,10,.34) 100%); }
.hero-abstract { overflow: hidden; background: radial-gradient(circle at 72% 45%, #5b5043 0, #282b27 39%, #171a17 75%); }
.hero-platform { background: radial-gradient(circle at 70% 46%, #514e43 0, #252a25 39%, #151815 76%); }
.grid-lines { position: absolute; inset: 0; opacity: .22; background-image: linear-gradient(rgba(255,255,255,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.13) 1px, transparent 1px); background-size: 72px 72px; mask-image: radial-gradient(circle at 72% 50%, black, transparent 64%); }
.orbit { position: absolute; right: 6%; top: 50%; border: 1px solid rgba(255,255,255,.22); border-radius: 50%; transform: translateY(-50%); }
.orbit-one { width: 610px; height: 610px; animation: rotate 22s linear infinite; }
.orbit-two { right: 14%; width: 390px; height: 390px; border-style: dashed; animation: rotateReverse 18s linear infinite; }
.product-visual, .platform-visual { position: absolute; right: max(4vw, 50px); top: 50%; width: 610px; height: 540px; transform: translateY(-45%); }
.visual-card { position: absolute; display: flex; flex-direction: column; justify-content: flex-end; padding: 25px; border: 1px solid rgba(255,255,255,.19); border-radius: 18px; background: rgba(255,255,255,.09); box-shadow: 0 28px 70px rgba(0,0,0,.22); backdrop-filter: blur(14px); }
.visual-card span { color: #f6a66d; font-size: 12px; letter-spacing: .18em; }
.visual-card strong { margin-top: 7px; font-size: 24px; }
.visual-card small { margin-top: 5px; font-size: 9px; letter-spacing: .2em; opacity: .55; }
.visual-card-main { inset: 70px 90px 110px 80px; justify-content: center; padding: 54px; border-color: rgba(246,166,109,.45); background: linear-gradient(145deg, rgba(232,117,36,.34), rgba(255,255,255,.08)); }
.visual-card-main span { font-size: 74px; font-weight: 200; line-height: 1; }
.visual-card-a { right: 0; top: 20px; width: 170px; height: 145px; }
.visual-card-b { right: 10px; bottom: 20px; width: 190px; height: 155px; }
.visual-card-c { left: 5px; bottom: 5px; width: 170px; height: 135px; }
.platform-core { position: absolute; left: 50%; top: 50%; display: grid; width: 210px; height: 210px; place-items: center; border: 1px solid rgba(246,166,109,.48); border-radius: 50%; background: rgba(255,255,255,.08); box-shadow: 0 0 90px rgba(232,117,36,.2); transform: translate(-50%,-50%); backdrop-filter: blur(12px); }
.platform-core img { width: 76px; }
.platform-core span { margin-top: -45px; color: rgba(255,255,255,.58); font-size: 9px; line-height: 1.5; letter-spacing: .2em; text-align: center; }
.platform-node { position: absolute; display: grid; width: 120px; height: 120px; place-items: center; border: 1px solid rgba(255,255,255,.2); border-radius: 50%; background: rgba(20,23,20,.5); font-size: 13px; backdrop-filter: blur(10px); }
.node-a { left: 30px; top: 80px; }.node-b { right: 25px; top: 65px; }.node-c { left: 50px; bottom: 45px; }.node-d { right: 45px; bottom: 35px; }
.hero-content { position: relative; z-index: 3; display: flex; height: 100%; align-items: center; justify-content: space-between; padding-top: 70px; }
.hero-copy { width: min(720px, 62%); }
.hero-tag { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; color: rgba(255,255,255,.76); font-size: 12px; font-weight: 650; letter-spacing: .18em; }
.hero-tag span { width: 32px; height: 2px; background: #f2924c; }
.hero-copy h1 { margin: 0; max-width: 760px; font-size: clamp(48px, 5.2vw, 76px); font-weight: 480; letter-spacing: -.055em; line-height: 1.08; text-wrap: balance; }
.hero-copy p { max-width: 650px; margin: 28px 0 0; color: rgba(255,255,255,.77); font-size: 16px; line-height: 1.9; }
.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 26px; margin-top: 38px; }
.primary-action { display: inline-flex; align-items: center; justify-content: space-between; min-width: 174px; padding: 16px 19px; border-radius: 8px; background: var(--accent); font-size: 14px; font-weight: 700; box-shadow: 0 16px 35px rgba(191,84,20,.26); transition: 200ms ease; }
.primary-action:hover { background: #ef8539; transform: translateY(-2px); }
.secondary-action { display: inline-flex; align-items: center; gap: 13px; padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,.34); font-size: 14px; font-weight: 650; }
.hero-controls { position: absolute; right: 0; bottom: 64px; left: 0; display: grid; grid-template-columns: 72px minmax(160px, 310px) auto; width: min(520px, 44%); align-items: center; gap: 22px; margin-left: auto; }
.slide-count { display: flex; align-items: baseline; gap: 5px; font-size: 11px; opacity: .7; }
.slide-count strong { color: white; font-size: 22px; font-weight: 500; opacity: 1; }
.progress-track { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
.progress-track button { height: 20px; padding: 9px 0; border: 0; background: transparent; cursor: pointer; }
.progress-track button span { display: block; height: 2px; background: rgba(255,255,255,.28); transition: background 180ms ease; }
.progress-track button.active span { background: var(--accent); }
.arrow-controls { display: flex; gap: 8px; }
.arrow-controls button { width: 42px; height: 42px; border: 1px solid rgba(255,255,255,.28); border-radius: 50%; color: white; background: rgba(255,255,255,.05); cursor: pointer; transition: 180ms ease; }
.arrow-controls button:hover { border-color: var(--accent); background: var(--accent); }
.scroll-cue { position: absolute; z-index: 4; bottom: 58px; left: 30px; display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,.58); font-size: 9px; font-weight: 700; letter-spacing: .18em; writing-mode: vertical-rl; }
.scroll-cue span { width: 1px; height: 42px; background: rgba(255,255,255,.42); }
.hero-fade-enter-active, .hero-fade-leave-active { transition: opacity 720ms ease, transform 1.2s ease; }
.hero-fade-enter-from { opacity: 0; transform: scale(1.025); }.hero-fade-leave-to { opacity: 0; }
.copy-shift-enter-active, .copy-shift-leave-active { transition: opacity 320ms ease, transform 420ms ease; }
.copy-shift-enter-from { opacity: 0; transform: translateY(18px); }.copy-shift-leave-to { opacity: 0; transform: translateY(-12px); }
@keyframes heroZoom { from { transform: scale(1.06); } to { transform: scale(1.015); } }
@keyframes rotate { to { transform: translateY(-50%) rotate(360deg); } }
@keyframes rotateReverse { to { transform: translateY(-50%) rotate(-360deg); } }
@media (max-width: 1023px) {
  .hero { min-height: 720px; height: 92svh; }
  .hero-content { padding-top: 74px; }
  .hero-copy { width: min(740px, 86%); }
  .hero-copy h1 { font-size: clamp(44px, 7vw, 66px); }
  .product-visual, .platform-visual { right: -180px; opacity: .52; transform: translateY(-42%) scale(.85); }
  .hero-shade { background: linear-gradient(90deg, rgba(19,21,18,.9), rgba(19,21,18,.52) 78%, rgba(19,21,18,.35)); }
  .hero-controls { bottom: 40px; width: min(470px, 70%); }
  .scroll-cue { display: none; }
}
@media (max-width: 767px) {
  .hero { min-height: 700px; height: 100svh; }
  .hero-building img { object-position: 56% center; }
  .hero-shade { background: linear-gradient(90deg, rgba(17,19,17,.9), rgba(17,19,17,.58)), linear-gradient(180deg, rgba(0,0,0,.25), transparent 35%, rgba(0,0,0,.45)); }
  .hero-content { align-items: flex-start; padding-top: 150px; }
  .hero-copy { width: 100%; }
  .hero-tag { margin-bottom: 20px; font-size: 10px; letter-spacing: .12em; }
  .hero-copy h1 { font-size: clamp(38px, 11.5vw, 52px); line-height: 1.1; }
  .hero-copy p { margin-top: 21px; font-size: 14px; line-height: 1.75; }
  .hero-actions { gap: 18px; margin-top: 27px; }
  .primary-action { min-width: 156px; padding: 14px 16px; }
  .secondary-action { font-size: 13px; }
  .product-visual, .platform-visual { right: -275px; top: 58%; opacity: .32; transform: translateY(-50%) scale(.65); }
  .hero-controls { right: 16px; bottom: 24px; left: 16px; grid-template-columns: 55px 1fr; width: auto; gap: 12px; }
  .arrow-controls { display: none; }
}
</style>
