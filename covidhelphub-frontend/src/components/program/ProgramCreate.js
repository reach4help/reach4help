import React, { useState } from 'react';

const Home = () => {
  const [name, setName] = useState('');
  const handleChange = e => {
    setName(e.target.value);
  };
  return (
    <div className="container">
      <form
        onSubmit={() => {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name  })
        };
          console.log("Name", name);
          fetch('http://localhost:8080/program/create', requestOptions)
           .then(res => console.log('res',res));
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
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};
export default Home;
