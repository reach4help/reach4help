import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import en from "./en-US.json"
import pt from "./pt-PT.json"
import fr from "./fr-FR.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en,
      pt,
      fr,
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
  // It's not en-US because of the language detector that apparently detects as en and not as en-US (at least for me @puzzledbytheweb)
  { value: "en", label: "English" },
  { value: "pt-PT", label: "Português" },
  { value: "fr-FR", label: "Français" },
]
