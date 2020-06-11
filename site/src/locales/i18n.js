import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./en-US.json"
import pt from "./pt-PT.json"

i18n.use(initReactI18next).init({
  lng: "pt",
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

export const LANGUAGES = ["en", "pt"]
