<script setup lang="ts">
import { getLocaleContent } from '~/utils/site-content'

const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const content = computed(() => getLocaleContent(locale.value))
</script>

<template>
  <footer class="site-footer">
    <div class="site-container footer-main">
      <div class="footer-brand">
        <NuxtLink :to="localePath('/')" class="footer-logo">
          <span><img src="/brand/cdfz-logo.png" alt="" /></span>
          <div><strong>{{ isEnglish ? 'Chengdian Fuzhi' : '上海成电福智' }}</strong><small>CHENGDIAN FUZHI TECHNOLOGY</small></div>
        </NuxtLink>
        <p>{{ isEnglish ? 'An innovation platform company focused on intelligent systems, embodied robotics and industrial transformation.' : '聚焦智能系统、具身智能与科技成果转化，建设连接技术创新与产业落地的新型研发机构。' }}</p>
        <div class="footer-slogan">{{ isEnglish ? 'Technology · Industry · Capital · Talent' : '科技 · 产业 · 金融 · 人才' }}</div>
      </div>

      <div class="footer-nav">
        <h3>{{ isEnglish ? 'Quick links' : '快速导航' }}</h3>
        <NuxtLink v-for="item in content.navigation" :key="item.path" :to="localePath(item.path)">{{ item.label }}</NuxtLink>
      </div>

      <div class="footer-contact">
        <h3>{{ isEnglish ? 'Contact' : '联系信息' }}</h3>
        <div class="contact-row"><span>{{ isEnglish ? 'TEL' : '电话' }}</span><p>{{ isEnglish ? 'To be confirmed before launch' : '上线前补充' }}</p></div>
        <div class="contact-row"><span>{{ isEnglish ? 'EMAIL' : '邮箱' }}</span><p>{{ isEnglish ? 'To be confirmed before launch' : '上线前补充' }}</p></div>
        <div class="contact-row"><span>{{ isEnglish ? 'ADDRESS' : '地址' }}</span><p>{{ isEnglish ? 'Lingang New Area, Shanghai (details pending)' : '上海市临港新片区（详细地址待补充）' }}</p></div>
        <NuxtLink :to="localePath('/contact')" class="footer-contact-link">{{ isEnglish ? 'Cooperation inquiry' : '预约演示 / 合作咨询' }}<b>↗</b></NuxtLink>
      </div>
    </div>

    <div class="site-container footer-bottom">
      <p>© {{ new Date().getFullYear() }} {{ isEnglish ? 'Shanghai Chengdian Fuzhi Technology Co., Ltd.' : '上海成电福智科技有限公司' }}</p>
      <div>
        <NuxtLink :to="localePath('/privacy')">{{ isEnglish ? 'Privacy policy' : '隐私政策' }}</NuxtLink>
        <span>{{ isEnglish ? 'Shanghai ICP filing pending' : '沪ICP备XXXXXXXX号（待补充）' }}</span>
        <span>{{ isEnglish ? 'Public security filing pending' : '公安备案号（待补充）' }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { color: rgba(255,255,255,.78); background: #151815; }
.footer-main { display: grid; grid-template-columns: 1.15fr .55fr 1fr; gap: 90px; padding-top: 78px; padding-bottom: 64px; }
.footer-logo { display: flex; align-items: center; gap: 15px; color: white; }
.footer-logo > span { display: grid; width: 54px; height: 54px; place-items: center; border-radius: 13px; background: white; }
.footer-logo img { width: 42px; height: 42px; object-fit: contain; }
.footer-logo div { display: flex; flex-direction: column; }.footer-logo strong { font-size: 20px; letter-spacing: .14em; }.footer-logo small { margin-top: 4px; color: rgba(255,255,255,.4); font-size: 8px; letter-spacing: .14em; }
.footer-brand > p { max-width: 460px; margin: 27px 0 0; color: rgba(255,255,255,.5); font-size: 14px; line-height: 1.85; }.footer-slogan { margin-top: 30px; color: #78adff; font-size: 11px; font-weight: 700; letter-spacing: .2em; }
.footer-main h3 { margin: 4px 0 25px; color: white; font-size: 12px; font-weight: 700; letter-spacing: .14em; }
.footer-nav { display: flex; flex-direction: column; align-items: flex-start; }.footer-nav a { padding: 7px 0; color: rgba(255,255,255,.56); font-size: 13px; transition: 160ms ease; }.footer-nav a:hover { color: #78adff; transform: translateX(3px); }
.footer-contact { min-width: 0; }.contact-row { display: grid; grid-template-columns: 70px 1fr; gap: 16px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,.1); }.contact-row span { color: rgba(255,255,255,.32); font-size: 9px; font-weight: 700; letter-spacing: .12em; }.contact-row p { margin: 0; color: rgba(255,255,255,.66); font-size: 13px; line-height: 1.6; }
.footer-contact-link { display: flex; align-items: center; justify-content: space-between; margin-top: 22px; padding: 14px 16px; border: 1px solid rgba(255,255,255,.17); border-radius: 7px; color: white; font-size: 13px; font-weight: 700; transition: 180ms ease; }.footer-contact-link:hover { border-color: var(--accent); background: var(--accent); }.footer-contact-link b { font-weight: 400; }
.footer-bottom { display: flex; align-items: center; justify-content: space-between; gap: 25px; padding-top: 24px; padding-bottom: 28px; border-top: 1px solid rgba(255,255,255,.1); color: rgba(255,255,255,.34); font-size: 10px; }.footer-bottom p { margin: 0; }.footer-bottom div { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 22px; }.footer-bottom a:hover { color: white; }
@media (max-width: 900px) { .footer-main { grid-template-columns: 1fr 1fr; gap: 55px; }.footer-brand { grid-column: 1 / -1; } }
@media (max-width: 600px) { .footer-main { grid-template-columns: 1fr; gap: 42px; padding-top: 60px; }.footer-brand { grid-column: auto; }.footer-bottom { align-items: flex-start; flex-direction: column; }.footer-bottom div { justify-content: flex-start; gap: 12px 20px; }.footer-logo strong { font-size: 17px; } }
</style>
