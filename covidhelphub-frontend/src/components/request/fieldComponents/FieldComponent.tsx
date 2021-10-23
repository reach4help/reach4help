import React from 'react';
import {
  textFieldSet,
  checkRadioFieldSet,
  FormField,
} from '../../../objectModel/FormModel';

import CheckRadioFieldComponent from './CheckRadioFieldComponent';
import TextFieldComponent from './TextFieldComponent';


interface Props {
  formField: FormField;
}

function FieldComponent(props: Props) {
  const { formField } = props;

  if (textFieldSet.has(formField.type)) {
    return (
      <TextFieldComponent
        formField={formField}
      />
    );
  }
  if (checkRadioFieldSet.has(formField.type)) {
    return (
      <CheckRadioFieldComponent
        formField={formField}
      />
    );
  }
  return null;
}

export default FieldComponent;
