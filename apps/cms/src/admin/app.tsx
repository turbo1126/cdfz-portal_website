import type { StrapiApp } from '@strapi/strapi/admin';

// Strapi 管理后台汉化

export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'da',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
         'zh-Hans',
      // 'zh',
    ],
  },
  bootstrap(app: StrapiApp) {
    void app;

    if (typeof window === 'undefined') {
      return;
    }

    // Strapi scopes list-view preferences by the instance UUID. Remove the
    // pre-time-column preference once so the server-defined layout can apply.
    const migrationKey = 'cdfz:cooperation-inquiry-list-layout-v1';
    if (window.localStorage.getItem(migrationKey) === '1') {
      return;
    }

    const headerPrefix = 'STRAPI_LIST_VIEW_DISPLAYED_HEADERS:api::cooperation-inquiry.cooperation-inquiry:';
    for (let index = window.localStorage.length - 1; index >= 0; index -= 1) {
      const key = window.localStorage.key(index);
      if (key?.startsWith(headerPrefix)) {
        window.localStorage.removeItem(key);
      }
    }

    window.localStorage.setItem(migrationKey, '1');
  },
};
