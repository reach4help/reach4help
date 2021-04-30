import React, { useContext, useState, createContext } from 'react';

const appContext = createContext(
  {
    addProgram: (code: string) => { },
    listPrograms: () => [] as string[]
  }
);

export const AppContextProvider = ({ children }: { children: any }) => {
  const data = { data: { programs: [] as string[] } };
  const [db, setDb] = useState(data);
  const addProgram = (code: string) => {
    db.data.programs.push(code);
    console.log('debug', db.data.programs);
    setDb(db);
  };
  const listPrograms = () => {
    return db.data.programs;
  };
  return (
    <appContext.Provider value={{ addProgram, listPrograms }}>
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
