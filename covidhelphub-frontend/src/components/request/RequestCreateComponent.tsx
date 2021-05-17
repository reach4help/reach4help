import React, { useState } from "react";
import RequestService from "../../services/RequestService";
import { RequestModel } from "../../objectModel/RequestModel"
import { useHistory } from "react-router-dom";

const RequestCreateComponent = () => {
  const initialRequestState: RequestModel = new RequestModel({
    requestorName: "",
    address: "",
    phone: "",
    programCode: "",
    email: "",
  });
  const [requestObj, setRequestObj] = useState(initialRequestState);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();


  const handleInputChange = (event: { target: { name: string; value: string; }; }) => {
    const { name, value } = event.target;
    setRequestObj({ ...requestObj, [name]: value });
  };

  const TextInputField = ({ fieldName, labelText }: { fieldName: string, labelText: string }) => {
    return (
      <div className="form-group">
        <label htmlFor={fieldName}>{labelText}</label>
        <input
          type="text"
          className="form-control"
          id={fieldName}
          required
          onChange={handleInputChange}
          name={fieldName}
        />
      </div>
      // <div className="form-group">
      //   <label htmlFor={fieldName}>Name</label>
      //   <input
      //     type="text"
      //     className="form-control"
      //     id={fieldName}
      //     required
      //     defaultValue={defaultValue}
      //     onChange={handleInputChange}
      //     name={fieldName}
      //   />
      // </div>
    );
  }

  const saveRequest = async () => {
    const data = new RequestModel({
      requestorName: requestObj.requestorName,
      address: requestObj.address,
      phone: requestObj.phone,
      programCode: requestObj.programCode,
      email: requestObj.email,
      flexibleDate: requestObj.flexibleDate,
      targetDate: requestObj.targetDate,
    });

    await RequestService.create(data);
    history.push("/request/list")

  };

  const newRequest = () => {
    setRequestObj(initialRequestState);
    setSubmitted(false);
  };


  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newRequest}>
            Add
          </button>
        </div>
      ) : (
        <div>
          {TextInputField({ fieldName: "requestorName", labelText: "Name" })}
          {TextInputField({ fieldName: "address", labelText: "Address" })}
          {TextInputField({ fieldName: "phone", labelText: "Phone" })}
          {TextInputField({ fieldName: "programCode", labelText: "Program Code" })}
          {TextInputField({ fieldName: "email", labelText: "Email" })}

          <div className="form-group">
            <label htmlFor="targetDate">Target Date</label>
            <input
              type="date"
              className="form-control"
              id="targetDate"
              required
              onChange={handleInputChange}
              name="targetDate"
            />
          </div>

          <div className="form-group">
            <label htmlFor="flexibleDate">Flexible  Date</label>
            <input
              type="date"
              className="form-control"
              id="flexibleDate"
              required
              onChange={handleInputChange}
              name="flexibleDate"
            />
          </div>

          <button onClick={saveRequest} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestCreateComponent;