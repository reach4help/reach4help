import React from 'react';
import Style from '../VolunteerRequestComponent.module.css';
import {
  FormField,
  HandleFormFieldInvalid,
  HandleFormFieldChange,
} from '../../../objectModel/FormModel';
import { Field, ErrorMessage } from 'formik';

interface Props {
  formField: FormField;
  // handleInvalid: HandleFormFieldInvalid;
  // handleChange: HandleFormFieldChange;
}

function TextFieldComponent (props: Props) {
  // const { formField, handleInvalid, handleChange } = this.props;
  const { formField } = props;
  return (
    <>
      <label>
        <span className={formField.required ? Style.requiredLabel : ''}>
          {formField.label}
        </span>
        {/* <input
          {...formField.htmlInputAttributes}
          type={formField.type}
          name={formField.name}
          required={formField.required}
          onChange={e => {
            handleChange(false, formField.name, e, formField.validityChecker);
          }}
          onInvalid={e => handleInvalid(e)}
        /> */}
        <Field
          type={formField.type}
          name={formField.name} 
        />
      </label>
      <ErrorMessage name={formField.name}/>
    </>
  );
}

export default TextFieldComponent;
