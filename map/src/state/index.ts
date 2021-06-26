import { MarkerTypeString } from '@reach4help/model/lib/markers/type';

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
  orgType?: MarkerTypeString;
  visibility?: 'visible' | 'hidden' | 'any';
  searchText?: string;
  filterExecuted?: boolean;
}

export type FilterMutator = (filter: Filter) => Filter;
