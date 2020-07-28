import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsArray, IsString, IsEnum, IsObject, IsNumber, IsDate, IsOptional } from 'class-validator';
import { firestore } from 'firebase-admin';

import { db } from '../../app';

import { Request, RequestStatus } from '../requests';
import { IUnauthenticatedRequest, UnauthenticatedRequest } from '../UnauthenticatedRequests'

import GeoPoint = firestore.GeoPoint;
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import { IOffer, Offer, OfferStatus } from '../offers';

interface IUserGeneral {
  displayName: string;
  displayPicture: string | null;
  rating: number | null;
}

export interface IGeneralRequest extends IUnauthenticatedRequest {
  userRef: string;
  userSnapshot: IUserGeneral;
  status: RequestStatus;
  streetAddress: string;
  participants: string[];
  rejected: string[];
  offersCount: number;
  rejectionCount: number;
  firstOfferMade: Date | null;
  lastOfferMade: Date | null;
  firstRejectionMade: Date | null;
  lastRejectionMade: Date | null;
}

export class GeneralRequest extends UnauthenticatedRequest implements IGeneralRequest {
  constructor(
    requestRef: string,
    userSnapshot: IUserGeneral,
    title: string,
    description: string,
    latLng: IGeneralRequest["latLng"],
    userRef: string,
    status: RequestStatus,
    streetAddress: string,
    participants: string[] = [],
    rejected: string[] = [],
    offersCount = 0,
    rejectionCount = 0,
    firstOfferMade: Date | null = null,
    lastOfferMade: Date | null = null,
    firstRejectionMade: Date | null = null,
    lastRejectionMade: Date | null = null,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(
      requestRef,
      {
        displayName: userSnapshot.displayName,
        displayPicture: userSnapshot.displayPicture
      },
      title,
      description,
      latLng,
      createdAt,
      updatedAt
    );
    this._userSnapshotGeneral = userSnapshot;
    this._userRef = userRef;
    this._status = status;
    this._streetAddress = streetAddress;
    this._participants = participants;
    this._rejected = rejected;
    this._offersCount = offersCount;
    this._rejectionCount = rejectionCount;
    this._firstOfferMade = firstOfferMade;
    this._lastOfferMade = lastOfferMade;
    this._firstRejectionMade = firstRejectionMade;
    this._lastRejectionMade = lastRejectionMade;
  }

  @IsObject()
  private _userSnapshotGeneral: IUserGeneral;

  get userSnapshot(): IUserGeneral {
    return this._userSnapshotGeneral;
  }

  set userSnapshot(userSnapshot: IUserGeneral) {
    this._userSnapshotGeneral = userSnapshot;
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

  @IsArray()
  private _rejected: string[];

  get rejected(): string[] {
    return this._rejected;
  }

  set rejected(rejected: string[]) {
    this._rejected = rejected;
  }

  public addRejection(rejection: string) {
    if (!this._rejected.includes(rejection)) {
      this._rejected.push(rejection)
    }
  }

  public removeRejection(rejection: string) {
    this._rejected.splice(this._rejected.indexOf(rejection), 1);
  }

  @IsEnum(RequestStatus)
  private _status: RequestStatus;

  get status(): RequestStatus {
    return this._status;
  }

  set status(status: RequestStatus) {
    this._status = status;
  }

  @IsNumber()
  private _offersCount: number;

  get offersCount(): number {
    return this._offersCount;
  }

  set offersCount(offersCount: number) {
    this._offersCount = offersCount;
  }

  @IsNumber()
  private _rejectionCount: number;

  get rejectionCount(): number {
    return this._rejectionCount;
  }

  set rejectionCount(rejectionCount: number) {
    this._rejectionCount = rejectionCount;
  }
  
  @IsDate()
  @IsOptional()
  private _firstOfferMade: Date | null;

  get firstOfferMade(): Date | null {
    return this._firstOfferMade;
  }

  set firstOfferMade(firstOfferMade: Date | null) {
    this._firstOfferMade = firstOfferMade;
  }

  @IsDate()
  @IsOptional()
  private _lastOfferMade: Date | null;

  get lastOfferMade(): Date | null {
    return this._lastOfferMade;
  }

  set lastOfferMade(lastOfferMade: Date | null) {
    this._lastOfferMade = lastOfferMade;
  }

  @IsDate()
  @IsOptional()
  private _firstRejectionMade: Date | null;

  get firstRejectionMade(): Date | null {
    return this._firstRejectionMade;
  }

  set firstRejectionMade(firstRejectionMade: Date | null) {
    this._firstRejectionMade = firstRejectionMade;
  }

  @IsDate()
  @IsOptional()
  private _lastRejectionMade: Date | null;

  get lastRejectionMade(): Date | null {
    return this._lastRejectionMade;
  }

  set lastRejectionMade(lastRejectionMade: Date | null) {
    this._lastRejectionMade = lastRejectionMade;
  }

  @IsString()
  private _streetAddress: string;

  get streetAddress(): string {
    return this._streetAddress;
  }

  set streetAddress(streetAddress: string) {
    this._streetAddress = streetAddress;
  }

  public static async fromRequest(data: Request, path: string): Promise<GeneralRequest> {

    const offersData = await db.collection('offers')
                  .where('requestRef', '==', db.doc(path))
                  .get();

    const participants = [data.pinUserRef.id];
    const rejected = [];
    let offersCount = 0;
    let rejectionCount = 0;
    let firstOfferMade: Date | null = null;
    let lastOfferMade: Date | null = null;
    let firstRejectionMade: Date | null = null;
    let lastRejectionMade: Date | null = null;

    for (const doc of offersData.docs) {
      const offer = Offer.factory(doc.data() as IOffer);
      if (offer.status === OfferStatus.cavDeclined) {
        rejectionCount += 1;
        rejected.push(offer.cavUserRef.id);
        if (!firstRejectionMade || (firstRejectionMade && offer.createdAt.toDate() < firstRejectionMade)) {
          firstRejectionMade = offer.createdAt.toDate();
        }
        if (!lastRejectionMade || (lastRejectionMade && offer.createdAt.toDate() > lastRejectionMade)) {
          lastRejectionMade = offer.createdAt.toDate();
        }
      } else {
        offersCount += 1;
        participants.push(offer.cavUserRef.id);
        if (!firstOfferMade || (firstOfferMade && offer.createdAt.toDate() < firstOfferMade)) {
          firstOfferMade = offer.createdAt.toDate();
        }
        if (!lastOfferMade || (lastOfferMade && offer.createdAt.toDate() > lastOfferMade)) {
          lastOfferMade = offer.createdAt.toDate();
        }
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
      data.streetAddress,
      participants,
      rejected,
      offersCount,
      rejectionCount,
      firstOfferMade,
      lastOfferMade,
      firstRejectionMade,
      lastRejectionMade,  
      data.createdAt.toDate(),
      data.updatedAt.toDate(),
    );
  }

  public static fromFirestore(data: DocumentData): GeneralRequest {
    return new GeneralRequest(
      (data.requestRef as DocumentReference).path,
      data.userSnapshot,
      data.title,
      data.description,
      {
        latitude: (data.latLng as GeoPoint).latitude,
        longitude: (data.latLng as GeoPoint).longitude
      },
      (data.userRef as DocumentReference).path,
      data.status,
      data.streetAddress,
      data.participants,
      data.rejected,
      data.offersCount,
      data.rejectionCount,
      (data.firstOfferMade as Timestamp).toDate(),
      (data.lastOfferMade as Timestamp).toDate(),
      (data.firstRejectionMade as Timestamp).toDate(),
      (data.lastRejectionMade as Timestamp).toDate(),  
      (data.createdAt as Timestamp).toDate(),
      (data.updatedAt as Timestamp).toDate(),
    );
  }

  public static fromAlgolia(data: Record<string, any>): GeneralRequest {
    return new GeneralRequest(
      data.requestRef,
      data.userSnapshot,
      data.title,
      data.description,
      { latitude: data['_geoloc'].lat, longitude: data['_geoloc'].lng },
      data.userRef,
      data.status,
      data.streetAddress,
      data.participants,
      data.rejected,
      data.offersCount,
      data.rejectionCount,
      data.firstOfferMade,
      data.lastOfferMade,
      data.firstRejectionMade,
      data.lastRejectionMade,
      data.createdAt,
      data.updatedAt,
    );
  }

  public static getObjectId(requestPath: string): string {
    return db.doc(requestPath).id;
  }

  public static getParticipantId(userPath: string): string {
    return db.doc(userPath).id;
  }

  public static fromObject(data: IGeneralRequest): GeneralRequest {
    return new GeneralRequest(
      data.requestRef,
      data.userSnapshot,
      data.title,
      data.description,
      data.latLng,
      data.userRef,
      data.status,
      data.streetAddress,
      data.participants,
      data.rejected,
      data.offersCount,
      data.rejectionCount,
      data.firstOfferMade,
      data.lastOfferMade,
      data.firstRejectionMade,
      data.lastRejectionMade,
      data.createdAt,
      data.updatedAt,
    )
  }

  toObject(): IGeneralRequest {
    return {
      requestRef: this.requestRef,
      userSnapshot: this.userSnapshot,
      title: this.title,
      description: this.description,
      latLng: this.latLng,
      userRef: this.userRef,
      status: this.status,
      streetAddress: this.streetAddress,
      participants: this.participants,
      rejected: this.rejected,
      offersCount: this.offersCount,
      rejectionCount: this.rejectionCount,
      firstOfferMade: this.firstOfferMade,
      lastOfferMade: this.lastOfferMade,
      firstRejectionMade: this.firstRejectionMade,
      lastRejectionMade: this.lastRejectionMade,
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
      userRef: db.doc(this.userRef),
      status: this.status,
      streetAddress: this.streetAddress,
      participants: this.participants,
      rejected: this.rejected,
      offersCount: this.offersCount,
      rejectionCount: this.rejectionCount,
      firstOfferMade: this.firstOfferMade ? Timestamp.fromDate(this.firstOfferMade) : null,
      lastOfferMade: this.lastOfferMade ? Timestamp.fromDate(this.lastOfferMade) : null,
      firstRejectionMade: this.firstRejectionMade ? Timestamp.fromDate(this.firstRejectionMade) : null,
      lastRejectionMade: this.lastRejectionMade ? Timestamp.fromDate(this.lastRejectionMade) : null,
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
      userRef: this.userRef,
      status: this.status,
      streetAddress: this.streetAddress,
      participants: this.participants,
      rejected: this.rejected,
      offersCount: this.offersCount,
      rejectionCount: this.rejectionCount,
      firstOfferMade: this.firstOfferMade,
      lastOfferMade: this.lastOfferMade,
      firstRejectionMade: this.firstRejectionMade,
      lastRejectionMade: this.lastRejectionMade,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export const RequestWithOffersFirestoreConverter: FirestoreDataConverter<GeneralRequest> = {
  fromFirestore: (data: QueryDocumentSnapshot<IGeneralRequest>): GeneralRequest => {
    return GeneralRequest.fromFirestore(data.data());
  },
  toFirestore: (modelObject: GeneralRequest): DocumentData => {
    return modelObject.toFirestore();
  },
};
