<script setup lang="ts">
import type { SiteSetting } from '@cdfz/contracts'
import { getLocaleContent } from '~/utils/site-content'

const localePath = useLocalePath()
const { locale } = useI18n()
const isEnglish = computed(() => locale.value === 'en-US')
const content = computed(() => getLocaleContent(locale.value))

const { data: siteSetting } = await useFetch<SiteSetting>('/api/content/site-setting', {
  query: computed(() => ({ locale: locale.value })),
})

const companyName = computed(() =>
  siteSetting.value?.companyName?.trim()
  || (isEnglish.value ? 'Chengdian Fuzhi' : '上海成电福智科技有限公司'),
)
const footerSlogan = computed(() =>
  siteSetting.value?.footerSlogan?.trim()
  || (isEnglish.value ? 'Technology · Industry · Capital · Talent' : '科技 · 产业 · 金融 · 人才'),
)
const address = computed(() =>
  siteSetting.value?.address?.trim()
  || (isEnglish.value ? 'Lingang New Area, Shanghai (details pending)' : '上海市临港新片区（详细地址待补充）'),
)
const email = computed(() =>
  siteSetting.value?.email?.trim()
  || (isEnglish.value ? 'xiaohandeng01@gmail.com' : 'xiaohandeng01@gmail.com'),
)
const phone = computed(() =>
  siteSetting.value?.phone?.trim()
  || (isEnglish.value ? 'Deng 13607615904' : '邓小涵 13607615904'),
)
const wechatAccountName = computed(() =>
  siteSetting.value?.wechatAccountName?.trim()
  || (isEnglish.value ? 'Chengdian Fuzhi' : '上海成电福智'),
)
const wechatQrCode = computed(() => siteSetting.value?.wechatQrCode?.url || '')

const externalLinks = computed(() => [
  {
    href: 'https://www.lingang.gov.cn/html/website/lg/index.html',
    label: isEnglish.value ? 'Lingang Administrative Committee' : '临港管委会',
    caption: 'LINGANG NEW AREA',
  },
  {
    href: 'https://www.sh-ssci.com/',
    label: isEnglish.value ? 'Shanghai State-owned Capital Investment' : '上海国投',
    caption: 'SHANGHAI STATE CAPITAL',
  },
  {
    href: `https://www.shstvc.com.cn/`,
    label: isEnglish.value ? 'Shanghai STVC Group' : '上海科创',
    caption: 'SHANGHAI STVC GROUP',
  },
  {
    href: 'https://www.uestc.edu.cn/',
    label: isEnglish.value ? 'University of Electronic Science and Technology of China' : '电子科技大学',
    caption: 'UESTC',
  }
])
</script>

<template>
  <footer class="site-footer">
    <div class="site-container footer-main">
      <div class="footer-brand">
        <NuxtLink :to="localePath('/')" class="footer-logo">
          <span><img src="/images/brand/cdfz-logo.png" alt="" /></span>
          <div><strong>{{ companyName }}</strong><small>CHENGDIAN FUZHI TECHNOLOGY</small></div>
        </NuxtLink>
        <p>{{ isEnglish ? 'An innovation platform company focused on intelligent systems, embodied robotics and industrial transformation.' : '聚焦智能系统、具身智能与科技成果转化，建设连接技术创新与产业落地的新型研发机构。' }}</p>
        <div class="footer-slogan">{{ footerSlogan }}</div>
      </div>

      <div class="footer-nav">
        <h3>{{ isEnglish ? 'Quick links' : '快速导航' }}</h3>
        <div class="footer-nav-list">
          <NuxtLink v-for="item in content.navigation" :key="item.path" :to="localePath(item.path)">
            {{ item.label }}<span>↗</span>
          </NuxtLink>
        </div>
      </div>

      <div class="footer-contact">
        <h3>{{ isEnglish ? 'Contact' : '联系信息' }}</h3>
        <div class="contact-row"><span>{{ isEnglish ? 'TEL' : '电话' }}</span><p>{{ phone }}</p></div>
        <div class="contact-row"><span>{{ isEnglish ? 'EMAIL' : '邮箱' }}</span><p>{{ email }}</p></div>
        <div class="contact-row"><span>{{ isEnglish ? 'ADDRESS' : '地址' }}</span><p>{{ address }}</p></div>
        <NuxtLink :to="localePath('/contact')" class="footer-contact-link">{{ isEnglish ? 'Cooperation inquiry' : '预约演示 / 合作咨询' }}<b>↗</b></NuxtLink>
      </div>

      <div class="footer-wechat">
        <h3>{{ isEnglish ? 'WeChat' : '微信公众号' }}</h3>
        <div class="wechat-qr" :class="{ 'wechat-qr--empty': !wechatQrCode }">
          <img v-if="wechatQrCode" :src="wechatQrCode" :alt="isEnglish ? 'Official WeChat QR code' : '微信公众号二维码'" />
          <div v-else class="wechat-placeholder">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9.5 4.5c-4.1 0-7.4 2.7-7.4 6 0 1.9 1.1 3.6 2.9 4.7l-.7 2.3 2.7-1.3c.8.2 1.6.3 2.5.3h.4a5.8 5.8 0 0 1-.3-1.8c0-3.4 3.1-6.2 7.1-6.2h.4C16.1 6.2 13.1 4.5 9.5 4.5Zm-2.6 4a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Zm5.2 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" />
              <path d="M21.9 14.7c0-2.8-2.7-5.1-6-5.1s-6 2.3-6 5.1 2.7 5.1 6 5.1c.7 0 1.4-.1 2.1-.3l2.2 1.1-.5-2c1.4-.9 2.2-2.3 2.2-3.9Zm-8-1.1a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Zm4.1 0a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Z" />
            </svg>
            <span>{{ isEnglish ? 'Upload QR code in CMS' : '请在 CMS 上传二维码' }}</span>
          </div>
        </div>
        <strong>{{ wechatAccountName }}</strong>
        <p>{{ isEnglish ? 'Scan to follow our official account' : '扫码关注，获取最新动态' }}</p>
      </div>
    </div>

    <div class="footer-related-wrap">
      <div class="site-container footer-related">
        <span class="related-label">{{ isEnglish ? 'Related links:' : '相关链接：' }}</span>
        <div class="related-links">
          <a
            v-for="item in externalLinks"
            :key="item.href"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.label }}<b>↗</b>
          </a>
        </div>
      </div>
    </div>

    <div class="site-container footer-bottom">
      <p>© {{ new Date().getFullYear() }} {{ companyName }}</p>
      <div>
        <NuxtLink :to="localePath('/privacy')">{{ isEnglish ? 'Privacy policy' : '隐私政策' }}</NuxtLink>
        <span>{{ isEnglish ? 'Shanghai ICP filing pending' : '沪ICP备XXXXXXXX号（待补充）' }}</span>
        <span>{{ isEnglish ? 'Public security filing pending' : '公安备案号（待补充）' }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { position: relative; overflow: hidden; color: rgba(255,255,255,.78); background: #131713; }
.site-footer::before { position: absolute; top: -220px; left: -130px; width: 520px; height: 520px; border: 1px solid rgba(93,153,255,.08); border-radius: 50%; content: ''; pointer-events: none; }
.footer-main { position: relative; display: grid; grid-template-columns: minmax(310px,1.05fr) minmax(150px,.42fr) minmax(330px,.82fr) minmax(150px,.38fr); gap: clamp(35px,4.2vw,72px); padding-top: 76px; padding-bottom: 58px; }
.footer-logo { display: flex; align-items: center; gap: 15px; color: white; }
.footer-logo > span { display: grid; width: 54px; height: 54px; flex: 0 0 auto; place-items: center; border-radius: 13px; background: white; box-shadow: 0 12px 30px rgba(0,0,0,.16); }
.footer-logo img { width: 42px; height: 42px; object-fit: contain; }
.footer-logo div { display: flex; min-width: 0; flex-direction: column; }.footer-logo strong { overflow-wrap: anywhere; font-size: clamp(17px,1.35vw,20px); letter-spacing: .1em; line-height: 1.45; }.footer-logo small { margin-top: 4px; color: rgba(255,255,255,.36); font-size: 8px; letter-spacing: .14em; }
.footer-brand > p { max-width: 470px; margin: 25px 0 0; color: rgba(255,255,255,.48); font-size: 13px; line-height: 1.9; }
.footer-slogan { margin-top: 28px; color: #78adff; font-size: clamp(18px,1.75vw,24px); font-weight: 700; letter-spacing: .14em; }
.footer-main h3 { display: flex; align-items: center; gap: 10px; margin: 4px 0 22px; color: white; font-size: 12px; font-weight: 700; letter-spacing: .14em; }.footer-main h3::before { width: 18px; height: 2px; content: ''; background: #4f91f3; }
.footer-nav-list { display: flex; flex-direction: column; align-items: flex-start; }
.footer-nav-list a { display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 18px; padding: 7px 0; color: rgba(255,255,255,.54); font-size: 13px; transition: color 160ms ease, transform 160ms ease; }.footer-nav-list a span { color: #6da3f4; font-size: 11px; opacity: 0; transform: translateX(-4px); transition: 160ms ease; }.footer-nav-list a:hover { color: white; transform: translateX(3px); }.footer-nav-list a:hover span { opacity: 1; transform: translateX(0); }
.footer-contact { min-width: 0; }.contact-row { display: grid; grid-template-columns: 72px 1fr; gap: 16px; padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,.09); }.contact-row span { color: rgba(255,255,255,.3); font-size: 10px; font-weight: 700; letter-spacing: .12em; }.contact-row p { min-width: 0; margin: 0; overflow-wrap: anywhere; color: rgba(255,255,255,.64); font-size: 13px; line-height: 1.65; }
.footer-contact-link { display: flex; align-items: center; justify-content: space-between; margin-top: 24px; padding: 14px 16px; border: 1px solid rgba(255,255,255,.15); border-radius: 8px; color: white; font-size: 13px; font-weight: 700; transition: border-color 180ms ease, background 180ms ease, transform 180ms ease; }.footer-contact-link:hover { border-color: var(--accent); background: var(--accent); transform: translateY(-2px); }.footer-contact-link b { font-weight: 400; }
.footer-wechat { min-width: 0; }.wechat-qr { width: 132px; padding: 7px; border-radius: 10px; background: white; box-shadow: 0 14px 35px rgba(0,0,0,.16); }.wechat-qr img { display: block; width: 118px; height: 118px; object-fit: contain; }.wechat-qr--empty { background: rgba(255,255,255,.06); box-shadow: none; }.wechat-placeholder { display: flex; width: 118px; height: 118px; align-items: center; justify-content: center; flex-direction: column; gap: 9px; border: 1px dashed rgba(255,255,255,.2); border-radius: 6px; color: rgba(255,255,255,.42); text-align: center; }.wechat-placeholder svg { width: 34px; fill: #67a5ff; }.wechat-placeholder span { max-width: 88px; font-size: 9px; line-height: 1.5; }.footer-wechat > strong { display: block; margin-top: 15px; color: white; font-size: 12px; font-weight: 650; }.footer-wechat > p { margin: 7px 0 0; color: rgba(255,255,255,.4); font-size: 10px; line-height: 1.6; }
.footer-related-wrap { position: relative; overflow: hidden; color: #29435f; border-top: 1px solid rgba(23,105,224,.14); border-bottom: 1px solid rgba(23,105,224,.22); background: linear-gradient(100deg,#eaf2fb 0%,#f7faff 52%,#e8f1fc 100%); }
.footer-related-wrap::after { position: absolute; top: -90px; right: 5%; width: 260px; height: 260px; border: 1px solid rgba(23,105,224,.08); border-radius: 50%; content: ''; pointer-events: none; }
.footer-related { position: relative; z-index: 1; display: flex; min-height: 100px; align-items: center; gap: clamp(32px,4vw,64px); }
.related-label { flex: 0 0 auto; color: #6b7f96; font-size: 14px; font-weight: 600; }.related-links { display: flex; flex-wrap: wrap; align-items: center; gap: clamp(30px,5vw,72px); }.related-links a { position: relative; display: inline-flex; align-items: center; gap: 11px; padding: 10px 0; color: #2c4867; font-size: clamp(14px,1.25vw,18px); font-weight: 550; transition: color 160ms ease, transform 160ms ease; }.related-links a::after { position: absolute; right: 0; bottom: 5px; left: 0; height: 1px; content: ''; background: var(--accent); transform: scaleX(0); transform-origin: right; transition: transform 180ms ease; }.related-links a b { color: var(--accent); font-size: 14px; font-weight: 500; transition: transform 160ms ease; }.related-links a:hover { color: var(--accent-dark); transform: translateY(-1px); }.related-links a:hover::after { transform: scaleX(1); transform-origin: left; }.related-links a:hover b { transform: translate(2px,-2px); }
.footer-bottom { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 25px; padding-top: 23px; padding-bottom: 26px; color: rgba(255,255,255,.3); font-size: 10px; }.footer-bottom p { margin: 0; }.footer-bottom div { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 22px; }.footer-bottom a { transition: color 160ms ease; }.footer-bottom a:hover { color: white; }
@media (max-width: 1180px) { .footer-main { grid-template-columns: 1fr 1fr; gap: 52px 70px; }.footer-brand { grid-column: 1 / -1; }.footer-brand > p { max-width: 600px; }.footer-wechat { justify-self: start; } }
@media (max-width: 767px) { .footer-main { grid-template-columns: 1fr; gap: 42px; padding-top: 58px; padding-bottom: 48px; }.footer-brand { grid-column: auto; }.footer-logo strong { font-size: 17px; }.footer-slogan { font-size: 18px; line-height: 1.7; }.footer-related { align-items: flex-start; flex-direction: column; gap: 20px; padding-top: 28px; padding-bottom: 30px; }.related-links { align-items: flex-start; flex-direction: column; gap: 16px; }.related-links a { font-size: 15px; }.footer-bottom { align-items: flex-start; flex-direction: column; }.footer-bottom div { justify-content: flex-start; gap: 12px 20px; } }
@media (max-width: 420px) { .footer-logo > span { width: 48px; height: 48px; }.footer-logo img { width: 37px; height: 37px; }.footer-logo small { letter-spacing: .08em; } }
</style>
