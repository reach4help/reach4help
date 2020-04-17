import merge from 'lodash/merge';

import { Strings } from './iface';
import en from './langs/en';
import ru from './langs/ru';

const LOCAL_STORAGE_KEY = 'selectedLanguage';

export const LANGUAGES = {
  en,
  // Fill in missing russian strings with english
  ru: merge({}, en, ru),
};

export type Language = keyof typeof LANGUAGES;

export const LANGUAGE_KEYS = Object.keys(LANGUAGES) as Language[];

export const isValidLanguage = (lang: string | null): lang is Language =>
  !!(lang && lang in LANGUAGES);

class I18nManager {
  private currentLanguage: Language | null = null;

  private listeners = new Set<(lang: Language) => void>();

  public constructor() {
    window.addEventListener('storage', e => {
      if (e.key === LOCAL_STORAGE_KEY) {
        this.checkLanguage();
      }
    });
  }

  private checkLanguage() {
    const oldLanguage = this.currentLanguage;
    this.currentLanguage = null;
    const newLanguage = this.getLanguage();
    if (oldLanguage !== newLanguage) {
      this.listeners.forEach(l => l(newLanguage));
    }
  }

  private calculateLanguage = (): Language => {
    const selectedLanguage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (isValidLanguage(selectedLanguage)) {
      return selectedLanguage;
    }

    const queryLanguage = window.location.href.split('/')[3];
    if (isValidLanguage(queryLanguage)) {
      return queryLanguage;
    }

    const browserLanguage = window.navigator.language.split('-')[0];
    if (isValidLanguage(browserLanguage)) {
      return browserLanguage;
    }

    return 'en';
  };

  public getLanguage = (): Language => {
    if (!this.currentLanguage) {
      this.currentLanguage = this.calculateLanguage();
    }
    return this.currentLanguage;
  };

  public setLanguage = (language: Language) => {
    localStorage.setItem('selectedLanguage', language);
    this.checkLanguage();
  };

  public addListener = (listener: (lang: Language) => void) => {
    this.listeners.add(listener);
  };

  public removeListener = (listener: (lang: Language) => void) => {
    this.listeners.delete(listener);
  };
}

const manager = new I18nManager();

export const { getLanguage } = manager;
export const { setLanguage } = manager;
export const { addListener } = manager;
export const { removeListener } = manager;

export const t = (lang: Language, extract: (s: Strings) => string): string =>
  extract(LANGUAGES[lang].strings);
