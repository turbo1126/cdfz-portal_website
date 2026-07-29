<script setup lang="ts">
import type { AboutFeaturePoint } from '@cdfz/contracts'

const props = defineProps<{
  eyebrow: string
  title: string
  description: string
  highlights: string[]
  featuredPoints: Array<string | AboutFeaturePoint>
}>()

const route = useRoute()
const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const isAbout = computed(() => route.path.endsWith('/about'))
const isContact = computed(() => route.path.endsWith('/contact'))
const submitted = ref(false)

const toParagraphs = (value?: string | null) => (value || '')
  .replace(/\\n/g, '\n')
  .split(/\r?\n/)
  .map(item => item.trim())
  .filter(Boolean)

const descriptionParagraphs = computed(() => toParagraphs(props.description))
const heroDescriptionParagraphs = computed(() => isAbout.value
  ? descriptionParagraphs.value.slice(0, 1)
  : descriptionParagraphs.value)
const aboutBodyParagraphs = computed(() => isAbout.value
  ? descriptionParagraphs.value.slice(1)
  : [])

const pointTitle = (point: string | AboutFeaturePoint) => typeof point === 'string' ? point : point.title
const pointDescription = (point: string | AboutFeaturePoint, index = 0) => {
  if (typeof point !== 'string' && point.description?.trim()) {
    return point.description
  }

  if (isAbout.value) {
    const descriptions = isEnglish.value
      ? [
          'A new R&D institution jointly established to advance frontier AI research and technology transfer.',
          'A platform connecting technical validation, real-world scenarios and ecosystem collaboration.',
          'A continuous pathway linking research, pilot validation, incubation and scaled application.',
        ]
      : [
          '多方联合设立的新型研发机构，面向人工智能前沿方向展开关键技术攻关与成果转化。',
          '聚合技术验证、场景开放与生态协同能力，推动创新成果从实验室走向产业现场。',
          '联动高校、国资和产业伙伴，贯通研发、中试、孵化与规模化应用链路。',
        ]

    return descriptions[index] || descriptions[descriptions.length - 1]
  }

  return isEnglish.value
    ? 'We focus on clear value, practical pathways and sustainable collaboration for every capability.'
    : '围绕核心价值、落地路径与合作方式，形成清晰、可持续的能力表达。'
}

const pointParagraphs = (point: string | AboutFeaturePoint, index = 0) => toParagraphs(pointDescription(point, index))
</script>

<template>
  <div class="section-page">
    <section class="page-hero" :class="{ 'about-hero': isAbout }">
      <div class="hero-grid" />
      <div v-if="isAbout" class="about-orbit about-orbit-one" />
      <div v-if="isAbout" class="about-orbit about-orbit-two" />
      <div class="site-container page-hero-inner" :class="{ 'about-hero-inner': isAbout }">
        <div class="hero-copy">
          <div class="page-breadcrumb"><NuxtLink :to="localePath('/')">{{ isEnglish ? 'Home' : '首页' }}</NuxtLink><span>/</span><b>{{ eyebrow }}</b></div>
          <p class="section-kicker">{{ eyebrow }}</p>
          <h1>{{ title }}</h1>
          <div class="page-description">
            <p v-for="paragraph in heroDescriptionParagraphs" :key="paragraph">{{ paragraph }}</p>
          </div>
        </div>
        <div v-if="isAbout" class="about-hero-mark" aria-hidden="true">
          <span>{{ isEnglish ? 'FOUNDED' : '成立于' }}</span>
          <strong>2021</strong>
          <i />
          <p>{{ isEnglish ? 'Shanghai · China' : '中国 · 上海' }}</p>
        </div>
      </div>
    </section>

    <section v-if="isAbout" class="about-content">
      <div class="site-container about-layout">
        <aside class="about-index">
          <p>{{ isEnglish ? 'OUR POSITIONING' : '我们的定位' }}</p>
          <div class="about-index-list">
            <span v-for="(item, index) in highlights" :key="item">
              <b>{{ String(index + 1).padStart(2, '0') }}</b>
              {{ item }}
            </span>
          </div>
        </aside>

        <div class="about-story">
          <header class="about-story-heading">
            <p class="section-kicker">{{ isEnglish ? 'WHO WE ARE' : '我们是谁' }}</p>
            <h2>{{ isEnglish ? 'Turning frontier intelligence into enduring industrial value.' : '让前沿智能，沉淀为可持续的产业价值。' }}</h2>
          </header>

          <div v-if="aboutBodyParagraphs.length" class="about-narrative">
            <p v-for="(paragraph, index) in aboutBodyParagraphs" :key="paragraph">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              {{ paragraph }}
            </p>
          </div>

          <div class="about-point-list">
            <article v-for="(point, index) in featuredPoints" :key="pointTitle(point)">
              <div class="about-point-number">{{ String(index + 1).padStart(2, '0') }}</div>
              <div class="about-point-copy">
                <h3>{{ pointTitle(point) }}</h3>
                <div class="about-point-description">
                  <p v-for="paragraph in pointParagraphs(point, index)" :key="paragraph">{{ paragraph }}</p>
                </div>
              </div>
              <span class="about-point-arrow" aria-hidden="true">↗</span>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="page-content">
      <div class="site-container content-layout">
        <aside>
          <p>{{ isEnglish ? 'CORE TOPICS' : '核心内容' }}</p>
          <span v-for="(item, index) in highlights" :key="item"><b>0{{ index + 1 }}</b>{{ item }}</span>
        </aside>
        <div class="point-grid">
          <article v-for="(point, index) in featuredPoints" :key="pointTitle(point)">
            <span>0{{ index + 1 }}</span><h2>{{ pointTitle(point) }}</h2><div class="point-description"><p v-for="paragraph in pointParagraphs(point, index)" :key="paragraph">{{ paragraph }}</p></div>
          </article>
        </div>
      </div>
    </section>

    <section v-if="isContact" class="inquiry-section">
      <div class="site-container inquiry-layout">
        <div><p class="section-kicker">{{ isEnglish ? 'COOPERATION INQUIRY' : '合作咨询' }}</p><h2>{{ isEnglish ? 'Tell us about your needs.' : '告诉我们，您希望解决什么问题。' }}</h2><p>{{ isEnglish ? 'Phone or email is required. The form will connect to the CMS lead system before launch.' : '电话或邮箱至少填写一项。表单将在上线前接入 CMS 线索系统。' }}</p></div>
        <form v-if="!submitted" class="inquiry-form" @submit.prevent="submitted = true">
          <label><span>{{ isEnglish ? 'Name' : '姓名' }} *</span><input required :placeholder="isEnglish ? 'Your name' : '请输入姓名'" /></label>
          <label><span>{{ isEnglish ? 'Organization' : '机构 / 公司' }}</span><input :placeholder="isEnglish ? 'Organization name' : '请输入机构或公司名称'" /></label>
          <label><span>{{ isEnglish ? 'Phone' : '联系电话' }}</span><input type="tel" :placeholder="isEnglish ? 'Phone number' : '请输入联系电话'" /></label>
          <label><span>{{ isEnglish ? 'Email' : '电子邮箱' }}</span><input type="email" placeholder="name@example.com" /></label>
          <label class="wide"><span>{{ isEnglish ? 'Cooperation intention' : '合作意向' }}</span><select><option>{{ isEnglish ? 'Product demo' : '产品演示' }}</option><option>{{ isEnglish ? 'Platform cooperation' : '平台合作' }}</option><option>{{ isEnglish ? 'Industrial services' : '产业服务' }}</option><option>{{ isEnglish ? 'Other' : '其他合作' }}</option></select></label>
          <label class="wide"><span>{{ isEnglish ? 'Message' : '需求留言' }}</span><textarea rows="4" :placeholder="isEnglish ? 'Briefly describe your needs' : '请简要描述您的需求与应用场景'" /></label>
          <label class="privacy wide"><input required type="checkbox" /><span>{{ isEnglish ? 'I agree to the privacy policy and the processing of inquiry information.' : '我已阅读并同意隐私政策及咨询信息处理说明。' }}</span></label>
          <button type="submit">{{ isEnglish ? 'Submit inquiry' : '提交合作咨询' }}<span>↗</span></button>
        </form>
        <div v-else class="success-message"><strong>✓</strong><h3>{{ isEnglish ? 'Thank you for your inquiry.' : '感谢您的咨询。' }}</h3><p>{{ isEnglish ? 'The form is currently a front-end demonstration. CMS submission will be enabled before launch.' : '当前为前端交互演示，上线前将接入 CMS 完成真实提交与通知。' }}</p></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.section-page { padding-top: 86px; }
.page-hero { position: relative; overflow: hidden; padding: 98px 0 105px; color: white; background: #1a1d19; }.hero-grid { position: absolute; inset: 0; opacity: .2; background-image: linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px); background-size: 70px 70px; mask-image: linear-gradient(90deg,black,transparent 75%); }.page-hero-inner { position: relative; }.hero-copy { min-width: 0; }.page-breadcrumb { display: flex; gap: 10px; margin-bottom: 55px; color: rgba(255,255,255,.4); font-size: 11px; }.page-breadcrumb b { color: rgba(255,255,255,.7); font-weight: 500; }.page-hero h1 { max-width: 950px; margin: 23px 0 0; overflow-wrap: anywhere; white-space: pre-line; font-size: clamp(42px,5.3vw,72px); font-weight: 480; letter-spacing: -.055em; line-height: 1.13; }.page-description { max-width: 760px; margin: 30px 0 0; color: rgba(255,255,255,.62); font-size: 16px; line-height: 1.9; }.page-description p { margin: 0; }.page-description p + p { margin-top: 12px; }
.about-hero { min-height: 650px; padding: 92px 0 112px; background: radial-gradient(circle at 83% 26%,rgba(46,126,239,.3),transparent 25%),linear-gradient(135deg,#0f1620 0%,#131b23 55%,#0d1117 100%); }.about-hero .hero-grid { opacity: .16; background-size: 56px 56px; mask-image: linear-gradient(90deg,black 0%,rgba(0,0,0,.75) 55%,transparent 100%); }.about-hero-inner { display: grid; grid-template-columns: minmax(0,1fr) 270px; align-items: end; gap: 80px; }.about-hero .page-breadcrumb { margin-bottom: 72px; }.about-hero h1 { max-width: 900px; font-size: clamp(46px,5vw,70px); }.about-hero .page-description { max-width: 780px; color: rgba(255,255,255,.7); }.about-hero-mark { display: flex; position: relative; width: 270px; height: 270px; flex-direction: column; justify-content: flex-end; padding: 34px; overflow: hidden; border: 1px solid rgba(255,255,255,.2); border-radius: 50%; background: rgba(255,255,255,.035); box-shadow: inset 0 0 50px rgba(255,255,255,.03); backdrop-filter: blur(8px); }.about-hero-mark::before { position: absolute; top: 26px; right: 32px; width: 9px; height: 9px; border-radius: 50%; content: ''; background: #5b9cff; box-shadow: 0 0 0 8px rgba(91,156,255,.12); }.about-hero-mark span { color: rgba(255,255,255,.45); font-size: 10px; font-style: normal; font-weight: 700; letter-spacing: .2em; }.about-hero-mark strong { margin-top: 4px; font-size: 58px; font-weight: 300; letter-spacing: -.06em; line-height: 1; }.about-hero-mark i { width: 100%; height: 1px; margin: 20px 0 15px; background: rgba(255,255,255,.17); }.about-hero-mark p { margin: 0; color: rgba(255,255,255,.62); font-size: 11px; letter-spacing: .12em; }.about-orbit { position: absolute; border: 1px solid rgba(91,156,255,.15); border-radius: 50%; pointer-events: none; }.about-orbit-one { top: -330px; right: -190px; width: 760px; height: 760px; }.about-orbit-two { top: -230px; right: -90px; width: 560px; height: 560px; }
.about-content { position: relative; padding: 118px 0 140px; background: linear-gradient(180deg,#f6f6f1 0%,#fff 100%); }.about-content::before { position: absolute; top: 0; right: 0; left: 0; height: 1px; content: ''; background: linear-gradient(90deg,transparent,var(--line),transparent); }.about-layout { display: grid; grid-template-columns: 260px minmax(0,1fr); gap: clamp(60px,8vw,128px); }.about-index { position: sticky; top: 118px; align-self: start; }.about-index > p { margin: 0 0 24px; color: #969991; font-size: 10px; font-weight: 700; letter-spacing: .2em; }.about-index-list { display: flex; flex-direction: column; border-top: 1px solid var(--line); }.about-index-list span { display: grid; grid-template-columns: 32px 1fr; gap: 10px; padding: 18px 0; border-bottom: 1px solid var(--line); color: #454942; font-size: 13px; line-height: 1.6; }.about-index-list b { padding-top: 3px; color: var(--accent-dark); font-size: 9px; letter-spacing: .08em; }.about-story-heading { max-width: 800px; }.about-story-heading h2 { max-width: 780px; margin: 22px 0 0; font-size: clamp(36px,4vw,58px); font-weight: 470; letter-spacing: -.05em; line-height: 1.18; }.about-narrative { max-width: 860px; margin-top: 62px; }.about-narrative > p { position: relative; margin: 0; padding: 30px 34px 30px 72px; border-top: 1px solid #d5d6cf; color: #50544d; font-size: 15px; line-height: 2.05; text-align: justify; }.about-narrative > p:last-child { border-bottom: 1px solid #d5d6cf; }.about-narrative > p > span { position: absolute; top: 35px; left: 0; color: var(--accent-dark); font-size: 9px; font-weight: 750; letter-spacing: .12em; }.about-point-list { margin-top: 74px; border-top: 1px solid #cdcec7; }.about-point-list article { display: grid; grid-template-columns: 72px minmax(0,1fr) 42px; gap: 25px; align-items: start; padding: 40px 0 42px; border-bottom: 1px solid #d9dad3; transition: padding 220ms ease,background 220ms ease; }.about-point-number { padding-top: 8px; color: var(--accent-dark); font-size: 10px; font-weight: 750; letter-spacing: .12em; }.about-point-copy h3 { max-width: 720px; margin: 0; overflow-wrap: anywhere; white-space: pre-line; font-size: clamp(24px,2.25vw,34px); font-weight: 520; letter-spacing: -.035em; line-height: 1.35; }.about-point-description { max-width: 650px; margin-top: 17px; color: var(--muted); font-size: 14px; line-height: 1.85; }.about-point-description p { margin: 0; }.about-point-description p + p { margin-top: 9px; }.about-point-arrow { display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid #d4d5ce; border-radius: 50%; color: var(--accent-dark); font-size: 15px; transition: 220ms ease; }.about-point-list article:hover .about-point-arrow { color: white; border-color: var(--accent); background: var(--accent); transform: translate(3px,-3px); }
.page-content { padding: 100px 0 120px; }.content-layout { display: grid; grid-template-columns: 260px 1fr; gap: 80px; }.content-layout aside { display: flex; flex-direction: column; }.content-layout aside > p { margin: 0 0 20px; color: #9a9c95; font-size: 10px; font-weight: 700; letter-spacing: .18em; }.content-layout aside > span { display: flex; gap: 15px; padding: 16px 0; border-bottom: 1px solid var(--line); font-size: 13px; }.content-layout aside b { color: var(--accent-dark); font-size: 9px; }.point-grid { display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }.point-grid article { min-height: 310px; padding: 30px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); background: #fff; }.point-grid article > span { color: var(--accent-dark); font-size: 10px; font-weight: 700; }.point-grid h2 { margin: 65px 0 0; font-size: 22px; font-weight: 550; letter-spacing: -.025em; line-height: 1.45; }.point-grid p { margin: 18px 0 0; color: var(--muted); font-size: 13px; line-height: 1.75; }
.inquiry-section { padding: 100px 0; background: #edede6; }.inquiry-layout { display: grid; grid-template-columns: .72fr 1.28fr; gap: 85px; }.inquiry-layout > div:first-child h2 { margin: 20px 0 0; font-size: 45px; font-weight: 500; letter-spacing: -.045em; line-height: 1.2; }.inquiry-layout > div:first-child > p:last-child { color: var(--muted); font-size: 14px; line-height: 1.8; }.inquiry-form { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; padding: 35px; border-radius: 15px; background: #fff; box-shadow: 0 24px 65px rgba(30,32,28,.08); }.inquiry-form label { display: flex; flex-direction: column; gap: 9px; }.inquiry-form label > span { color: #696c65; font-size: 11px; font-weight: 650; }.inquiry-form input,.inquiry-form select,.inquiry-form textarea { width: 100%; padding: 13px 14px; border: 1px solid var(--line); border-radius: 7px; color: var(--ink); background: #fafaf7; font-size: 13px; }.inquiry-form textarea { resize: vertical; }.wide { grid-column: 1 / -1; }.privacy { flex-direction: row!important; align-items: center; }.privacy input { width: 16px; }.inquiry-form button { display: flex; grid-column: 1 / -1; align-items: center; justify-content: space-between; padding: 15px 18px; border: 0; border-radius: 7px; color: white; background: var(--accent); font-size: 13px; font-weight: 700; cursor: pointer; }.success-message { align-self: stretch; padding: 60px; border-radius: 15px; background: white; text-align: center; }.success-message strong { display: grid; width: 64px; height: 64px; margin: 0 auto; place-items: center; border-radius: 50%; color: white; background: var(--accent); font-size: 26px; }.success-message h3 { margin: 24px 0 0; font-size: 27px; }.success-message p { color: var(--muted); font-size: 13px; line-height: 1.7; }
@media (max-width: 900px) { .content-layout,.inquiry-layout { grid-template-columns: 1fr; gap: 45px; }.point-grid { grid-template-columns: 1fr 1fr; }.about-hero-inner { grid-template-columns: minmax(0,1fr) 210px; gap: 48px; }.about-hero-mark { width: 210px; height: 210px; padding: 27px; }.about-hero-mark strong { font-size: 45px; }.about-layout { grid-template-columns: 210px minmax(0,1fr); gap: 55px; } }
@media (max-width: 767px) { .section-page { padding-top: 74px; }.page-hero { padding: 70px 0 76px; }.page-breadcrumb { margin-bottom: 40px; }.page-content { padding: 70px 0 80px; }.point-grid { grid-template-columns: 1fr; }.point-grid article { min-height: 245px; }.point-grid h2 { margin-top: 42px; }.inquiry-section { padding: 75px 0; }.inquiry-layout > div:first-child h2 { font-size: 36px; }.inquiry-form { grid-template-columns: 1fr; padding: 23px; }.wide { grid-column: auto; }.about-hero { min-height: auto; padding: 65px 0 78px; }.about-hero-inner { grid-template-columns: 1fr; gap: 42px; }.about-hero .page-breadcrumb { margin-bottom: 48px; }.about-hero-mark { width: 156px; height: 156px; justify-self: end; padding: 22px; }.about-hero-mark strong { font-size: 34px; }.about-hero-mark i { margin: 12px 0 10px; }.about-orbit-one { top: auto; right: -260px; bottom: -320px; }.about-orbit-two { top: auto; right: -170px; bottom: -230px; }.about-content { padding: 78px 0 90px; }.about-layout { grid-template-columns: 1fr; gap: 68px; }.about-index { position: static; }.about-index-list { display: grid; grid-template-columns: 1fr; }.about-story-heading h2 { font-size: clamp(34px,10vw,46px); }.about-narrative { margin-top: 42px; }.about-narrative > p { padding: 26px 0 26px 38px; font-size: 14px; line-height: 1.9; text-align: left; }.about-narrative > p > span { top: 31px; }.about-point-list { margin-top: 52px; }.about-point-list article { grid-template-columns: 42px minmax(0,1fr); gap: 16px; padding: 30px 0 34px; }.about-point-number { padding-top: 6px; }.about-point-arrow { display: none; }.about-point-copy h3 { font-size: 23px; }.about-point-description { font-size: 13px; } }
</style>
