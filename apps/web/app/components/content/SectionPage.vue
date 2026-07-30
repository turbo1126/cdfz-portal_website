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
const isEnglish = computed(() => locale.value.startsWith('en'))
const isAbout = computed(() => route.path.endsWith('/about'))
const isContact = computed(() => route.path.endsWith('/contact'))
const submitted = ref(false)

const toParagraphs = (value?: string | null) => (value || '')
  .replace(/\\n/g, '\n')
  .replace(/\r\n?/g, '\n')
  .split(/\n[\t ]*\n+/)
  .map(item => item.replace(/[\t ]*\n[\t ]*/g, ' ').trim())
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
.about-hero { min-height: 570px; padding: 64px 0 80px; background: radial-gradient(circle at 82% 22%,rgba(40,119,238,.32),transparent 28%),radial-gradient(circle at 20% 100%,rgba(29,84,158,.14),transparent 35%),linear-gradient(135deg,#0b1521 0%,#101b28 58%,#0b1119 100%); }
.about-hero::after { position: absolute; right: 0; bottom: 0; left: 0; height: 1px; content: ''; background: linear-gradient(90deg,transparent,rgba(91,156,255,.55),transparent); }
.about-hero .hero-grid { opacity: .13; background-size: 52px 52px; mask-image: linear-gradient(90deg,black 0%,rgba(0,0,0,.7) 58%,transparent 100%); }
.about-hero-inner { display: grid; grid-template-columns: minmax(0,1fr) 242px; align-items: center; gap: clamp(54px,7vw,100px); }
.about-hero .page-breadcrumb { margin-bottom: 42px; }
.about-hero .section-kicker { display: inline-flex; align-items: center; gap: 10px; margin: 0; padding: 7px 12px; border: 1px solid rgba(103,168,255,.24); border-radius: 999px; color: #79b0ff; background: rgba(55,126,221,.08); }
.about-hero .section-kicker::before { width: 5px; height: 5px; border-radius: 50%; content: ''; background: #67a8ff; box-shadow: 0 0 0 5px rgba(103,168,255,.1); }
.about-hero h1 { max-width: 820px; margin-top: 25px; font-size: clamp(44px,4.8vw,66px); line-height: 1.12; }
.about-hero .page-description { max-width: 760px; margin-top: 28px; color: rgba(235,243,255,.7); font-size: 15px; line-height: 1.9; }
.about-hero-mark { display: flex; position: relative; width: 242px; height: 272px; flex-direction: column; justify-content: flex-end; padding: 30px; overflow: hidden; border: 1px solid rgba(137,188,255,.24); border-radius: 28px; background: linear-gradient(145deg,rgba(255,255,255,.11),rgba(255,255,255,.025)); box-shadow: inset 0 1px 0 rgba(255,255,255,.14),0 28px 70px rgba(0,0,0,.22); backdrop-filter: blur(14px); }
.about-hero-mark::before { position: absolute; top: 28px; right: 29px; width: 8px; height: 8px; border-radius: 50%; content: ''; background: #67a8ff; box-shadow: 0 0 0 7px rgba(103,168,255,.12),0 0 24px rgba(103,168,255,.8); }
.about-hero-mark::after { position: absolute; top: 0; right: 28px; width: 1px; height: 76px; content: ''; background: linear-gradient(rgba(103,168,255,.7),transparent); }
.about-hero-mark span { color: rgba(221,235,255,.55); font-size: 10px; font-style: normal; font-weight: 700; letter-spacing: .2em; }
.about-hero-mark strong { margin-top: 8px; color: #fff; font-size: 64px; font-weight: 300; letter-spacing: -.065em; line-height: 1; }
.about-hero-mark i { width: 100%; height: 1px; margin: 22px 0 15px; background: linear-gradient(90deg,rgba(255,255,255,.3),transparent); }
.about-hero-mark p { margin: 0; color: rgba(221,235,255,.62); font-size: 11px; letter-spacing: .12em; }
.about-orbit { position: absolute; border: 1px solid rgba(91,156,255,.13); border-radius: 50%; pointer-events: none; }
.about-orbit-one { top: -410px; right: -180px; width: 820px; height: 820px; }
.about-orbit-two { top: -290px; right: -60px; width: 580px; height: 580px; }
.about-content { position: relative; padding: 104px 0 124px; overflow: hidden; background: radial-gradient(circle at 0 12%,rgba(47,117,214,.07),transparent 25%),linear-gradient(180deg,#f5f7fa 0%,#fff 58%,#f8fafc 100%); }
.about-content::before { position: absolute; top: 0; right: 0; left: 0; height: 1px; content: ''; background: linear-gradient(90deg,transparent,#cfd8e7,transparent); }
.about-content::after { position: absolute; top: 70px; right: -180px; width: 420px; height: 420px; border: 1px solid rgba(47,117,214,.08); border-radius: 50%; content: ''; pointer-events: none; }
.about-layout { display: grid; position: relative; z-index: 1; grid-template-columns: minmax(250px,290px) minmax(0,1fr); gap: clamp(48px,6vw,86px); }
.about-index { position: sticky; top: 112px; align-self: start; padding: 30px; overflow: hidden; border: 1px solid rgba(255,255,255,.08); border-radius: 24px; color: #fff; background: radial-gradient(circle at 100% 0,rgba(65,138,238,.32),transparent 38%),linear-gradient(145deg,#111f30,#0c1622); box-shadow: 0 24px 60px rgba(21,43,72,.16); }
.about-index::after { position: absolute; right: -45px; bottom: -60px; width: 150px; height: 150px; border: 1px solid rgba(111,173,255,.18); border-radius: 50%; content: ''; }
.about-index > p { margin: 0 0 25px; color: #79b0ff; font-size: 10px; font-weight: 750; letter-spacing: .2em; }
.about-index-list { display: flex; position: relative; z-index: 1; flex-direction: column; border-top: 1px solid rgba(255,255,255,.12); }
.about-index-list span { display: grid; grid-template-columns: 40px 1fr; gap: 12px; align-items: center; padding: 17px 0; border-bottom: 1px solid rgba(255,255,255,.1); color: rgba(244,248,255,.84); font-size: 13px; line-height: 1.65; }
.about-index-list span:last-child { border-bottom: 0; }
.about-index-list b { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid rgba(103,168,255,.24); border-radius: 10px; color: #86bcff; background: rgba(103,168,255,.09); font-size: 12px; font-weight: 800; letter-spacing: .06em; }
.about-story { min-width: 0; }
.about-story-heading { max-width: 820px; padding-bottom: 40px; border-bottom: 1px solid #d8e0eb; }
.about-story-heading .section-kicker { color: #2d73d4; }
.about-story-heading h2 { max-width: 800px; margin: 20px 0 0; font-size: clamp(38px,3.6vw,54px); font-weight: 500; letter-spacing: -.048em; line-height: 1.18; text-wrap: balance; }
.about-narrative { display: grid; max-width: 900px; gap: 18px; margin-top: 34px; }
.about-narrative > p { position: relative; margin: 0; padding: 29px 32px 29px 84px; border: 1px solid #dde4ee; border-radius: 18px; color: #4d5866; background: rgba(255,255,255,.88); box-shadow: 0 12px 35px rgba(36,63,99,.055); font-size: 15px; line-height: 2; text-align: left;text-indent: 2em; transition: border-color 220ms ease,box-shadow 220ms ease,transform 220ms ease; }
.about-narrative > p:hover { border-color: #c9d8ed; box-shadow: 0 18px 46px rgba(36,63,99,.09); transform: translateY(-2px); }
.about-narrative > p:last-child { border-bottom: 1px solid #dde4ee; }
.about-narrative > p > span { display: grid; position: absolute; top: 27px; left: 25px; width: 40px; height: 40px; place-items: center; border-radius: 12px; color: #2d73d4; background: #e8f1ff; font-size: 12px; font-weight: 800; letter-spacing: .06em; text-indent: 0; }
.about-point-list { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 16px; margin-top: 42px; border: 0; }
.about-point-list article { display: flex; position: relative; min-height: 230px; flex-direction: column; gap: 0; align-items: stretch; padding: 25px 25px 68px; border: 1px solid #dbe3ee; border-radius: 19px; background: linear-gradient(155deg,#fff 0%,#f4f8fd 100%); box-shadow: 0 10px 32px rgba(36,63,99,.045); transition: border-color 220ms ease,box-shadow 220ms ease,transform 220ms ease; }
.about-point-list article:nth-child(2) { background: linear-gradient(155deg,#fff 0%,#f1f6fc 100%); }
.about-point-list article:nth-child(3) { background: linear-gradient(155deg,#f8fbff 0%,#eef5ff 100%); }
.about-point-list article:hover { border-color: #bcd0eb; box-shadow: 0 18px 44px rgba(36,63,99,.1); transform: translateY(-4px); }
.about-point-number { display: grid; width: 42px; height: 42px; padding: 0; place-items: center; border: 1px solid #d7e6fa; border-radius: 12px; color: #2d73d4; background: #e8f1ff; font-size: 12px; font-weight: 800; letter-spacing: .06em; }
.about-point-copy h3 { max-width: 720px; margin: 32px 0 0; overflow-wrap: anywhere; white-space: pre-line; font-size: clamp(21px,1.8vw,27px); font-weight: 560; letter-spacing: -.03em; line-height: 1.35; }
.about-point-description { max-width: 650px; margin-top: 13px; color: #657181; font-size: 13px; line-height: 1.75; }
.about-point-description p { margin: 0; }
.about-point-description p + p { margin-top: 9px; }
.about-point-arrow { display: grid; position: absolute; right: 24px; bottom: 24px; width: 36px; height: 36px; place-items: center; border: 1px solid #ccd8e7; border-radius: 50%; color: #2d73d4; background: rgba(255,255,255,.7); font-size: 14px; transition: 220ms ease; }
.about-point-list article:hover .about-point-arrow { color: white; border-color: var(--accent); background: var(--accent); transform: translate(3px,-3px); }
.page-content { padding: 100px 0 120px; }.content-layout { display: grid; grid-template-columns: 260px 1fr; gap: 80px; }.content-layout aside { display: flex; flex-direction: column; }.content-layout aside > p { margin: 0 0 20px; color: #9a9c95; font-size: 10px; font-weight: 700; letter-spacing: .18em; }.content-layout aside > span { display: flex; gap: 15px; padding: 16px 0; border-bottom: 1px solid var(--line); font-size: 13px; }.content-layout aside b { color: var(--accent-dark); font-size: 9px; }.point-grid { display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }.point-grid article { min-height: 310px; padding: 30px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); background: #fff; }.point-grid article > span { color: var(--accent-dark); font-size: 10px; font-weight: 700; }.point-grid h2 { margin: 65px 0 0; font-size: 22px; font-weight: 550; letter-spacing: -.025em; line-height: 1.45; }.point-grid p { margin: 18px 0 0; color: var(--muted); font-size: 13px; line-height: 1.75; }
.inquiry-section { padding: 100px 0; background: #edede6; }.inquiry-layout { display: grid; grid-template-columns: .72fr 1.28fr; gap: 85px; }.inquiry-layout > div:first-child h2 { margin: 20px 0 0; font-size: 45px; font-weight: 500; letter-spacing: -.045em; line-height: 1.2; }.inquiry-layout > div:first-child > p:last-child { color: var(--muted); font-size: 14px; line-height: 1.8; }.inquiry-form { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; padding: 35px; border-radius: 15px; background: #fff; box-shadow: 0 24px 65px rgba(30,32,28,.08); }.inquiry-form label { display: flex; flex-direction: column; gap: 9px; }.inquiry-form label > span { color: #696c65; font-size: 11px; font-weight: 650; }.inquiry-form input,.inquiry-form select,.inquiry-form textarea { width: 100%; padding: 13px 14px; border: 1px solid var(--line); border-radius: 7px; color: var(--ink); background: #fafaf7; font-size: 13px; }.inquiry-form textarea { resize: vertical; }.wide { grid-column: 1 / -1; }.privacy { flex-direction: row!important; align-items: center; }.privacy input { width: 16px; }.inquiry-form button { display: flex; grid-column: 1 / -1; align-items: center; justify-content: space-between; padding: 15px 18px; border: 0; border-radius: 7px; color: white; background: var(--accent); font-size: 13px; font-weight: 700; cursor: pointer; }.success-message { align-self: stretch; padding: 60px; border-radius: 15px; background: white; text-align: center; }.success-message strong { display: grid; width: 64px; height: 64px; margin: 0 auto; place-items: center; border-radius: 50%; color: white; background: var(--accent); font-size: 26px; }.success-message h3 { margin: 24px 0 0; font-size: 27px; }.success-message p { color: var(--muted); font-size: 13px; line-height: 1.7; }
@media (max-width: 900px) { .content-layout,.inquiry-layout { grid-template-columns: 1fr; gap: 45px; }.point-grid { grid-template-columns: 1fr 1fr; }.about-hero-inner { grid-template-columns: minmax(0,1fr) 210px; gap: 44px; }.about-hero-mark { width: 210px; height: 238px; padding: 26px; }.about-hero-mark strong { font-size: 52px; }.about-layout { grid-template-columns: 220px minmax(0,1fr); gap: 36px; }.about-index { padding: 24px; }.about-point-list { grid-template-columns: 1fr; }.about-point-list article { min-height: 190px; } }
@media (max-width: 767px) { .section-page { padding-top: 74px; }.page-hero { padding: 70px 0 76px; }.page-breadcrumb { margin-bottom: 40px; }.page-content { padding: 70px 0 80px; }.point-grid { grid-template-columns: 1fr; }.point-grid article { min-height: 245px; }.point-grid h2 { margin-top: 42px; }.inquiry-section { padding: 75px 0; }.inquiry-layout > div:first-child h2 { font-size: 36px; }.inquiry-form { grid-template-columns: 1fr; padding: 23px; }.wide { grid-column: auto; }.about-hero { min-height: auto; padding: 55px 0 65px; }.about-hero-inner { grid-template-columns: 1fr; gap: 34px; }.about-hero .page-breadcrumb { margin-bottom: 34px; }.about-hero h1 { font-size: clamp(38px,11.5vw,50px); }.about-hero .page-description { font-size: 14px; line-height: 1.8; }.about-hero-mark { width: 170px; height: 180px; justify-self: end; padding: 22px; border-radius: 22px; }.about-hero-mark strong { font-size: 42px; }.about-hero-mark i { margin: 14px 0 10px; }.about-orbit-one { top: auto; right: -260px; bottom: -320px; }.about-orbit-two { top: auto; right: -170px; bottom: -230px; }.about-content { padding: 72px 0 84px; }.about-layout { grid-template-columns: 1fr; gap: 54px; }.about-index { position: static; padding: 26px; }.about-index-list { display: grid; grid-template-columns: 1fr; }.about-story-heading { padding-bottom: 30px; }.about-story-heading h2 { font-size: clamp(32px,9vw,42px); }.about-narrative { margin-top: 26px; }.about-narrative > p { padding: 25px 20px 25px 66px; border-radius: 15px; font-size: 14px; line-height: 1.88; text-align: left; }.about-narrative > p > span { top: 24px; left: 18px; width: 36px; height: 36px; border-radius: 10px; font-size: 11px; }.about-point-list { grid-template-columns: 1fr; margin-top: 32px; }.about-point-list article { min-height: 200px; padding: 23px 23px 62px; }.about-point-copy h3 { margin-top: 25px; font-size: 23px; }.about-point-description { font-size: 13px; } }
</style>
