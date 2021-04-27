import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProgramListComponent = () => {
  // NOTE on React Hook: useState is used by React Hooks to create state variables and
  // setter function for component
  const [programs, setPrograms] = useState([]);

  // ==== Fetch Programs into Programs variable ===
  // NOTE on React Hook: useEffect: syntax by React Hooks. Code is called when component mounts,
  // or is updated
  useEffect(() => {
    fetch('http://localhost:8080/program/list') // returns promise to get Programs
      .then(res => res.json())
      .then(json => {
        setPrograms(json.data);
      });
  }, []);

  const ProgramsLinks = programs.map(program => (
    <tr>
      <td>
        <Link to={{ pathname: '/program/display', name: program.name }}>
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
        {ProgramsLinks}
      </table>
    </div>
  );
};
export default ProgramListComponent;
