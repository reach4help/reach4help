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
          fetch('http://localhost:3000/api/program/create', {
            method: 'POST',
            body: JSON.stringify({ name }),
          });
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
