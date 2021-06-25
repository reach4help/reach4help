import {
  MarkerTypeString as OrgTypeString,
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
export type FilterOptions = 'orgType' | 'services' | 'visibility';

export interface Filter {
  orgType?: OrgTypeString;
  services?: Service;
  visibility?: VisibilityOptions;
}

export type FilterMutator = (filter: Filter) => Filter;
export type UpdateFilter = (
  option: string,
  value: string,
) => void;
