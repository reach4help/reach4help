import React from 'react';
import Style from './VolunteerRequestComponent.module.css';
import FieldComponent from './FieldComponent';

const YES_NO_OPTIONS = [
  {
    label: 'Yes',
    value: 'true',
  },
  {
    label: 'No',
    value: 'false',
  },
];

const EXAMPLE_PERSONAL = [
  {
    type: 'text',
    name: 'name',
    label: 'Full Name',
    placeholder: 'Full Name',
    required: true,
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    required: true,
  },
  {
    type: 'tel',
    name: 'phone',
    label: 'Phone Number',
    placeholder: 'Phone Number',
  },
  {
    type: 'text',
    name: 'address',
    label: 'Address',
    placeholder: 'Address',
  },
  {
    type: 'text',
    name: 'postal',
    label: 'Postal Code',
    placeholder: 'Postal Code',
    required: true,
    className: Style.zipcodeInput,
  },
  {
    type: 'checkbox',
    name: 'languages',
    label: 'Languages spoken with conversational proficiency',
    options: [
      {
        label: 'English',
        value: 'english',
      },
      {
        label: 'French',
        value: 'french',
      },
    ],
  },
];

const EXAMPLE_VOLUNTEERING = [
  {
    type: 'checkbox',
    name: 'offer',
    required: true,
    label: 'What I would like to do:',
    options: [
      {
        label: 'Run grocery shopping errands',
        value: 'grocery',
      },
      {
        label: 'Make phone calls to elderly people',
        value: 'phone',
      },
      {
        label: 'Take someone to vaccination appointment',
        value: 'vaccine',
      },
      {
        label: 'Participate in Walk & Talk Program',
        value: 'walk&talk',
      },
      {
        label: 'Participate in Wise Connections seniors tech training program',
        value: 'tech',
      },
    ],
  },
  {
    type: 'number',
    name: 'time',
    label: 'Time commitment per week (approximate):',
    placeholder: 'Hours',
  },
  {
    type: 'radio',
    name: 'license',
    label: "Do you have access to a vehicle and/or have a driver's license?",
    options: [
      {
        label: 'I have a car and a license',
        value: 'carlicense',
      },
      {
        label: 'I have another vehicle type and a license',
        value: 'otherlicense',
      },
      {
        label: 'I have a license but no vehicle',
        value: 'license',
      },
      {
        label: 'I have a bike',
        value: 'bike',
      },
      {
        label: 'I do not have a vehicle or license',
        value: 'none',
      },
    ],
  },
];

const EXAMPLE_HEALTH = [
  {
    type: 'radio',
    name: 'covid',
    label:
      'Are you currently sick with COVID-19 or experiencing any COVID-19 symptoms?',
    required: true,
    options: YES_NO_OPTIONS,
  },
  {
    type: 'radio',
    name: 'contactedcovid',
    label:
      'Have you been in close contact with someone with COVID-19 or someone who may have COVID-19?',
    required: true,
    options: YES_NO_OPTIONS,
  },
  {
    type: 'radio',
    name: 'travelledcovid',
    label:
      'Have you travelled abroad in the past two weeks or been in close contact with someone who has?',
    required: true,
    options: YES_NO_OPTIONS,
  },
];

const EXAMPLE_FORM = [
  {
    id: 'personal-info',
    label: 'Personal Information',
    formFields: EXAMPLE_PERSONAL,
  },
  {
    id: 'volunteering-info',
    label: 'Volunteering Information',
    formFields: EXAMPLE_VOLUNTEERING,
  },
  {
    id: 'health-info',
    label: 'COVID-19 Health Information',
    formFields: EXAMPLE_HEALTH,
  },
];

interface Props {}

interface State {
  formData: any;
}

class VolunteerRequestComponent extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      formData: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Gets the form field data from the back end
   * TODO: complete the function
   */
  private getData = () => {
    return EXAMPLE_FORM;
  };

  handleChange = (fieldName: string, value: any) => {
    return;
  };

  public render() {
    const formSections = this.getData();

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
                    handleChange={this.handleChange}
                  />
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className={Style.submit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default VolunteerRequestComponent;
