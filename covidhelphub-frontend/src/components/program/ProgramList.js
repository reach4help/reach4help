import React, { useEffect, useState } from 'react';

const Programs = () => {
  // NOTE on React Hook: useState is used by React Hooks to create state variables and
  // setter function for component
  const [programs, setPrograms] = useState([]);

  // ==== Fetch Programs into Programs variable ===
  // NOTE on React Hook: useEffect: syntax by React Hooks. Code is called when component mounts,
  // or is updated
  useEffect(() => {
    fetch('http://localhost:8080/program/list') // returns promise to get Programs
      .then(res => res.json())
      .then(data => {
        setPrograms(data);
      });
  }, []);

  const ProgramsLinks = programs.map(program => (
     <li key={`Program${program.programUUID}`}>
       {program.name}
     </li>
   ))

  // === return fragment with a h4 and the list of Programs.
  return (
    <div>
      <h4>Programs!</h4>
      <ul>
          {ProgramsLinks}
        </ul> 
    </div>
  );
};
export default Programs;
