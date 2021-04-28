import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProgramService from '../services/ProgramService';

const ProgramListComponent = () => {
  // NOTE on React Hook: useState is used by React Hooks to create state variables and
  // setter function for component
  const [programs, setPrograms] = useState([]);

  // ==== Fetch Programs into Programs variable ===
  // NOTE on React Hook: useEffect: syntax by React Hooks. Code is called when component mounts,
  // or is updated
  useEffect(() => {
    async function getData() {
      const programs = await ProgramService.list();
      setPrograms(programs);
    }
    getData();
  }, []);

  const ProgramLinks = programs.map(program => (
    <tr>
      <td>
        <Link key={`Program${program.name}`} to={{ pathname: '/program/display', name: program.name }}>
          {program.name}
        </Link>
      </td>
    </tr>
  ));

  // === return fragment with a h4 and the list of Programs.
  return (
    <div>
      <header className="list-header">
        <h4>Programs</h4>
        <Link className="list-btn" to="/program/create">
          <button>Add</button>
        </Link>
      </header>
      <table>
        <tr>
          <th>Name</th>
        </tr>
        {ProgramLinks}
      </table>
    </div>
  );
};
export default ProgramListComponent;
