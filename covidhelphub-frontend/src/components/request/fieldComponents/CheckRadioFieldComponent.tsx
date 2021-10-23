import React from 'react';
import Style from '../VolunteerRequestComponent.module.css';
import { FormField } from '../../../objectModel/FormModel';
import { Field, ErrorMessage } from 'formik';

interface Props {
  formField: FormField;
}

function CheckRadioFieldComponent(props: Props) {
  const { formField } = props;
  return (
    <fieldset>
      <legend className={formField.required ? Style.requiredLabel : ''}>
        {formField.label}
      </legend>
      <div className={Style.optionList}>
        {formField.options?.map(option => (
          <label key={option.value}>
            <div className={Style.option}>
              <Field
                type={formField.type}
                name={formField.name}
                value={option.value}
              />
              <span>{option.label}</span>
            </div>
          </label>
        ))}
      </div>
      <div className={Style.errorMessage}>
        <ErrorMessage name={formField.name} />
      </div>
    </fieldset>
  );
}

export default CheckRadioFieldComponent;
