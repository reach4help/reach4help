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
    email: ""
  });
  const [requestObj, setRequestObj] = useState(initialRequestState);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleInputChange = (event: { target: { name: string; value: string; }; }) => {
    const { name, value } = event.target;
    setRequestObj({ ...requestObj, [name]: value });
  };

  const saveRequest = async () => {
    const data = new RequestModel({
      requestorName: requestObj.requestorName,
      address: requestObj.address,
      phone: requestObj.phone,
      programCode: requestObj.programCode,
      email: requestObj.email
    });
    console.log("Data", data, "obj", requestObj);

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
          <div className="form-group">
            <label htmlFor="requestorName">Name</label>
            <input
              type="text"
              className="form-control"
              id="requestorName"
              required
              defaultValue={requestObj.requestorName}
              onChange={handleInputChange}
              name="requestorName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              required
              defaultValue={requestObj.address}
              onChange={handleInputChange}
              name="address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              required
              defaultValue={requestObj.phone}
              onChange={handleInputChange}
              name="phone"
            />
          </div>

          <div className="form-group">
            <label htmlFor="programCode">Program Code</label>
            <input
              type="text"
              className="form-control"
              id="programCode"
              required
              defaultValue={requestObj.programCode}
              onChange={handleInputChange}
              name="programCode"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              defaultValue={requestObj.programCode}
              onChange={handleInputChange}
              name="email"
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