export interface FipsScrappedData {
  stateRegistrationNumber: string;
  applicationNumber: string;
  expirationDate: string;
  applicationDate: string;
  registrationDate: string;
  publicationDate: string;
  imgUrl: string;
  holderName: string;
  classLevel: string;
  standardisedDates: StandardisedDates;
}

interface StandardisedDates {
  applicationDate: string;
  registrationDate: string;
  publicationDate: any;
  expirationDate: string;
}
