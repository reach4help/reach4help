import React from 'react';
import {
  textFieldSet,
  checkRadioFieldSet,
  FormField,
  HandleFormFieldChange,
} from '../../../objectModel/FormModel';

import CheckRadioFieldComponent from './CheckRadioFieldComponent';
import TextFieldComponent from './TextFieldComponent';


interface Props {
  formField: FormField;
  handleChange: HandleFormFieldChange;
}

class FieldComponent extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      atLeastOneSelected: false,
    };
    this.handleInvalid = this.handleInvalid.bind(this);
  }

  handleInvalid(e: React.FormEvent<any>) {
    if (this.props.formField.validityChecker) {
      e.currentTarget.setCustomValidity('');
      e.currentTarget.setCustomValidity(
        this.props.formField.validityChecker(e),
      );
    }
  }

  public render() {
    const { formField, handleChange } = this.props;

    if (textFieldSet.has(formField.type)) {
      return (
        <TextFieldComponent
          formField={formField}
          handleInvalid={this.handleInvalid}
          handleChange={handleChange}
        />
      );
    }
    if (checkRadioFieldSet.has(formField.type)) {
      return (
        <CheckRadioFieldComponent
          formField={formField}
          handleInvalid={this.handleInvalid}
          handleChange={handleChange}
        />
      );
    }
    return null;
  }
}

export default FieldComponent;
