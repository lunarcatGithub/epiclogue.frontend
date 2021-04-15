import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const userLanguage = typeof window !== 'undefined' && window.navigator.language;

    i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    fallbackLng: userLanguage || 'en',
    debug: true,

    interpolation: {
        escapeValue: false,
    },
    backend: {
        loadPath: '/locales/{{lng}}/common.json',
    }
    });
export default i18n;