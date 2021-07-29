import React from 'react';
import Style from './VolunteerRequestComponent.module.css';
import { FormSection, UpdateFormData } from '../../objectModel/FormModel';
import FieldComponent from './FieldComponent';

// export default function GetInvolved() {
//     return (
//         <div className={Style.getInvolved}>
//             Get Involved
//         </div>
//     )
// }

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
        <h2>Get Involved</h2>
        <form className={Style.volunteerForm}>
          {formSections.map(formSection => (
            <div key={formSection.id}>
              <h2>{formSection.label}</h2>
              {formSection.formFields.map(formField => (
                <FieldComponent
                  key={formField.id}
                  formField={formField}
                  handleChange={handleChange}
                />
              ))}
            </div>
          ))}
        </form>
      </div>
    );
  }
}

export default GetInvolved;
