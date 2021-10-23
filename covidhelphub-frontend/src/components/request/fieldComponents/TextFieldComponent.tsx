import React from 'react';
import Style from '../VolunteerRequestComponent.module.css';
import { FormField } from '../../../objectModel/FormModel';
import { Field, ErrorMessage } from 'formik';

interface Props {
  formField: FormField;
}

function TextFieldComponent(props: Props) {
  const { formField } = props;
  return (
    <>
      <label>
        <span className={formField.required ? Style.requiredLabel : ''}>
          {formField.label}
        </span>
        <Field
          type={formField.type}
          name={formField.name}
          placeholder={formField.placeholder}
        />
        <div className={`${Style.errorMessage} ${Style.textInput}`}>
          <ErrorMessage name={formField.name} />
        </div>
      </label>
    </>
  );
}

export default TextFieldComponent;
