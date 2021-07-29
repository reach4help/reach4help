export interface FieldOption {
  id: string;
  label: string;
  value: string;
  default?: boolean;
}

export type FormField = Partial<HTMLInputElement> & {
  id: string;
  type: string;
  name: string;
  label: string;
  options?: FieldOption[];
}

export interface FormSection {
  id: string;
  label: string;
  formFields: FormField[];
}

export type UpdateFormData = (
  fieldName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
) => void;