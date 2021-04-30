import React, { useContext, useState, createContext } from 'react';

const appContext = createContext([]);

export const AppContextProvider = ({ children }) => {
  const data = { data: { programs: [] } };
  const [db, setDb] = useState(data);
  const addProgram = name => {
    db.data.programs.push(name);
    console.log('debug', db.data.programs);
    setDb(db);
  };
  const listPrograms = () => {
    return db.data.programs;
  };
  return (
    <appContext.Provider value={{ db, addProgram, listPrograms }}>
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
