import { MarkerTypeString, Service } from '@reach4help/model/lib/markers/type';

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
  markerTypes?: MarkerTypeString;
  services?: Service;
  hiddenMarkers?: 'visible' | 'hidden' | 'any';
  searchText?: string;
  filterExecuted?: boolean;
}

export type UpdateFilter = (
  fieldName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
) => void;
