import { StageModel } from '../objectModel/StageModel';

class StageService {
  // static async saveMany(stages: StageModel[]) {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ stages }),
  //   };
  //   fetch('http://localhost:8080/stage/savemany', requestOptions).then(res => {
  //     return res.json();
  //   });
  // }

  // static async list() {
  //   const fetchPromise = await fetch('http://localhost:8080/stage/list'); // returns promise to get Stages
  //   const json = await fetchPromise.json();
  //   return json.data;
  // }

  static async saveMany(stages: StageModel[]) {
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
    localStorage.setItem('stages', JSON.stringify(stages));
  }

  static async list() {
    // const response = await fetch('http://localhost:8080/stage/list'); // returns promise to get stages
    // const json = await response.json();
    // return json.data;
    const stagesFromStorage = localStorage.getItem('stages') || '';
    const stagesJson = JSON.parse(stagesFromStorage);
    return stagesJson;
  }
}

export default StageService;
