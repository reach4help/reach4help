import React from 'react';
import Style from './VolunteerRequestComponent.module.css';
import FieldComponent from './fieldComponents/FieldComponent';
import {
  EXAMPLE_FORM,
  EXAMPLE_INITAL_VALUES,
  EXAMPLE_SCHEMA,
} from './VolunteerRequestData';
import { Formik, Form } from 'formik';

function VolunteerRequestComponent() {
  /**
   * Gets the form field data from the back end
   * TODO: complete the function
   */
  const getData = () => {
    return {
      form: EXAMPLE_FORM,
      initialValues: EXAMPLE_INITAL_VALUES,
      schema: EXAMPLE_SCHEMA,
    };
  };

  const { form: formSections, initialValues, schema } = getData();

  return (
    <div className={Style.getInvolved}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        <Form className={Style.volunteerForm}>
          {formSections.map(formSection => (
            <div key={formSection.id} className={Style.formField}>
              <h2 className={Style.informationCategory}>{formSection.label}</h2>
              <div>
                {formSection.formFields.map(formField => (
                  <FieldComponent
                    key={formField.name}
                    formField={formField}
                  />
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className={Style.submit}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default VolunteerRequestComponent;
