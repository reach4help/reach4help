import React from 'react';
import Style from '../VolunteerRequestComponent.module.css';
import {
  FormField,
  HandleFormFieldInvalid,
  HandleFormFieldChange,
} from '../../../objectModel/FormModel';

interface Props {
  formField: FormField;
  handleInvalid: HandleFormFieldInvalid;
  handleChange: HandleFormFieldChange;
}

class TextFieldComponent extends React.Component<Props> {
  public render() {
    const { formField, handleInvalid, handleChange } = this.props;
    return (
      <label>
        <span className={formField.required ? Style.requiredLabel : ''}>
          {formField.label}
        </span>
        <input
          {...formField.htmlInputAttributes}
          type={formField.type}
          name={formField.name}
          required={formField.required}
          onChange={e => {
            handleChange(false, formField.name, e, formField.validityChecker);
          }}
          onInvalid={e => handleInvalid(e)}
        />
      </label>
    );
  }
}

export default TextFieldComponent;
