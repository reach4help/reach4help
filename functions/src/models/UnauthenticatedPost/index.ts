import { FirestoreDataConverter } from '@google-cloud/firestore';
import { Allow, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { firestore } from 'firebase-admin';

import { db } from '../../app';
import { Post } from '../Post';

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

export interface IUnauthenticatedPost {
  postRef: string;
  isRequest: boolean;
  creatorSnapshot: IStrippedUser;
  title: string;
  description: string;
  latLng: ILatLngObject;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UnauthenticatedPost implements IUnauthenticatedPost {
  constructor(
    postRef: string,
    isRequest: boolean,
    creatorSnapshot: IStrippedUser,
    title: string,
    description: string,
    latLng: ILatLngObject,
    createdAt = new Date(),
    updatedAt = new Date(),
  ) {
    this._postRef = postRef;
    this._isRequest = isRequest;
    this._creatorSnapshot = creatorSnapshot;
    this._title = title;
    this._description = description;
    this._latLng = latLng;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  @ValidateNested()
  private _postRef: string;

  get postRef(): string {
    return this._postRef;
  }

  set postRef(value: string) {
    this._postRef = value;
  }

  @Allow()
  private _isRequest: boolean;

  get isRequest(): boolean {
    return this._isRequest;
  }

  set isRequest(isRequest: boolean) {
    this._isRequest = isRequest;
  }

  @IsObject()
  private _creatorSnapshot: IStrippedUser;

  get creatorSnapshot(): IStrippedUser {
    return this._creatorSnapshot;
  }

  set creatorSnapshot(value: IStrippedUser) {
    this._creatorSnapshot = value;
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

  @IsObject()
  private _createdAt: Date;

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  @IsObject()
  private _updatedAt: Date;

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  public static async fromPost(data: Post, path: string): Promise<UnauthenticatedPost> {
    return Promise.resolve(
      new UnauthenticatedPost(
        path,
        data.isRequest,
        {
          displayName: data.creatorSnapshot.displayName || '',
          displayPicture: data.creatorSnapshot.displayPicture,
        },
        data.title,
        data.description,
        {
          latitude: data.latLng.latitude,
          longitude: data.latLng.longitude,
        },
        data.createdAt.toDate(),
        data.updatedAt.toDate(),
      ),
    );
  }

  public static fromFirestore(data: DocumentData): UnauthenticatedPost {
    return new UnauthenticatedPost(
      (data.postRef as DocumentReference).path,
      data.isRequest,
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

  public static fromAlgolia(data: Record<string, any>): UnauthenticatedPost {
    return new UnauthenticatedPost(
      data.postRef,
      data.isRequest,
      data.pinUserSnapshot,
      data.title,
      data.description,
      { latitude: data._geoloc.lat, longitude: data._geoloc.lng },
      data.createdAt,
      data.updatedAt,
    );
  }

  public static fromObject(data: IUnauthenticatedPost): UnauthenticatedPost {
    return new UnauthenticatedPost(
      data.postRef,
      data.isRequest,
      data.creatorSnapshot,
      data.title,
      data.description,
      data.latLng,
      data.createdAt,
      data.updatedAt,
    );
  }

  toObject(): IUnauthenticatedPost {
    return {
      postRef: this.postRef,
      isRequest: this.isRequest,
      creatorSnapshot: this.creatorSnapshot,
      title: this.title,
      description: this.description,
      latLng: this.latLng,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toFirestore(): DocumentData {
    return {
      postRef: db.doc(this.postRef),
      isRequest: this.isRequest,
      creatorSnapshot: this.creatorSnapshot,
      title: this.title,
      description: this.description,
      latLng: new GeoPoint(this.latLng.latitude, this.latLng.longitude),
      createdAt: Timestamp.fromDate(this.createdAt),
      updatedAt: Timestamp.fromDate(this.updatedAt),
    };
  }

  toAlgolia(): object {
    return {
      postRef: this.postRef,
      isRequest: this.isRequest,
      objectID: db.doc(this.postRef).id,
      creatorSnapshot: this.creatorSnapshot,
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

export const UnauthenticatedPostFirestoreConverter: FirestoreDataConverter<UnauthenticatedPost> = {
  fromFirestore: (data: QueryDocumentSnapshot<IUnauthenticatedPost>): UnauthenticatedPost => {
    return UnauthenticatedPost.fromFirestore(data.data());
  },
  toFirestore: (modelObject: UnauthenticatedPost): DocumentData => {
    return modelObject.toFirestore();
  },
};
