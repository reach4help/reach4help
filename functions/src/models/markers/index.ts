import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsArray, IsObject, IsString } from 'class-validator';
import { firestore } from 'firebase';
// TODO: Decide how to add this in.
// eslint-disable-next-line import/no-extraneous-dependencies
import { MarkerType } from 'map/src/data';
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

/**
 * Contact details capture various methods to contact an organization.
 */
export interface ContactDetails {
  facebookGroup?: string;
  web?: { [id: string]: string }; // List of URLs
  phone?: string[];
  email?: string[];
}

/**
 * Locations can be saved so they can be re-used for other markers.
 *
 * See the LOCATIONS array.
 */
export interface Location {
  /**
   * Human readable name for the location -- displayed on the web.
   */
  description: string;
  lat: number;
  lng: number;
  /**
   *  Measured in Meters (per Google Maps standard)
   */
  serviceRadius: number;
}

export interface ContactGroup {
  /** general contact information */
  general?: ContactDetails;
  /** details of how those that need help can interact with the organization  */
  getHelp?: ContactDetails;
  /** details of how those who want to help can interact with the organization  */
  volunteers?: ContactDetails;
}

/**
 * A marker that will be rendered on the map. A short title and description is also visible to users.
 *
 * It contains an array of services
 */
export interface IMarker extends DocumentData {
  /** name of the organization or community effort */
  contentTitle: string;
  /** description of the organization or community effort */
  contentBody?: string;
  /** a list of services provided -- at least one is required :
   *  food | supplies | aid | mobility | medicine | manufacturing | financial | information
   */
  type: MarkerType;
  /**
   * the different avenues with which to contact an organization,
   * depending on your desired involvement
   */
  contact: ContactGroup;
  /**
   * The location data for this organization
   */
  loc: Location;
}

export class Marker implements IMarker {
  constructor(contact: ContactGroup, contentTitle: string, contentBody: string, loc: Location, type: MarkerType) {
    this._contact = contact;
    this._contentTitle = contentTitle;
    this._contentBody = contentBody;
    this._loc = loc;
    this._type = type;
  }

  @IsObject()
  private _contact: ContactGroup;

  get contact(): ContactGroup {
    return this._contact;
  }

  set contact(value: ContactGroup) {
    this._contact = value;
  }

  @IsString()
  private _contentBody: string;

  get contentBody(): string {
    return this._contentBody;
  }

  set contentBody(value: string) {
    this._contentBody = value;
  }

  @IsString()
  private _contentTitle: string;

  get contentTitle(): string {
    return this._contentTitle;
  }

  set contentTitle(value: string) {
    this._contentTitle = value;
  }

  @IsObject()
  private _loc: Location;

  get loc(): Location {
    return this._loc;
  }

  set loc(value: Location) {
    this._loc = value;
  }

  @IsArray()
  private _type: MarkerType;

  get type(): MarkerType {
    return this._type;
  }

  set type(value: MarkerType) {
    this._type = value;
  }

  static factory = (data: IMarker): Marker => {
    return new Marker(
      data.contact,
      data.contentTitle,
      data.contentBody || '',
      data.loc,
      data.type,
    );
  };

  toObject(): object {
    return {
      contact: this.contact,
      contentTitle: this.contentTitle,
      contentBody: this.contentBody,
      loc: this.loc,
      services: this.type,
    };
  }
}

export const MarkerFirestoreConverter: FirestoreDataConverter<Marker> = {
  fromFirestore(data: QueryDocumentSnapshot<IMarker>): Marker {
    return Marker.factory(data.data());
  },
  toFirestore(modelObject: Marker): DocumentData {
    return modelObject.toObject();
  },
};
