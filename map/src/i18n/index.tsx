import IntlMessageFormat from 'intl-messageformat';
import merge from 'lodash/merge';
import React from 'react';

import { Strings } from './iface';
import ar from './langs/ar';
import en from './langs/en';
import fr from './langs/fr';
import pt from './langs/pt';

const LOCAL_STORAGE_KEY = 'selectedLanguage';
const QUERY_PARAM = 'lang';

export const LANGUAGES = {
  en,
  // Fill in missing strings with english
  ar: merge({}, en, ar),
  fr: merge({}, en, fr),
  pt: merge({}, en, pt),
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

    if (URLSearchParams) {
      const params = new URLSearchParams(window.location.search);
      const queryLanguage = params.get(QUERY_PARAM);
      if (isValidLanguage(queryLanguage)) {
        return queryLanguage;
      }
    }

    const supportedBrowserLanguages = window.navigator.languages
      .map(l => l.split('-')[0])
      .filter(isValidLanguage);
    if (supportedBrowserLanguages.length > 0) {
      return supportedBrowserLanguages[0];
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
    localStorage.setItem(LOCAL_STORAGE_KEY, language);
    if (URLSearchParams && window.history.replaceState) {
      const params = new URLSearchParams(window.location.search);
      params.set(QUERY_PARAM, language);
      window.history.replaceState(null, '', `?${params.toString()}`);
    }
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

interface Placeholders {
  [key: string]: JSX.Element;
}

interface FormatValues {
  [key: string]: number | string;
}

const placeholderExtraction = /^([^{]*)\{(\w+)\}(.*)/;

export function t(lang: Language, extract: (s: Strings) => string): string;
export function t(
  lang: Language,
  extract: (s: Strings) => string,
  placeholders: Placeholders,
): JSX.Element[];
export function t(
  lang: Language,
  extract: (s: Strings) => string,
  placeholders?: Placeholders,
) {
  const str = extract(LANGUAGES[lang].strings);
  if (!placeholders) {
    return str;
  }
  const components: JSX.Element[] = [];
  let next: string | null = str;
  while (next) {
    const e = placeholderExtraction.exec(next);
    if (!e) {
      components.push(<span>{next}</span>);
      next = null;
    } else {
      const [, prev, placeholderTag, remaining] = e;
      components.push(<span>{prev}</span>);
      const component = placeholders[placeholderTag];
      if (!component) {
        // eslint-disable-next-line no-console
        console.log('Unknown i18n placeholder:', placeholderTag);
      }
      components.push(
        component || <span style={{ color: '#f00' }}>ERROR</span>,
      );
      next = remaining;
    }
  }
  return components;
}

const formatCache = new Map<string, Map<string, IntlMessageFormat>>();

export const format = (
  lang: Language,
  extract: (s: Strings) => string,
  values: FormatValues,
) => {
  const str = extract(LANGUAGES[lang].strings);
  let langCache = formatCache.get(lang);
  if (!langCache) {
    formatCache.set(lang, (langCache = new Map()));
  }
  let cache = langCache.get(str);
  if (!cache) {
    langCache.set(str, (cache = new IntlMessageFormat(str, lang)));
  }
  return cache.format(values);
};

export const canonicalUrl = (lang: Language) => {
  const url = new URL(window.location.href);
  url.search = '';
  url.searchParams.set(QUERY_PARAM, lang);
  return url.href;
};

export const getMeta = (lang: Language) => LANGUAGES[lang].meta;
