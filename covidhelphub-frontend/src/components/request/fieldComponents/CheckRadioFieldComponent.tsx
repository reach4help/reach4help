import React from 'react';
import Style from '../VolunteerRequestComponent.module.css';
import {
  multiFieldSet,
  FormField,
  HandleFormFieldInvalid,
  HandleFormFieldChange,
} from '../../../objectModel/FormModel';

interface Props {
  formField: FormField;
  handleInvalid: HandleFormFieldInvalid;
  handleChange: HandleFormFieldChange;
}

interface State {
  atLeastOneSelected: boolean;
}

class CheckRadioFieldComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      atLeastOneSelected: false,
    };
    this.updateAtLeastOneSelected = this.updateAtLeastOneSelected.bind(this);
  }

  updateAtLeastOneSelected(selected: boolean) {
    this.setState({ atLeastOneSelected: selected });
  }

  public render() {
    const { formField, handleInvalid, handleChange } = this.props;
    return (
      <fieldset>
        <legend className={formField.required ? Style.requiredLabel : ''}>
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
                  required={
                    formField.required && !this.state.atLeastOneSelected
                  }
                  value={option.value}
                  checked={option.default}
                  onChange={e => {
                    handleChange(
                      multiFieldSet.has(formField.type),
                      formField.name,
                      e,
                      formField.validityChecker,
                      this.updateAtLeastOneSelected,
                    );
                  }}
                  onInvalid={e => handleInvalid(e)}
                />
                <span>{option.label}</span>
              </div>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }
}

export default CheckRadioFieldComponent;