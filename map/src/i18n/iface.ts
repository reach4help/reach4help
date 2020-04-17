/**
 * Interface containing all the strings throughout the application that we want
 * to have translated
 */
export interface Strings {
  title: string;
  info: string;
  about: string;
  githubSourceLabel: string;
  mdAdd1: string;
  mdAdd2: string;
  buttons: {
    fullScreen: string;
    exitFullScreen: string;
  };
  filter: string;
  services: {
    any: string;
    support: string;
    financial: string;
    food: string;
    information: string;
    manufacturing: string;
    medicine: string;
    mobility: string;
    supplies: string;
    shelter: string;
    network: string;
  };
  markerTypes: {
    'mutual-aid-group': string;
    org: string;
    financial: string;
    information: string;
    other: string;
  };
  lang: string;
  langSelect: string;
  footer: {
    netlifyNote: string;
    natlifyLinkText: string;
    githubRepo: string;
    codeOfConduct: string;
  };
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

type PartialStrings = RecursivePartial<Strings>;

interface L<Strings> {
  meta: {
    name: string;
  };
  strings: Strings;
}

export type Language = L<Strings>;
export type PartialLanguage = L<PartialStrings>;
