import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ka from "./ka.json";

export const supportedLanguages = [
  //   { code: "en", name: "English", label: "EN" },
  { code: "ka", name: "Georgian", label: "KA" },
];

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
  lng: "ka", // Set a default language
  fallbackLng: "ka",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
