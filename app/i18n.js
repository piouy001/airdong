import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import resources from "./locales";

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  fallbackLng: "ko",
  defaultNS: "default",
  interpolation: { escapeValue: true },
  returnObjects: true,
  returnEmptyString: true,
  returnNull: true,
});

export default i18n;
