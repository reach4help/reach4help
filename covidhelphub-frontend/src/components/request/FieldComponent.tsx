import React from 'react';
import { FormField, UpdateFormData } from '../../objectModel/FormModel';

interface Props {
  formField: FormField;
  handleChange: UpdateFormData;
}

const textFieldSet = new Set([
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

const multiFieldSet = new Set(['checkbox', 'radio']);

class FieldComponent extends React.Component<Props, {}> {
  public render() {
    const { formField, handleChange } = this.props;

    if (textFieldSet.has(formField.type)) {
      return (
        <label>
          <span>{formField.label}</span>
          <input
            type={formField.type}
            id={formField.id}
            name={formField.name}
            value={formField.value}
            required={formField.required}
            placeholder={formField.placeholder}
            onChange={e => {
              handleChange(formField.name, e.target.value);
            }}
          />
        </label>
      );
    }
    if (multiFieldSet.has(formField.type)) {
      return (
        <fieldset>
          <legend>{formField.label}</legend>
          {formField.options?.map(option => (
            <label key={option.id}>
              <span>{option.label}</span>
              <input
                type={formField.type}
                value={option.value}
                checked={option.default}
              />
            </label>
          ))}
        </fieldset>
      );
    }

    return null;
  }
}

export default FieldComponent;
