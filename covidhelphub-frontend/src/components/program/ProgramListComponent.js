import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import ProgramService from '../services/ProgramService';
import { useAppContext } from '../../AppContext';

const ProgramListComponent = () => {
  // NOTE on React Hook: useState is used by React Hooks to create state variables and
  // setter function for component
  const { listPrograms } = useAppContext();

  const [programs, setPrograms] = useState([]);

  // ==== Fetch Programs into Programs variable ===
  // NOTE on React Hook: useEffect: syntax by React Hooks. Code is called when component mounts,
  // or is updated
  useEffect(() => {
    async function getData() {
      const programs = listPrograms();
      setPrograms(programs);
    }
    getData();
  }, [programs]);

  const ProgramLinks = programs.map(program => (
    <tr>
      <td>
        <Link
          key={`Program${program}`}
          to={{ pathname: '/program/display', name: program }}
        >
          {program}
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
