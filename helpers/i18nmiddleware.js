const i18n = require('i18next');
const i18nMiddleware = require('i18next-express-middleware');
const i18nFsBackend = require('i18next-node-fs-backend');

i18n
  .use(i18nMiddleware.LanguageDetector)
  .use(i18nFsBackend)
  .init({
    preload: ['en'],
    fallbackLng: 'en',
    // debug: true,
    ns: ['translation'],
    defaultNS: 'translation',
    fallbackNS: 'translation',
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.yml',
    },
    detection: {
      order: [/* 'path', 'session', */'querystring', 'cookie', 'header'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18n',
      lookupPath: 'lng',
      lookupFromPathIndex: 0,
    },
  });

module.exports = i18nMiddleware.handle(i18n, {
  ignoreRoutes: ['public/'],
  removeLngFromUrl: false,
});
