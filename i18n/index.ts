import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ka from "./ka.json";

const resources = {
  en: {
    translation: en,
  },
  ka: {
    translation: ka,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Set a default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
