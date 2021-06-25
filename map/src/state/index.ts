import {
  MarkerTypeString,
  Service,
} from '@reach4help/model/lib/markers/type';

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

export type VisibilityOptions = 'visible' | 'hidden' | 'any';

export interface Filter {
  markerTypes?: MarkerTypeString;
  services?: Service;
  hiddenMarkers?: VisibilityOptions;
  searchText?: string;
  filterExecuted?: boolean;
}

export type FilterMutator = (filter: Filter) => Filter;
export type UpdateFilter = (
  fieldName: string,
  value: any,
) => void;
