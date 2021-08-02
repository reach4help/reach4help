import { BeneficiariesRequestModel } from '../objectModel/BeneficiariesRequestModel';

class BeneficiariersRequestService {
  static emptyRequestJson = '{ "request": [{"name": "Neck"}] }';

  static async create(request: BeneficiariesRequestModel) {
    const requestsFromStorage = localStorage.getItem('request') || BeneficiariersRequestService.emptyRequestJson;
    const requestsJson = JSON.parse(requestsFromStorage);
    requestsJson.request.push(request);
    localStorage.setItem('request', JSON.stringify(requestsJson));
  }

  static async list() {
    const requestsFromStorage = localStorage.getItem('request') || BeneficiariersRequestService.emptyRequestJson;
    const requestsJson = JSON.parse(requestsFromStorage);
    return requestsJson.request;
  }
}

export default BeneficiariersRequestService;
