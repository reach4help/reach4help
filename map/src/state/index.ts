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
