import React from 'react';
import Style from './VolunteerRequestComponent.module.css';
import { FormField, UpdateFormData } from '../../objectModel/FormModel';

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

interface Props {
  formField: FormField;
  handleChange: UpdateFormData;
}

class FieldComponent extends React.Component<Props> {
  private filterFormField(formField: FormField) {}

  public render() {
    const { formField, handleChange } = this.props;

    if (textFieldSet.has(formField.type)) {
      return (
        <label>
          <span
            className={
              formField.required ? Style.requiredLabel : ''
            }
          >
            {formField.label}
          </span>
          <input
            {...formField.htmlInputAttributes}
            type={formField.type}
            name={formField.name}
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
          <legend
            className={
              formField.required ? Style.requiredLabel : ''
            }
          >
            {formField.label}
          </legend>
          <div className={Style.optionList}>
            {formField.options?.map(option => (
              <label key={option.value}>
                <div className={Style.option}>
                  <input
                    {...formField.htmlInputAttributes}
                    type={formField.type}
                    name={formField.name}
                    value={option.value}
                    checked={option.default}
                    onChange={e => {
                      handleChange(
                        formField.name,
                        e.target.value,
                        e.target.checked,
                      );
                    }}
                  />
                  <span>{option.label}</span>
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      );
    }

    return null;
  }
}

export default FieldComponent;
