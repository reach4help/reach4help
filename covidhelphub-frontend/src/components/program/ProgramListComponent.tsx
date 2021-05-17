import React, { useState, useEffect } from 'react';
import { ProgramModel } from '../../objectModel/ProgramModel';
import ProgramService from '../../services/ProgramService';

const ProgramListComponent = () => {
  const [programs, setPrograms] = useState([] as ProgramModel[]);
  const [newProgramCode, setNewProgramCode] = useState('');
  const [programCount, setProgramCount] = useState(0);
  // forceUpdateCount used to update key of table row
  // If key is not changed, even though value of input field changes, React only refreshes
  // new rows or reduces number of rows, but does not update 
  const [forceUpdateCount, setForceUpdateCount] = useState(0);

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
    return (
      <tr key={`item-${program.code}-${i}=${forceUpdateCount}`}>
        <td>
          <input
            type="text"
            defaultValue={program.code}
            onChange={e => updateArrayRow(e, i)}
          />
        </td>
        <td>
          <button onClick={e => deleteArrayRow(i)}>Delete</button>
        </td>
      </tr>
    );
  });
  // }

  function addProgramToArray() {
    programs.push(new ProgramModel(newProgramCode));
    setPrograms(programs);
    setNewProgramCode('');
    setProgramCount(programs.length);
    setForceUpdateCount(forceUpdateCount + 1);
  }

  function deleteArrayRow(i: number) {
    programs.splice(i, 1);
    setPrograms(programs);
    setProgramCount(programs.length);
    setForceUpdateCount(forceUpdateCount + 1);
  }

  function refreshNewProgramCode(e: React.ChangeEvent<HTMLInputElement>) {
    setNewProgramCode(e.target.value);
  }

  function revertPrograms() {
    async function getData() {
      const programs = await ProgramService.list();
      setPrograms(programs);
      setProgramCount(programs.length);
      setForceUpdateCount(forceUpdateCount + 1);
    }
    getData();
  }

  function updateArrayRow(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    programs[i].code = e.target.value;
    setPrograms(programs);
  }

  async function savePrograms() {
    await ProgramService.saveMany(programs);
  }

  return (
    <div>
      <p>Count: {programCount}</p>
      <table className="">
        <thead>
          <tr>
            <th>Program</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{ProgramLinks}</tbody>
      </table>
      <hr />
      <div>
        <input
          key={`addnewprogramvalue-${forceUpdateCount}`}
          aria-label={'Value for new program'}
          type="text"
          defaultValue={newProgramCode}
          onChange={e => refreshNewProgramCode(e)}
        />
        <button onClick={addProgramToArray}>Add Item</button>
      </div>
      <br />
      <button onClick={savePrograms}>Save</button>
      <button onClick={revertPrograms}>Revert</button>
    </div>
  );
};

export default ProgramListComponent;
