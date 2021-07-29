import React from 'react';
import Style from '../beneficiariesRequest/BeneficiariesRequestComponet.module.css';
import { FormField, UpdateFormData } from '../../objectModel/FormModel';
import FieldComponent from './FieldComponent';

// export default function GetInvolved() {
//     return (
//         <div className={Style.getInvolved}>
//             Get Involved
//         </div>
//     )
// }

interface Props {
  formFields: FormField[];
  handleChange: UpdateFormData;
}

interface State {
  formData: any;
}

class GetInvolved extends React.Component<Props, {}> {
  public render() {
    const { formFields, handleChange } = this.props;
    return (
      <div className={Style.getInvolved}>
        <h2>Get Involved</h2>
        <form className="">
          {formFields.map(formField => (
            <FieldComponent
              key={formField.id}
              formField={formField}
              handleChange={handleChange}
            />
          ))}
        </form>
      </div>
    );
  }
}

export default GetInvolved;
