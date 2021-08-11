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
  validityCheckers?: ValidityChecker[];
  htmlInputAttributes?: InputHTMLAttributes<HTMLInputElement>;
};

export interface FormSection {
  id: string;
  label: string;
  formFields: FormField[];
}

export type SelectedValue = undefined | string | Set<string>;

/**
 * @param value: the form input value
 * @returns: an error message if the value is invalid, else ""
 */
export type ValidityChecker = (value: SelectedValue) => string;

export type UpdateFormData = (
  fieldName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: SelectedValue,
  checked?: boolean,
) => void;
