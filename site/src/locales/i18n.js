import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import en from "./en-US.json"
import pt from "./pt-PT.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en-US",
    resources: {
      en,
      pt,
    },
    ns: ["common"],
    defaultNS: "common",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

export const LANGUAGES = [
  { value: "en-US", label: "English" },
  { value: "pt-PT", label: "Português" },
]
