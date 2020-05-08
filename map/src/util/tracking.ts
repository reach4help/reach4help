declare global {
  interface Window {
    _paq: Array<
      | ['trackEvent', string, string]
      | ['trackEvent', string, string, string]
      | ['trackEvent', string, string, string, number]
    >;
  }
}

export function trackEvent(
  category: 'data-entry',
  action:
    | 'complete-info'
    | 'complete-info-error'
    | 'complete-placement'
    | 'complete-placement-error'
    | 'complete-contact-info'
    | 'complete-contact-info-error'
    | 'add-more',
): void;
export function trackEvent(
  category: 'config',
  action: 'change-language',
  language: string,
): void;
export function trackEvent(
  category: 'nav',
  action: 'add-info' | 'back-to-map',
): void;
export function trackEvent(category: 'nav', action: 'main', page: string): void;
export function trackEvent(category: 'cta', action: 'home-map'): void;
export function trackEvent(
  category: string,
  action: string,
  eventName?: string,
  value?: number,
) {
  if (value && eventName) {
    window._paq.push(['trackEvent', category, action, eventName, value]);
  } else if (eventName) {
    window._paq.push(['trackEvent', category, action, eventName]);
  } else {
    window._paq.push(['trackEvent', category, action]);
  }
}
