import React, { useState, useEffect } from 'react';
import { Program } from '../../AppContext';
import ProgramService from '../../services/ProgramService';

const ProgramListComponent = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgramCode, setNewProgramCode] = useState('');
  const [programCount, setProgramCount] = useState(0);
  const [deleted, setDeleted] = useState(false);

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
      <tr key={`item-${program.code}-${i}`}>
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
    programs.push(new Program(newProgramCode));
    setPrograms(programs);
    setNewProgramCode('');
    setProgramCount(programs.length);
  }

  function deleteArrayRow(i) {
    programs.splice(i, 1);
    setPrograms(programs);
    setProgramCount(programs.length);
    setDeleted(true);
  }

  function refreshNewProgramCode(e) {
    setNewProgramCode(e.target.value);
  }

  function revertPrograms() {
    async function getData() {
      const programs = await ProgramService.list();
      setPrograms(programs);
      setProgramCount(programs.length);
    }
    getData();
  }

  function updateArrayRow(e, i) {
    programs[i].code = e.target.value;
    setPrograms(programs);
  }

  async function refreshScreen() {
    setDeleted(false);
  }

  async function savePrograms() {
    const newPrograms = await ProgramService.saveMany(programs);
  }
  return (
    <div>
      <table className="">
        <thead>
          <tr>
            <th>Item</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{ProgramLinks}</tbody>
      </table>
      <hr />
      <div>
        <input
          type="text"
          defaultValue={newProgramCode}
          onChange={e => refreshNewProgramCode(e)}
        />
        <button onClick={addProgramToArray}>Add Item</button>
      </div>
      <br />
      <button onClick={savePrograms}>Save</button>
      <button onClick={refreshScreen}>Refresh</button>
      <button onClick={revertPrograms}>Revert</button>
    </div>
  );
};

export default ProgramListComponent;
