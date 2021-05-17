import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProgramModel } from '../../objectModel/ProgramModel';
import ProgramService from '../../services/ProgramService';

const RequestProgramSelection = () => {
  const [programs, setPrograms] = useState([] as ProgramModel[]);
  // forceUpdateCount used to update key of table row
  // If key is not changed, even though value of input field changes, React only refreshes
  // new rows or reduces number of rows, but does not update 

  useEffect(() => {
    async function getData() {
      const programs = await ProgramService.list();
      setPrograms(programs);
    }
    getData();
  }, []);

  let ProgramLinks = {};

  ProgramLinks = programs.map((program, i) => {
    return <p key={`programlink-${program.code}`}><Link to={`/request/list/${program.code}`}>{program.code}</Link></p>
  })



  return (
    <div>
      {ProgramLinks}
    </div>
  );
};

export default RequestProgramSelection;
