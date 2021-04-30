import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

//import ProgramService from '../../services/ProgramService';

const ProgramCreateComponent = () => {
  const { addProgram } = useAppContext();
  const [name, setName] = useState('');
  const [steps, setSteps] = useState(new Array(6).fill(''));
  const history = useHistory();
  const handleChange = e => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else {
      const attributeName = e.target.name;
      const pos = 'step'.length;
      const stepNumber = Number(attributeName.substr(pos));
      steps[stepNumber - 1] = e.target.value;
      setSteps(steps);
      console.log('steps', steps);
    }
  };
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          try {
            //ProgramService.create(name);
            addProgram(name);
            history.push('/program/list');
          } catch (err) {
            // TODO: something
            console.log(err);
          }
        }}
      >
        <div className="form-control">
          <label>
            Name
            <input
              defaultValue={name}
              onChange={e => handleChange(e)}
              type="text"
              name="name"
            />
          </label>
        </div>
        <input type="submit" value="Save" />
        <Link className="list-btn" to="/program/list">
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  );
};
export default ProgramCreateComponent;
