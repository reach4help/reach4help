export class Request {
  constructor(request: {
    requestorName: string;
    address: string;
    email: string;
    phone: string;
    programCode: string;
  }) {
    this.requestorName = request.requestorName;
    this.address = request.address;
    this.email = request.email;
    this.phone = request.phone;
    this.programCode = request.programCode;
    this.stepCode = 'START';
  }
  requestorName: string;
  address: string;
  email: string;
  phone: string;
  programCode: string;
  stepCode: string;
}
