export interface Strings {
  title: string;
  info: string;
  source1: string;
  source2: string;
  source3: string;
  source4: string;
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
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type PartialStrings = RecursivePartial<Strings>;
