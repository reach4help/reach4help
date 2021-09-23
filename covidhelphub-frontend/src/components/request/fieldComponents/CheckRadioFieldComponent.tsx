import React from 'react';
import Style from '../VolunteerRequestComponent.module.css';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import {
  multiFieldSet,
  FormField,
  HandleFormFieldInvalid,
  HandleFormFieldChange,
} from '../../../objectModel/FormModel';
import * as Yup from 'yup';
import { Field, ErrorMessage } from 'formik';

interface Props {
  formField: FormField;
  // handleInvalid: HandleFormFieldInvalid;
  // handleChange: HandleFormFieldChange;
}

// interface State {
//   atLeastOneSelected: boolean;
// }

function CheckRadioFieldComponent (props: Props) {
  // constructor(props: Props) {
  //   super(props);
  //   // this.state = {
  //   //   atLeastOneSelected: false,
  //   // };
  //   // this.updateAtLeastOneSelected = this.updateAtLeastOneSelected.bind(this);
  // }

  // updateAtLeastOneSelected(selected: boolean) {
  //   this.setState({ atLeastOneSelected: selected });
  // }

  // const field = (
  //   <Field
  //     name={formField.name}
  //     component={CheckboxGroup}
  //     options={formField.options}
  //     label={formField.label}
  //   />
  // );

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
                {/* <input
                  {...formField.htmlInputAttributes}
                  type={formField.type}
                  name={formField.name}
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
                /> */}
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
        <ErrorMessage name={formField.name}/>
      </fieldset>
      // <Field
      //   name={formField.name}
      //   component={CheckboxGroup}
      //   options={formField.options}
      //   label={formField.label}
      // />
    );
}

export default CheckRadioFieldComponent;
