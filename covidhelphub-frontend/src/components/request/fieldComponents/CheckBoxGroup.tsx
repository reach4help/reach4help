import React from "react";
import { Checkbox } from "antd";

// Input feedback
const InputFeedback = ({ error }: {error: string}) =>
  error ? <div className="input-feedback">{error}</div> : null;

const CheckboxGroup: React.FC<any> = ({
  field: { name, value },
  form: { errors, setFieldTouched, setFieldValue },
  label, 
  options,
  ...props
}) => {
  const handleChange = (checkedValues: any) => {
    setFieldTouched(name);
    setFieldValue(name, checkedValues);
  };

  return (
    <div className="form-group">
      <label>{label}</label> <br />
      <br />
      <Checkbox.Group
        options={options}
        defaultValue={value}
        onChange={handleChange}
      />
      <InputFeedback error={errors[name]} />
    </div>
  );
};

export default CheckboxGroup;