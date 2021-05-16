import React, { useState, useEffect } from 'react';
import { RequestModel } from '../../objectModel/RequestModel';
import RequestService from '../../services/RequestService';
import { Link, useHistory, useParams } from 'react-router-dom';
import StepService from '../../services/StepService';
import { StepModel } from '../../objectModel/StepModel';

const RequestListComponent = () => {
  const [requests, setRequests] = useState([] as RequestModel[]);
  const [steps, setSteps] = useState([] as StepModel[]);
  const history = useHistory();
  const { programCode } = useParams<{ programCode: string }>();

  // forceUpdateCount used to update key of table row
  // If key is not changed, even though value of input field changes, React only refreshes
  // new rows or reduces number of rows, but does not update 

  useEffect(() => {
    async function getData() {
      const requests = await RequestService.list();
      setRequests(requests);
      const steps = await StepService.list()
      setSteps(steps);
    }
    getData();
  }, []);

  let RequestLinks = {};
  const StepButtons = steps.map(step => {
    return <Link to={`/request/list/${step.code}`} style={{ padding: "0px 50px 0px 0px" }}> {step.code}</Link >
  })
  RequestLinks = requests.filter(request => request.programCode === programCode).map((request, i) => {
    return (
      <tr key={`item-${request.requestorName}-${i}`}>
        <td>{request.requestorName}</td>
        <td>{request.address}</td>
        <td>{request.phone}</td>
        <td>{request.email}</td>

      </tr>
    );
  });

  function addRequest() {
    history.push('/request/create');
  }


  return (
    <div>
      <button onClick={addRequest}>Add</button>
      <p>Program: {programCode}</p>
      <div style={{ padding: "20px 0px" }}>{StepButtons}</div>

      <table className="">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{RequestLinks}</tbody>
      </table>
      <hr />
      <br />
    </div>
  );
};

export default RequestListComponent;
