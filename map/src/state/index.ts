import { MarkerTypeString } from 'src/data';

export type Page =
  | {
      page: 'about';
    }
  | {
      page: 'map';
    }
  | {
      page: 'add-information';
      step: AddInfoStep;
    };

export type AddInfoStep =
  | 'information'
  | 'place-marker'
  | 'contact-details'
  | 'submitted';

export interface Filter {
  type?: MarkerTypeString;
  visibility?: 'visible' | 'hidden' | 'any';
}

export type FilterMutator = (filter: Filter) => Filter;
