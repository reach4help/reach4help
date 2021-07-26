export class BeneficiariesRequestModel {
  // 1- personal properties
  name: string;
  address: string;
  zipcode: string;
  email: string;
  phone: string;
  dob: Date; // date of birth
  reference: string; // how did you hear about us?

  // 2- health details properties
  weakImuneSystem: boolean; // Do you have weakened Immune System?
  chronicIllness: boolean; // Do you have Chronic Illness?
  livingAlone: boolean; // Do you live alone with limited support network?
  sickWithCovid: boolean; // Are you currently sick or with Covid-19 symptoms?
  moreDetails?: string; // If you would like to explain your situation, or would like to share more details, please write it here.

  // 3- program details
  helpType: string;
  groceryDelivery: string; 
  miscellaneous?: string;

  // constructor methode
  constructor(
    request: {
      name: string;
      address: string;
      zipcode: string; // zip code can contain letters
      email: string;
      phone: string;
      dob: Date; // date of birth
      reference: string; // how did you hear about us?

      // health details properties
      weakImuneSystem: boolean;
      chronicIllness: boolean;
      livingAlone: boolean;
      sickWithCovid: boolean;
      moreDetails?: string;

      // program details
      helpType: string;
      groceryDelivery: string; 
      miscellaneous?: string;

    }
  ) {
    this.name = request.name;
    this.address = request.address;
    this.zipcode = request.zipcode;
    this.email = request.email;
    this.phone = request.phone;
    this.dob = request.dob; // date of birth
    this.reference = request.reference;

    // health details properties
    this.weakImuneSystem = request.weakImuneSystem;
    this.chronicIllness = request.chronicIllness;
    this.livingAlone = request.livingAlone;
    this.sickWithCovid = request.sickWithCovid;
    this.moreDetails = request.moreDetails;

    // program details
    this.helpType = request.helpType;
    this.groceryDelivery = request.groceryDelivery;
    this.miscellaneous = request.miscellaneous;
  }
}
