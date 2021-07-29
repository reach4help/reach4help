import React from 'react';
import GetInvolved from './GetInvolved';

const EXAMPLE_FORM = [
  {
    type: 'text',
    id: 'volunteer-name',
    name: 'name',
    label: 'Name',
    required: true,
  },
  {
    type: 'email',
    id: 'volunteer-email',
    name: 'email',
    label: 'Email',
  },
];

class VolunteerRequestComponent extends React.Component<{}, {}> {
  /**
   * Gets the form field data from the back end
   * TODO: complete the function
   */
  private getData = () => {
    return EXAMPLE_FORM;
  };

  public render() {
    return (
      <GetInvolved
        formFields={this.getData()}
        handleChange={(fieldName: string, value: any) => {}}
      />
    );
  }
}

export default VolunteerRequestComponent;
