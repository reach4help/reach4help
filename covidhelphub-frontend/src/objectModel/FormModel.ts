import { InputHTMLAttributes } from 'react';

export const textFieldSet = new Set([
  'color',
  'date',
  'datetime-local',
  'email',
  'month',
  'number',
  'password',
  'tel',
  'text',
  'time',
  'url',
  'week',
]);

export const checkRadioFieldSet = new Set(['checkbox', 'radio']);

export const multiFieldSet = new Set(['checkbox']);

export interface FieldOption {
  label: string;
  value: string;
  default?: boolean;
}

export type FormField = {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  options?: FieldOption[];
  validityChecker?: ValidityChecker;
  htmlInputAttributes?: InputHTMLAttributes<HTMLInputElement>;
};

export interface FormSection {
  id: string;
  label: string;
  formFields: FormField[];
}

/**
 * @param e: an HTML form event
 * @returns: an error message if the value is invalid, else ""
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidityChecker = (e: React.FormEvent<any>) => string;

export type UpdateAtLeastOneSelected = (selected: boolean) => void;

export type HandleFormFieldInvalid = (e: React.FormEvent<any>) => void;

export type HandleFormFieldChange = (
  isMulti: boolean,
  fieldName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  e: React.FormEvent<any>,
  validityChecker?: ValidityChecker,
  updateAtLeastOneSelected?: UpdateAtLeastOneSelected,
) => void;
