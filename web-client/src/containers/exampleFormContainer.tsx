import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const ExampleFormContainer: React.FC = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: (values: Record<string, any>) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
      </label>
      {formik.touched.email && formik.errors.email && (
        <div>{formik.errors.email}</div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ExampleFormContainer;
