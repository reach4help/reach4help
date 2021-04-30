import React, { useContext, useState, createContext } from 'react';

const appContext = createContext(
  {
    addProgram: (code: string) => { },
    listPrograms: () => [] as Program[]
  }
);

export class Program {
  constructor(code: String) {
    this.code = code
  }
  code: String
}

export const AppContextProvider = ({ children }: { children: any }) => {
  const data = { data: { programs: [] as Program[] } };
  const [db, setDb] = useState(data);
  const addProgram = (code: String) => {
    db.data.programs.push(new Program(code));
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
