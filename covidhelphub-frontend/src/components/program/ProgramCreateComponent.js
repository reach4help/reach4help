import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const ProgramCreateComponent = () => {
  const [name, setName] = useState('');
  const history = useHistory();
  const handleChange = e => {
    setName(e.target.value);
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name  })
        };
          fetch('http://localhost:8080/program/create', requestOptions)
          .then(res => {
            return res.json();
          }
          )
          .then(json => {

            if (json.err) {
              // do something
            }
            else {
              history.push('/program/list')
            }
          })
          .catch (err => { 
            alert (`catch ${err}`);
          }

          );

        }}
      >
        <div className="form-control">
          <label>
            Name
            <input
              value={name}
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
