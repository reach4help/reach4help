import { StepModel } from '../objectModel/StepModel';

class StepService {
  // static async create(code: string) {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ code }),
  //   };
  //   fetch('http://localhost:8080/list/create', requestOptions).then(res => {
  //     return res.json();
  //   });
  // }

  static async saveMany(steps: StepModel[]) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ steps }),
    };
    fetch('http://localhost:8080/step/savemany', requestOptions).then(res => {
      return res.json();
    });
  }

  static async list() {
    const fetchPromise = await fetch('http://localhost:8080/step/list'); // returns promise to get Steps
    const json = await fetchPromise.json();
    return json.data;
  }
}

export default StepService;
