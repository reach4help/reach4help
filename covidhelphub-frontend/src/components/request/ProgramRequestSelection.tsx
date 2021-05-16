import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProgramModel } from '../../objectModel/ProgramModel';
import ProgramService from '../../services/ProgramService';

const ProgramListComponent = () => {
  const [programs, setPrograms] = useState([] as ProgramModel[]);
  const [programCount, setProgramCount] = useState(0);
  // forceUpdateCount used to update key of table row
  // If key is not changed, even though value of input field changes, React only refreshes
  // new rows or reduces number of rows, but does not update 

  useEffect(() => {
    async function getData() {
      const programs = await ProgramService.list();
      setPrograms(programs);
      setProgramCount(programs.length);
    }
    getData();
  }, []);

  let ProgramLinks = {};

  ProgramLinks = programs.map((program, i) => {
    return <p><Link to={`/request/list/${program.code}`}>{program.code}</Link></p>
  })



  return (
    <div>
      <p>Count: {programCount}</p>
      {ProgramLinks}
    </div>
  );
};

export default ProgramListComponent;
