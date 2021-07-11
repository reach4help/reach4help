import React, { useState, useEffect } from 'react';
import { RequestModel } from '../../objectModel/RequestModel';
import RequestService from '../../services/RequestService';
import { Link, useHistory, useParams } from 'react-router-dom';
import StageService from '../../services/StageService';
import { StageModel } from '../../objectModel/StageModel';

const RequestListComponent = () => {
  const [requests, setRequests] = useState([] as RequestModel[]);
  const [stages, setStages] = useState([] as StageModel[]);
  const history = useHistory();
  const { programCode, stageCode = "Open" } = useParams<{ programCode: string, stageCode: string }>();


  useEffect(() => {
    async function getData() {
      const requests = await RequestService.list();
      setRequests(requests);
      const stages = await StageService.list()
      setStages(stages);
    }
    getData();
  }, []);

  let RequestLinks = {};
  // TODO: move styling to CSS or define at bottom
  const StageButtons = stages.map(stage => {
    const fontWeight = stage.code.toUpperCase() === stageCode.toUpperCase() ? "bold" : "normal";
    return <Link key={`stage-${stage.code}`} to={`/request/list/${programCode}/${stage.code}`} style={{ padding: "0px 50px 0px 0px", fontWeight: `${fontWeight}` }}> {stage.code}</Link >
  })
  RequestLinks = requests.filter(request => request.programCode === programCode.toUpperCase()).map((requestObj, i) => {
    return (
      <tr key={`requestrow-${requestObj.requestorName}-${i}`}>
        <td>{requestObj.targetDate}</td>
        <td>{requestObj.flexibleDate}</td>
        <td>{requestObj.creationTs}</td>
        <td>{requestObj.requestorName}</td>
        <td>{requestObj.address}</td>
        <td>{requestObj.phone}</td>
        <td>{requestObj.email}</td>
        <td><button>Email Blast</button></td>
      </tr>
    );
  });

  function addRequest() {
    history.push('/request/create');
  }

  // TODO: move styling to CSS file
  return (
    <div>
      <button onClick={addRequest}>Add</button>
      <p>Program: {programCode}</p>
      <div style={{ padding: "20px 0px" }}>{StageButtons}</div>

      <table className="">
        <thead>
          <tr>
            <th>Target Date</th>
            <th>Flexible Date</th>
            <th>Submitted Date</th>
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
