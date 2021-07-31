import React from 'react';
import GetInvolved from './GetInvolved';

const EXAMPLE_OFFER_OPTIONS = [
  {
    label: 'Grocery shopping errands',
    value: 'grocery',
  },
  {
    label: 'Make phone calls to elderly people',
    value: 'elderly',
  },
  {
    label: 'Take someone to vaccination appointment',
    value: 'vaccination',
  },
  {
    label: 'Participate in Walk & Talk Program',
    value: 'walk&talk',
  },
  {
    label: 'Participate in Wise Connections seniors tech training program',
    value: 'tech',
  }
];

const EXAMPLE_PERSONAL = [
  {
    type: 'text',
    name: 'name',
    label: 'Name',
    required: true,
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    required: true,
  },
  {
    type: 'tel',
    name: 'phone',
    label: 'Phone Number',
  },
  {
    type: 'text',
    name: 'address',
    label: 'Address',
  },
  {
    type: 'text',
    name: 'postal',
    label: 'Postal Code',
  },
];

const EXAMPLE_VOLUNTEERING = [
  {
    type: 'checkbox',
    name: 'offer',
    label: 'What I would like to do:',
    options: EXAMPLE_OFFER_OPTIONS,
  },
];

const EXAMPLE_FORM = [
  {
    id: 'volunteer-info',
    label: 'Personal Information',
    formFields: EXAMPLE_PERSONAL,
  },
  {
    id: 'volunteer-info',
    label: 'Volunteering Information',
    formFields: EXAMPLE_VOLUNTEERING,
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
        formSections={this.getData()}
        handleChange={(fieldName: string, value: any) => {}}
      />
    );
  }
}

export default VolunteerRequestComponent;
