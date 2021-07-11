export class RequestModel {
  constructor(request: {
    requestorName: string;
    address: string;
    email: string;
    phone: string;
    programCode: string;
    // figure out how to make this required for init values, required otherwise
    flexibleDate?: Date;
    targetDate?: Date;
  }) {
    this.requestorName = request.requestorName;
    this.address = request.address;
    this.email = request.email;
    this.phone = request.phone;
    this.programCode = request.programCode;
    this.flexibleDate = request.flexibleDate;
    this.targetDate = request.targetDate;
  }
  requestorName: string;
  address: string;
  email: string;
  phone: string;
  programCode: string;
  flexibleDate?: Date;
  targetDate?: Date;
  stageCode: string = 'Open';
  creationTs: Date = new Date();
  modificationTs: Date = new Date();
}
