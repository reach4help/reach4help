import { useFormik } from 'formik';
import React from 'react';

const ExampleFormContainer: React.FC = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
    },
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
          value={formik.values.email}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ExampleFormContainer;
