import { Step } from '../objectModel/StepModel';

class StepService {
  static async create(code: string) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    };
    fetch('http://localhost:8080/list/create', requestOptions).then(res => {
      return res.json();
    });
  }

  static async saveMany(steps: Step[]) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(steps),
    };
    fetch('http://localhost:8080/step/savemany', requestOptions).then(res => {
      return res.json();
    });
  }

  static async list() {
    const response = await fetch('http://localhost:8080/step/list'); // returns promise to get Steps
    const json = await response.json();
    return json.data;
  }
}

export default StepService;
