import React, { useState, useEffect } from 'react';
import { Program, useAppContext } from '../../AppContext';
import ProgramService from '../../services/ProgramService';

const DynamicTable = () => {
  const { listPrograms } = useAppContext();
  const [programs, setPrograms] = useState([]);
  const [newProgramCode, setNewProgramCode] = useState('');

  useEffect(() => {
    async function getData() {
      console.log('there');
      const programs = await ProgramService.list();
      console.log('done setting programs');
      setPrograms(programs);
    }
    console.log('Here');
    getData();
  }, []);

  const ProgramLinks = programs.map(program => (
    <tr>
      <td>{program.code}</td>
    </tr>
  ));
  console.log('program links', ProgramLinks);

  function addProgramToArray() {
    programs.push(new Program(newProgramCode));
    setPrograms(programs);
    setNewProgramCode('');
    console.log('Programs', programs);
  }

  function refreshNewProgramCode(e) {
    setNewProgramCode(e.target.value);
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
        <tbody>{ProgramLinks}</tbody> */}
      </table>
      <hr />
      <input
        type="text"
        value={newProgramCode}
        onChange={e => refreshNewProgramCode(e)}
      />
      <button onClick={addProgramToArray}>Add Item</button>
      <button onClick={savePrograms}>Add Item</button>
    </div>
  );
};

export default DynamicTable;
