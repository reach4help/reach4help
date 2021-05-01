import React, { useState, useEffect } from 'react';
import { Program } from '../../AppContext';
import ProgramService from '../../services/ProgramService';

const ProgramListComponent = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgramCode, setNewProgramCode] = useState('');

  useEffect(() => {
    async function getData() {
      const programs = await ProgramService.list();
      setPrograms(programs);
    }
    getData();
  }, []);

  const ProgramLinks = programs.map((program, i) => (
    <tr>
      <td>
        <input
          type="text"
          defaultValue={program.code}
          onChange={e => updateArrayRow(e, i)}
        />
      </td>
    </tr>
  ));

  function addProgramToArray() {
    programs.push(new Program(newProgramCode));
    setPrograms(programs);
    setNewProgramCode('');
  }

  function refreshNewProgramCode(e) {
    setNewProgramCode(e.target.value);
  }

  function updateArrayRow(e, i) {
    programs[i].code = e.target.value;
    setPrograms(programs);
  }

  async function savePrograms() {
    const newPrograms = await ProgramService.createMany(programs);
    console.log('new programs', newPrograms);
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
      <input
        type="text"
        value={newProgramCode}
        onChange={e => refreshNewProgramCode(e)}
      />
      <button onClick={addProgramToArray}>Add Item</button>
      <button onClick={savePrograms}>Save</button>
    </div>
  );
};

export default ProgramListComponent;
