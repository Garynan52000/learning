import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: { // https://docs.strapi.io/cms/admin-panel-customization#available-customizations
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
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
      'zh',
    ],
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
