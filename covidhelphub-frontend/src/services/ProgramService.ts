import { Program } from '../objectModel/ProgramModel';

class ProgramService {
  static async create(code: string) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    };
    fetch('http://localhost:8080/program/create', requestOptions).then(res => {
      return res.json();
    });
  }

  static async saveMany(programs: Program[]) {
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(programs),
    // };
    // fetch('http://localhost:8080/program/savemany', requestOptions).then(
    //   res => {
    //     return res.json();
    //   },
    // );
    localStorage.setItem('programs', JSON.stringify(programs));
  }

  static async list() {
    // const response = await fetch('http://localhost:8080/program/list'); // returns promise to get Programs
    // const json = await response.json();
    // return json.data;
    const programsFromStorage = localStorage.getItem('programs') || '';
    const programsJson = JSON.parse(programsFromStorage);
    return programsJson;
  }
}

export default ProgramService;
