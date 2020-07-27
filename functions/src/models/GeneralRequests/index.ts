import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsArray, IsString, IsEnum } from 'class-validator';
import { firestore } from 'firebase-admin';

import { db } from '../../app';

import { IRequest, Request, RequestStatus } from '../requests';
import { ITimelineItem, TimelineItem } from '../requests/timeline';
import { IUnauthenticatedRequest, UnauthenticatedRequest } from '../UnauthenticatedRequests'
import { IOfferWithLocation, OfferWithLocation } from '../offers/offersWithLocation';
import { User } from '../users';

import GeoPoint = firestore.GeoPoint;
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import { IOffer } from '../offers';

interface IStrippedUser {
  displayName: string;
  displayPicture: string | null;
  rating: number | null;
}

export interface IGeneralRequest extends IUnauthenticatedRequest {
  userRef: string | null;
  userSnapshot: IStrippedUser;
  status: RequestStatus;
  participants: string[] | null;
  streetAddress: string;
}

export class GeneralRequest extends UnauthenticatedRequest implements IGeneralRequest {
  constructor(
    requestRef: string,
    userSnapshot: IStrippedUser,
    title: string,
    description: string,
    latLng: IGeneralRequest["latLng"],
    userRef: string,
    status: RequestStatus,
    participants: string[] = [],
    streetAddress: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(
      requestRef,
      userSnapshot,
      title,
      description,
      latLng,
      createdAt,
      updatedAt
    );
    this._userRef = userRef;
    this._status = status;
    this._participants = participants;
    this._streetAddress = streetAddress;
  }

  @IsString()
  private _userRef: string;

  get userRef(): string {
    return this._userRef;
  }

  set userRef(userRef: string) {
    this._userRef = userRef;
  }

  @IsArray()
  private _participants: string[];

  get participants(): string[] {
    return this._participants;
  }

  set participants(participants: string[]) {
    this._participants = participants;
  }

  public addParticipants(participant: string) {
    if (!this._participants.includes(participant)) {
      this._participants.push(participant)
    }
  }

  public removeParticipant(participant: string) {
    this._participants.splice(this._participants.indexOf(participant), 1);
  }

  @IsEnum(RequestStatus)
  private _status: RequestStatus;

  get status(): RequestStatus {
    return this._status;
  }

  set status(status: RequestStatus) {
    this._status = status;
  }

  @IsString()
  private _streetAddress: string;

  get streetAddress(): string {
    return this._streetAddress;
  }

  set streetAddress(streetAddress: string) {
    this._streetAddress = streetAddress;
  }

  public static fromRequest(data: Request, path: string, participants: string[] = []): GeneralRequest {

    if (participants.length < 1) {
      const offersData = await db.collection('offers')
                    .where('requestRef', '==', db.doc(path))
                    .get();
      participants.push(data.pinUserRef.path);
      for (const doc of offersData.docs) {
        participants.push((doc.data() as IOffer).cavUserRef.path);
      }
    }
    
    return new GeneralRequest(
      path,
      {
        displayName: data.pinUserSnapshot.displayName || '',
        displayPicture: data.pinUserSnapshot.displayPicture,
        rating: (data.pinUserSnapshot.pinRatingsReceived/data.pinUserSnapshot.requestsMade)
      },
      data.title,
      data.description,
      {
        latitude: data.latLng.latitude,
        longitude: data.latLng.longitude,
      },
      data.pinUserRef.path,
      data.status,
      participants,
      data.streetAddress,
      data.createdAt.toDate(),
      data.updatedAt.toDate(),
    );
  }

  public static fromFirestore(data: DocumentData, ref: DocumentReference): UnauthenticatedRequest {
    return new UnauthenticatedRequest(
      ref.path,
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
    );
  }

  public static fromAlgolia(data: Record<string, any>): UnauthenticatedRequest {
    return new UnauthenticatedRequest(
      data.requestRef,
      data.pinUserSnapshot,
      data.title,
      data.description,
      { latitude: data['_geoloc'].lat, longitude: data['_geoloc'].lng },
      data.updatedAt,
    );
  }

  toRawObject(): IUnauthenticatedRequest {
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
      createdAt: Timestamp.fromDate(this.createdAt),
      updatedAt: Timestamp.fromDate(this.updatedAt),
    };
  }
}

export const RequestWithOffersFirestoreConverter: FirestoreDataConverter<GeneralRequest> = {
  fromFirestore: (data: QueryDocumentSnapshot<IGeneralRequest>): GeneralRequest => {
    return GeneralRequest.factory(data.data());
  },
  toFirestore: (modelObject: GeneralRequest): DocumentData => {
    return modelObject.toFirestore();
  },
};
