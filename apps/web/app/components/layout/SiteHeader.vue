<script setup lang="ts">
import { useUiStore } from '~/stores/ui'
import { getLocaleContent } from '~/utils/site-content'

const route = useRoute()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { y } = useWindowScroll()
const { locale } = useI18n()
const uiStore = useUiStore()

const content = computed(() => getLocaleContent(locale.value))
const isEnglish = computed(() => locale.value === 'en-US')
const isHome = computed(() => route.path === '/' || route.path === '/en' || route.path === '/en-US')
const isScrolled = computed(() => y.value > 20)
const useTransparentHeader = computed(() => isHome.value && !isScrolled.value && !uiStore.mobileMenuOpen)

const childMenus = computed<Record<string, { label: string; hash: string }[]>>(() =>
  isEnglish.value
    ? {
        '/products': [
          { label: 'AI Mediation Assistant', hash: '#products' },
          { label: 'Vision Shield', hash: '#products' },
          { label: 'Inspection Cyclone', hash: '#products' },
        ],
        '/platforms': [
          { label: 'Intelligent Systems Platform', hash: '#platforms' },
          { label: 'Robotics Pilot Platform', hash: '#platforms' },
        ],
        '/services': [
          { label: 'R&D Incubation', hash: '#capability' },
          { label: 'Testing & Validation', hash: '#capability' },
          { label: 'Talent Development', hash: '#capability' },
        ],
      }
    : {
        '/products': [
          { label: 'AI 调解通', hash: '#products' },
          { label: 'AI房屋管理通', hash: '#products' },
          { label: '视安盾', hash: '#products' },
          { label: '巡检小旋风', hash: '#products' },
        ],
        '/platforms': [
          { label: '临港智能系统科创平台', hash: '#platforms' },
          { label: '上海人形机器人具身智能零部件中试平台', hash: '#platforms' },
        ],
        '/services': [
          { label: '研发孵化', hash: '#capability' },
          { label: '测试验证', hash: '#capability' },
          { label: '产教融合', hash: '#capability' },
        ],
      },
)

const isActive = (path: string) => {
  if (path === '/') return isHome.value
  return route.path === path || route.path === `/en${path}`
}

watch(
  () => route.fullPath,
  () => uiStore.closeMobileMenu(),
)
</script>

<template>
  <header
    class="site-header"
    :class="{
      'site-header--transparent': useTransparentHeader,
      'site-header--solid': !useTransparentHeader,
    }"
  >
    <div class="site-container header-inner">
      <NuxtLink :to="localePath('/')" class="brand-link" aria-label="上海成电福智首页">
        <img
          class="company-logo"
          src="/images/brand/company-logo.png"
          alt="上海成电福智科技有限公司"
        />
      </NuxtLink>

      <nav class="desktop-nav" :aria-label="isEnglish ? 'Primary navigation' : '主导航'">
        <div v-for="item in content.navigation" :key="item.path" class="nav-item">
          <NuxtLink :to="localePath(item.path)" class="nav-link" :class="{ active: isActive(item.path) }">
            {{ item.label }}
            <svg v-if="childMenus[item.path]" viewBox="0 0 12 12" aria-hidden="true">
              <path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" stroke-linecap="round" />
            </svg>
          </NuxtLink>
          <div v-if="childMenus[item.path]" class="nav-dropdown">
            <NuxtLink
              v-for="child in childMenus[item.path]"
              :key="child.label"
              :to="localePath('/') + child.hash"
            >
              {{ child.label }}<span>↗</span>
            </NuxtLink>
          </div>
        </div>
      </nav>

      <div class="header-actions">
        <NuxtLink :to="switchLocalePath(isEnglish ? 'zh-CN' : 'en-US') || '/'" class="language-link">
          <span>文</span>{{ isEnglish ? '中文' : 'EN' }}
        </NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="header-cta">
          {{ isEnglish ? 'Contact us' : '合作咨询' }}<span>↗</span>
        </NuxtLink>
      </div>

      <button
        type="button"
        class="menu-toggle"
        :aria-expanded="uiStore.mobileMenuOpen"
        :aria-label="isEnglish ? 'Toggle menu' : '打开或关闭菜单'"
        @click="uiStore.toggleMobileMenu"
      >
        <span :class="{ open: uiStore.mobileMenuOpen }" />
        <span :class="{ open: uiStore.mobileMenuOpen }" />
      </button>
    </div>

    <Transition name="menu-panel">
      <div v-if="uiStore.mobileMenuOpen" class="mobile-menu">
        <div class="site-container mobile-menu-inner">
          <NuxtLink
            v-for="(item, index) in content.navigation"
            :key="item.path"
            :to="localePath(item.path)"
            class="mobile-nav-link"
          >
            <span>0{{ index + 1 }}</span>{{ item.label }}<b>↗</b>
          </NuxtLink>
          <div class="mobile-actions">
            <NuxtLink :to="switchLocalePath(isEnglish ? 'zh-CN' : 'en-US') || '/'">
              {{ isEnglish ? '切换到中文' : 'Switch to English' }}
            </NuxtLink>
            <NuxtLink :to="localePath('/contact')" class="mobile-contact">
              {{ isEnglish ? 'Start a conversation' : '发起合作咨询' }} →
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  height: 86px;
  border-bottom: 1px solid transparent;
  transition: background 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
}
.site-header--solid {
  border-color: rgba(23, 25, 21, 0.09);
  background: rgba(250, 250, 247, 0.94);
  box-shadow: 0 8px 35px rgba(28, 30, 26, 0.05);
  backdrop-filter: blur(18px);
}
.header-inner { height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 26px; }
.brand-link { display: inline-flex; min-width: 330px; align-items: center; }
.company-logo { width: 318px; height: 60px; object-fit: contain; object-position: left center; }
.site-header--transparent .desktop-nav,
.site-header--transparent .language-link { color: white; }
.desktop-nav { display: flex; align-items: center; gap: clamp(16px, 1.7vw, 30px); }
.nav-item { position: relative; }
.nav-link { position: relative; display: flex; align-items: center; gap: 4px; padding: 33px 0 30px; color: inherit; font-size: 14px; font-weight: 560; white-space: nowrap; }
.nav-link svg { width: 12px; height: 12px; transition: transform 180ms ease; }
.nav-link::after { position: absolute; right: 0; bottom: 24px; left: 0; height: 2px; content: ''; background: var(--accent); transform: scaleX(0); transform-origin: right; transition: transform 220ms ease; }
.nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); transform-origin: left; }
.nav-item:hover .nav-link svg { transform: rotate(180deg); }
.nav-dropdown { position: absolute; top: 72px; left: -28px; width: 250px; padding: 12px; border: 1px solid rgba(23,25,21,.09); border-radius: 14px; background: rgba(255,255,255,.98); box-shadow: 0 22px 55px rgba(23,25,21,.14); opacity: 0; pointer-events: none; transform: translateY(8px); transition: 180ms ease; }
.nav-item:hover .nav-dropdown, .nav-item:focus-within .nav-dropdown { opacity: 1; pointer-events: auto; transform: translateY(0); }
.nav-dropdown a { display: flex; align-items: center; justify-content: space-between; padding: 12px 13px; border-radius: 9px; color: #32352f; font-size: 13px; transition: 160ms ease; }
.nav-dropdown a:hover { color: var(--accent-dark); background: var(--accent-soft); }
.nav-dropdown span { opacity: .5; }
.header-actions { display: flex; align-items: center; gap: 18px; }
.language-link { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; white-space: nowrap; }
.language-link span { display: grid; width: 23px; height: 23px; place-items: center; border: 1px solid currentColor; border-radius: 50%; font-size: 10px; opacity: .7; }
.header-cta { display: inline-flex; align-items: center; gap: 15px; padding: 12px 17px; border-radius: 8px; color: white; background: var(--accent); font-size: 13px; font-weight: 700; box-shadow: 0 10px 26px rgba(11,77,184,.24); transition: 180ms ease; white-space: nowrap; }
.header-cta:hover { background: var(--accent-dark); transform: translateY(-1px); }
.header-cta span { font-size: 15px; }
.menu-toggle { display: none; width: 44px; height: 44px; padding: 0; border: 1px solid rgba(23,25,21,.12); border-radius: 50%; background: rgba(255,255,255,.8); }
.menu-toggle span { display: block; width: 18px; height: 1.5px; margin: 5px auto; background: var(--ink); transition: 180ms ease; }
.menu-toggle span:first-child.open { transform: translateY(3.25px) rotate(45deg); }
.menu-toggle span:last-child.open { transform: translateY(-3.25px) rotate(-45deg); }
.mobile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  z-index: 1;
  height: calc(100vh - 86px);
  height: calc(100dvh - 86px);
  overflow-y: auto;
  overscroll-behavior: contain;
  background: #f6f6f1;
  -webkit-overflow-scrolling: touch;
}
.mobile-menu-inner { padding-top: 24px; padding-bottom: 50px; }
.mobile-nav-link { display: grid; grid-template-columns: 32px 1fr auto; align-items: center; padding: 20px 3px; border-bottom: 1px solid var(--line); font-size: clamp(23px, 7vw, 34px); font-weight: 540; letter-spacing: -.03em; }
.mobile-nav-link span { color: var(--accent-dark); font-size: 10px; font-weight: 700; letter-spacing: .12em; }
.mobile-nav-link b { font-size: 17px; font-weight: 400; }
.mobile-actions { display: grid; gap: 12px; margin-top: 28px; font-size: 14px; }
.mobile-contact { padding: 16px 18px; border-radius: 8px; color: white; background: var(--accent); text-align: center; font-weight: 700; }
.menu-panel-enter-active, .menu-panel-leave-active { transition: opacity 180ms ease, transform 180ms ease; }
.menu-panel-enter-from, .menu-panel-leave-to { opacity: 0; transform: translateY(-8px); }
@media (max-width: 1180px) {
  .desktop-nav { gap: 14px; }
  .nav-link { font-size: 13px; }
  .brand-link { min-width: 270px; }
  .company-logo { width: 258px; height: 52px; }
  .header-actions { gap: 10px; }
}
@media (max-width: 1023px) {
  .site-header { height: 74px; }
  .desktop-nav, .header-actions { display: none; }
  .menu-toggle { display: block; }
  .brand-link { min-width: 0; }
  .company-logo { width: min(255px, 70vw); height: 48px; }
  .mobile-menu {
    height: calc(100vh - 74px);
    height: calc(100dvh - 74px);
  }
}
</style>
