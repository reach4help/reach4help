import { RequestModel } from '../objectModel/RequestModel';

class RequestService {
  static emptyRequestJson = '{ "requests": [{"requestorName": "Ethan"}] }';

  static async create(request: RequestModel) {
    const requestsFromStorage =
      localStorage.getItem('requests') || RequestService.emptyRequestJson;
    const requestsJson = JSON.parse(requestsFromStorage);
    requestsJson.requests.push(request);
    console.log('Saving', requestsJson, 'r', request);
    localStorage.setItem('requests', JSON.stringify(requestsJson));
  }

  static async list() {
    const requestsFromStorage =
      localStorage.getItem('requests') || RequestService.emptyRequestJson;
    console.log('request', requestsFromStorage);
    const requestsJson = JSON.parse(requestsFromStorage);
    return requestsJson.requests;
  }
}

export default RequestService;
