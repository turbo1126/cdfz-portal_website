<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
  highlights: string[]
  featuredPoints: string[]
}>()

const route = useRoute()
const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const isContact = computed(() => route.path.endsWith('/contact'))
const submitted = ref(false)
</script>

<template>
  <div class="section-page">
    <section class="page-hero">
      <div class="hero-grid" />
      <div class="site-container page-hero-inner">
        <div class="page-breadcrumb"><NuxtLink :to="localePath('/')">{{ isEnglish ? 'Home' : '首页' }}</NuxtLink><span>/</span><b>{{ eyebrow }}</b></div>
        <p class="section-kicker">{{ eyebrow }}</p>
        <h1>{{ title }}</h1>
        <p class="page-description">{{ description }}</p>
      </div>
    </section>

    <section class="page-content">
      <div class="site-container content-layout">
        <aside>
          <p>{{ isEnglish ? 'CORE TOPICS' : '核心内容' }}</p>
          <span v-for="(item, index) in highlights" :key="item"><b>0{{ index + 1 }}</b>{{ item }}</span>
        </aside>
        <div class="point-grid">
          <article v-for="(point, index) in featuredPoints" :key="point">
            <span>0{{ index + 1 }}</span><h2>{{ point }}</h2><p>{{ isEnglish ? 'More detailed content will be maintained through the CMS and updated continuously.' : '相关详细内容后续由 CMS 持续维护与更新，支持中英文独立发布。' }}</p>
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
.page-hero { position: relative; overflow: hidden; padding: 98px 0 105px; color: white; background: #1a1d19; }.hero-grid { position: absolute; inset: 0; opacity: .2; background-image: linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px); background-size: 70px 70px; mask-image: linear-gradient(90deg,black,transparent 75%); }.page-hero-inner { position: relative; }.page-breadcrumb { display: flex; gap: 10px; margin-bottom: 55px; color: rgba(255,255,255,.4); font-size: 11px; }.page-breadcrumb b { color: rgba(255,255,255,.7); font-weight: 500; }.page-hero h1 { max-width: 950px; margin: 23px 0 0; font-size: clamp(42px,5.3vw,72px); font-weight: 480; letter-spacing: -.055em; line-height: 1.13; }.page-description { max-width: 760px; margin: 30px 0 0; color: rgba(255,255,255,.62); font-size: 16px; line-height: 1.9; }
.page-content { padding: 100px 0 120px; }.content-layout { display: grid; grid-template-columns: 260px 1fr; gap: 80px; }.content-layout aside { display: flex; flex-direction: column; }.content-layout aside > p { margin: 0 0 20px; color: #9a9c95; font-size: 10px; font-weight: 700; letter-spacing: .18em; }.content-layout aside > span { display: flex; gap: 15px; padding: 16px 0; border-bottom: 1px solid var(--line); font-size: 13px; }.content-layout aside b { color: var(--accent-dark); font-size: 9px; }.point-grid { display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }.point-grid article { min-height: 310px; padding: 30px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); background: #fff; }.point-grid article > span { color: var(--accent-dark); font-size: 10px; font-weight: 700; }.point-grid h2 { margin: 65px 0 0; font-size: 22px; font-weight: 550; letter-spacing: -.025em; line-height: 1.45; }.point-grid p { margin: 18px 0 0; color: var(--muted); font-size: 13px; line-height: 1.75; }
.inquiry-section { padding: 100px 0; background: #edede6; }.inquiry-layout { display: grid; grid-template-columns: .72fr 1.28fr; gap: 85px; }.inquiry-layout > div:first-child h2 { margin: 20px 0 0; font-size: 45px; font-weight: 500; letter-spacing: -.045em; line-height: 1.2; }.inquiry-layout > div:first-child > p:last-child { color: var(--muted); font-size: 14px; line-height: 1.8; }.inquiry-form { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; padding: 35px; border-radius: 15px; background: #fff; box-shadow: 0 24px 65px rgba(30,32,28,.08); }.inquiry-form label { display: flex; flex-direction: column; gap: 9px; }.inquiry-form label > span { color: #696c65; font-size: 11px; font-weight: 650; }.inquiry-form input,.inquiry-form select,.inquiry-form textarea { width: 100%; padding: 13px 14px; border: 1px solid var(--line); border-radius: 7px; color: var(--ink); background: #fafaf7; font-size: 13px; }.inquiry-form textarea { resize: vertical; }.wide { grid-column: 1 / -1; }.privacy { flex-direction: row!important; align-items: center; }.privacy input { width: 16px; }.inquiry-form button { display: flex; grid-column: 1 / -1; align-items: center; justify-content: space-between; padding: 15px 18px; border: 0; border-radius: 7px; color: white; background: var(--accent); font-size: 13px; font-weight: 700; cursor: pointer; }.success-message { align-self: stretch; padding: 60px; border-radius: 15px; background: white; text-align: center; }.success-message strong { display: grid; width: 64px; height: 64px; margin: 0 auto; place-items: center; border-radius: 50%; color: white; background: var(--accent); font-size: 26px; }.success-message h3 { margin: 24px 0 0; font-size: 27px; }.success-message p { color: var(--muted); font-size: 13px; line-height: 1.7; }
@media (max-width: 900px) { .content-layout,.inquiry-layout { grid-template-columns: 1fr; gap: 45px; }.point-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 767px) { .section-page { padding-top: 74px; }.page-hero { padding: 70px 0 76px; }.page-breadcrumb { margin-bottom: 40px; }.page-content { padding: 70px 0 80px; }.point-grid { grid-template-columns: 1fr; }.point-grid article { min-height: 245px; }.point-grid h2 { margin-top: 42px; }.inquiry-section { padding: 75px 0; }.inquiry-layout > div:first-child h2 { font-size: 36px; }.inquiry-form { grid-template-columns: 1fr; padding: 23px; }.wide { grid-column: auto; } }
</style>
