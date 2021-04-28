class ProgramService {
    static async list() {
      const response = await fetch('http://localhost:8080/program/list'); // returns promise to get Programs
      const json = await response.json();
      return json.data;
    };
}

export default ProgramService;
