import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { firestore } from 'firebase-admin';

import { db } from '../../app';
import { Request } from '../requests';

import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import GeoPoint = firestore.GeoPoint;
import Timestamp = firestore.Timestamp;

interface IStrippedUser {
  displayName: string;
  displayPicture: string | null;
}

interface ILatLngObject {
  latitude: number;
  longitude: number;
}

export interface IUnauthenticatedRequest {
  requestRef: string;
  userSnapshot: IStrippedUser;
  title: string;
  description: string;
  latLng: ILatLngObject;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UnauthenticatedRequest implements IUnauthenticatedRequest {
  constructor(
    requestRef: string,
    userSnapshot: IStrippedUser,
    title: string,
    description: string,
    latLng: ILatLngObject,
    createdAt = new Date(),
    updatedAt = new Date(),
  ) {
    this._requestRef = requestRef;
    this._userSnapshot = userSnapshot;
    this._title = title;
    this._description = description;
    this._latLng = latLng;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  @ValidateNested()
  private _requestRef: string;

  get requestRef(): string {
    return this._requestRef;
  }

  set requestRef(value: string) {
    this._requestRef = value;
  }

  @IsObject()
  private _userSnapshot: IStrippedUser;

  get userSnapshot(): IStrippedUser {
    return this._userSnapshot;
  }

  set pinUserSnapshot(value: IStrippedUser) {
    this._userSnapshot = value;
  }

  @IsString()
  @IsNotEmpty()
  private _title: string;

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  @IsString()
  private _description: string;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  @IsObject()
  private _latLng: ILatLngObject;

  get latLng(): ILatLngObject {
    return this._latLng;
  }

  set latLng(value: ILatLngObject) {
    this._latLng = value;
  }

  /* TODO: When we reach greater than 500 requests created per second:
     https://firebase.google.com/docs/firestore/solutions/shard-timestamp#sharding_a_timestamp_field
   */
  @IsObject()
  private _createdAt: Date;

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  /* TODO: When we reach greater than 500 requests updated per second:
     https://firebase.google.com/docs/firestore/solutions/shard-timestamp#sharding_a_timestamp_field
   */
  @IsObject()
  private _updatedAt: Date;

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  public static async fromRequest(data: Request, path: string): Promise<UnauthenticatedRequest> {
    return Promise.resolve(new UnauthenticatedRequest(
      path,
      {
        displayName: data.pinUserSnapshot.displayName || '',
        displayPicture: data.pinUserSnapshot.displayPicture,
      },
      data.title,
      data.description,
      {
        latitude: data.latLng.latitude,
        longitude: data.latLng.longitude,
      },
      data.createdAt.toDate(),
      data.updatedAt.toDate(),
    ));
  }

  public static fromFirestore(data: DocumentData): UnauthenticatedRequest {
    return new UnauthenticatedRequest(
      (data.requestRef as DocumentReference).path,
      data.userSnapshot,
      data.title,
      data.description,
      {
        latitude: (data.latLng as GeoPoint).latitude,
        longitude: (data.latLng as GeoPoint).longitude,
      },
      data.createdAt.toDate(),
      data.updatedAt.toDate(),
    );
  }

  public static fromAlgolia(data: Record<string, any>): UnauthenticatedRequest {
    return new UnauthenticatedRequest(
      data.requestRef,
      data.pinUserSnapshot,
      data.title,
      data.description,
      { latitude: data._geoloc.lat, longitude: data._geoloc.lng },
      data.createdAt,
      data.updatedAt,
    );
  }

  public static fromObject(data: IUnauthenticatedRequest): UnauthenticatedRequest {
    return new UnauthenticatedRequest(data.requestRef, data.userSnapshot, data.title, data.description, data.latLng, data.createdAt, data.updatedAt);
  }

  toObject(): IUnauthenticatedRequest {
    return {
      requestRef: this.requestRef,
      userSnapshot: this.userSnapshot,
      title: this.title,
      description: this.description,
      latLng: this.latLng,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toFirestore(): DocumentData {
    return {
      requestRef: db.doc(this.requestRef),
      userSnapshot: this.userSnapshot,
      title: this.title,
      description: this.description,
      latLng: new GeoPoint(this.latLng.latitude, this.latLng.longitude),
      createdAt: Timestamp.fromDate(this.createdAt),
      updatedAt: Timestamp.fromDate(this.updatedAt),
    };
  }

  toAlgolia(): object {
    return {
      requestRef: this.requestRef,
      objectID: db.doc(this.requestRef).id,
      userSnapshot: this.userSnapshot,
      title: this.title,
      description: this.description,
      _geoloc: {
        lat: this.latLng.latitude,
        lng: this.latLng.longitude,
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export const UnauthenticatedRequestFirestoreConverter: FirestoreDataConverter<UnauthenticatedRequest> = {
  fromFirestore: (data: QueryDocumentSnapshot<IUnauthenticatedRequest>): UnauthenticatedRequest => {
    return UnauthenticatedRequest.fromFirestore(data.data());
  },
  toFirestore: (modelObject: UnauthenticatedRequest): DocumentData => {
    return modelObject.toFirestore();
  },
};
