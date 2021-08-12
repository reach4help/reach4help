import { InputHTMLAttributes } from 'react';

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

export type HandleFormFieldChange = (
  isMulti: boolean,
  fieldName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  e: React.FormEvent<any>,
  validityChecker?: ValidityChecker,
) => void;
