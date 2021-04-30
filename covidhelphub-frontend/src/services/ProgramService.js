class Program {
  constructor(name) {
    this.name = name;
    this.uuid = new Date().toISOString();
  }
  uuid;
  name;
}

class ProgramService {
  static programs = [];
  programs = [];

  static async list() {
    return ProgramService.programs;
  }
  //static async create(name) {
  // const program = new Program(name);
  // console.log('programs', ProgramService.programs);
  // await programs.push(program);
  //return program;
  //}
}

export default ProgramService;
