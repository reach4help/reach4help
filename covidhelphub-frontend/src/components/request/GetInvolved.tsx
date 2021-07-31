import React from 'react';
import Style from './VolunteerRequestComponent.module.css';
import { FormSection, UpdateFormData } from '../../objectModel/FormModel';
import FieldComponent from './FieldComponent';

interface Props {
  formSections: FormSection[];
  handleChange: UpdateFormData;
}

interface State {
  formData: any;
}

class GetInvolved extends React.Component<Props, {}> {
  public render() {
    const { formSections, handleChange } = this.props;
    return (
      <div className={Style.getInvolved}>
        <form className={Style.volunteerForm}>
          {formSections.map(formSection => (
            <div key={formSection.id} className={Style.formField}>
              <h2 className={Style.informationCategory}>{formSection.label}</h2>
              <div>
                {formSection.formFields.map(formField => (
                  <FieldComponent
                    key={formField.name}
                    formField={formField}
                    handleChange={handleChange}
                  />
                ))}
              </div>
            </div>
          ))}
        </form>
      </div>
    );
  }
}

export default GetInvolved;
