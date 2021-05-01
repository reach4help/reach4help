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
  console.log('figuring out program links', programs);
  // if (deleted) {
  //   ProgramLinks = <p>Deleted</p>;
  // } else {
  ProgramLinks = programs.map((program, i) => {
    console.log('adding to link', program.code);
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
    console.log('deleting', i);
    console.log('debug 1', programs);
    console.log('debug 2', programs[i]);
    programs.splice(i, 1);
    console.log('debug 3', programs);
    console.log('debug 4', programs[i]);
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
    console.log('new programs', newPrograms);
  }
  console.log('programs', programs, ProgramLinks);
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
