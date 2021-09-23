import React from 'react';
import Style from './VolunteerRequestComponent.module.css';
import FieldComponent from './fieldComponents/FieldComponent';
import { FormSection } from '../../objectModel/FormModel';

interface Props {
  formSections: FormSection[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

class VolunteerRequestFormComponent extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <form className={Style.volunteerForm} onSubmit={this.props.handleSubmit}>
        {this.props.formSections.map(formSection => (
          <div key={formSection.id} className={Style.formField}>
            <h2 className={Style.informationCategory}>{formSection.label}</h2>
            <div>
              {formSection.formFields.map(formField => (
                <FieldComponent
                  key={formField.name}
                  formField={formField}
                  handleChange={() => {}}
                />
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className={Style.submit}>
          Submit
        </button>
      </form>
    );
  }
}

export default VolunteerRequestFormComponent;