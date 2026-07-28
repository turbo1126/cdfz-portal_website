export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n', '@vueuse/nuxt'],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
      defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE || 'zh-CN',
    },
    internalStrapiUrl: process.env.NUXT_INTERNAL_STRAPI_URL || 'http://localhost:1337',
  },
  app: {
    head: {
      title: '上海成电福智官方网站',
      meta: [
        {
          name: 'description',
          content: '上海成电福智科技有限公司官方网站，展示公司定位、创新平台、核心产品与合作联系信息。',
        },
      ],
    },
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'zh-CN',
    detectBrowserLanguage: false,
    locales: [
      { code: 'zh-CN', name: '简体中文', file: 'zh-CN.json' },
      { code: 'en-US', name: 'English', file: 'en-US.json' },
    ],
    langDir: '../i18n/locales',
  },
})
