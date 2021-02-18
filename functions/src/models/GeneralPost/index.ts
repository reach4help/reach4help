import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsArray, IsDate, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { firestore } from 'firebase-admin';

import { db } from '../../app';

import { IPost, Post, PostStatus } from '../Post';
import { IUnauthenticatedPost, UnauthenticatedPost } from '../UnauthenticatedPost';

import GeoPoint = firestore.GeoPoint;
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

interface IUserGeneral {
  displayName: string;
  displayPicture: string | null;
  rating: number | null;
}

export interface IGeneralPost extends IUnauthenticatedPost {
  creatorRef: string;
  creatorSnapshot: IUserGeneral;
  status: PostStatus;
  streetAddress: string;
  participants: string[];
  rejected: string[];
  offerCount: number;
  rejectionCount: number;
  firstOfferMade: Date | null;
  firstRejectionMade: Date | null;
  seenBy: string[];
}

export class GeneralPost extends UnauthenticatedPost implements IGeneralPost {
  constructor(
    postRef: string,
    requestingHelp: boolean,
    creatorSnapshot: IUserGeneral,
    title: string,
    description: string,
    latLng: IGeneralPost['latLng'],
    creatorRef: string,
    status: PostStatus,
    streetAddress: string,
    participants: string[] = [],
    rejected: string[] = [],
    offerCount = 0,
    rejectionCount = 0,
    firstOfferMade: Date | null = null,
    firstRejectionMade: Date | null = null,
    seenBy: string[] = [],
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(
      postRef,
      requestingHelp,
      {
        displayName: creatorSnapshot.displayName,
        displayPicture: creatorSnapshot.displayPicture,
      },
      title,
      description,
      latLng,
      createdAt,
      updatedAt,
    );
    this._creatorSnapshotGeneral = creatorSnapshot;
    this._creatorRef = creatorRef;
    this._status = status;
    this._streetAddress = streetAddress;
    this._participants = participants;
    this._rejected = rejected;
    this._offerCount = offerCount;
    this._rejectionCount = rejectionCount;
    this._firstOfferMade = firstOfferMade;
    this._firstRejectionMade = firstRejectionMade;
    this._seenBy = seenBy;
  }

  @IsObject()
  private _creatorSnapshotGeneral: IUserGeneral;

  get creatorSnapshot(): IUserGeneral {
    return this._creatorSnapshotGeneral;
  }

  set creatorSnapshot(creatorSnapshot: IUserGeneral) {
    this._creatorSnapshotGeneral = creatorSnapshot;
  }

  @IsString()
  private _creatorRef: string;

  get creatorRef(): string {
    return this._creatorRef;
  }

  set creatorRef(creatorRef: string) {
    this._creatorRef = creatorRef;
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
      this._participants.push(participant);
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
      this._rejected.push(rejection);
    }
  }

  public removeRejection(rejection: string) {
    this._rejected.splice(this._rejected.indexOf(rejection), 1);
  }

  @IsEnum(PostStatus)
  private _status: PostStatus;

  get status(): PostStatus {
    return this._status;
  }

  set status(status: PostStatus) {
    this._status = status;
  }

  @IsNumber()
  private _offerCount: number;

  get offerCount(): number {
    return this._offerCount;
  }

  set offerCount(offerCount: number) {
    this._offerCount = offerCount;
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
  private _firstRejectionMade: Date | null;

  get firstRejectionMade(): Date | null {
    return this._firstRejectionMade;
  }

  set firstRejectionMade(firstRejectionMade: Date | null) {
    this._firstRejectionMade = firstRejectionMade;
  }

  @IsObject()
  private _seenBy: string[];

  get seenBy(): string[] {
    return this._seenBy;
  }

  set seenBy(seenBy: string[]) {
    this._seenBy = seenBy;
  }

  @IsString()
  private _streetAddress: string;

  get streetAddress(): string {
    return this._streetAddress;
  }

  set streetAddress(streetAddress: string) {
    this._streetAddress = streetAddress;
  }

  public static async fromPost(data: Post, path: string): Promise<GeneralPost> {
    const responsesData = await db
      .collection('posts')
      .where('parentRef', '==', db.doc(path))
      .get();

    const participants = [data.creatorRef.id];
    const seenBy = data.updateSeenBy.map(user => user.id);
    const rejected = [];

    for (const doc of responsesData.docs) {
      const response = Post.factory(doc.data() as IPost);
      if (response.status === PostStatus.declined) {
        rejected.push(response.creatorRef.id);
      } else {
        participants.push(response.creatorRef.id);
      }
    }

    return new GeneralPost(
      path,
      data.requestingHelp,
      {
        displayName: data.creatorSnapshot.displayName || '',
        displayPicture: data.creatorSnapshot.displayPicture,
        rating: data.creatorSnapshot.pinRatingsReceived / data.creatorSnapshot.requestsMade,
      },
      data.title,
      data.description,
      {
        latitude: data.latLng.latitude,
        longitude: data.latLng.longitude,
      },
      data.creatorRef.path,
      data.status,
      data.streetAddress,
      participants,
      rejected,
      data.positiveResponseCount,
      data.negativeResponseCount,
      data.firstOfferMade?.toDate(),
      data.firstRejectionMade?.toDate(),
      seenBy,
      data.createdAt.toDate(),
      data.updatedAt.toDate(),
    );
  }

  public static fromFirestore(data: DocumentData): GeneralPost {
    return new GeneralPost(
      (data.requestRef as DocumentReference).path,
      data.requestingHelp,
      data.userSnapshot,
      data.title,
      data.description,
      {
        latitude: (data.latLng as GeoPoint).latitude,
        longitude: (data.latLng as GeoPoint).longitude,
      },
      (data.userRef as DocumentReference).path,
      data.status,
      data.streetAddress,
      data.participants,
      data.rejected,
      data.offerCount,
      data.rejectionCount,
      (data.firstOfferMade as Timestamp).toDate(),
      (data.firstRejectionMade as Timestamp).toDate(),
      data.seenBy,
      (data.createdAt as Timestamp).toDate(),
      (data.updatedAt as Timestamp).toDate(),
    );
  }

  public static fromAlgolia(data: Record<string, any>): GeneralPost {
    return new GeneralPost(
      data.postRef,
      data.requestingHelp,
      data.creatorSnapshot,
      data.title,
      data.description,
      { latitude: data._geoloc.lat, longitude: data._geoloc.lng },
      data.creatorRef,
      data.status,
      data.streetAddress,
      data.participants,
      data.rejected,
      data.offerCount,
      data.rejectionCount,
      data.firstOfferMade,
      data.firstRejectionMade,
      data.seenBy,
      data.createdAt,
      data.updatedAt,
    );
  }

  public static getObjectId(postPath: string): string {
    return db.doc(postPath).id;
  }

  public static getParticipantId(userPath: string): string {
    return db.doc(userPath).id;
  }

  public static fromObject(data: IGeneralPost): GeneralPost {
    return new GeneralPost(
      data.postRef,
      data.requestingHelp,
      data.creatorSnapshot,
      data.title,
      data.description,
      data.latLng,
      data.creatorRef,
      data.status,
      data.streetAddress,
      data.participants,
      data.rejected,
      data.offerCount,
      data.rejectionCount,
      data.firstOfferMade,
      data.firstRejectionMade,
      data.seenBy,
      data.createdAt,
      data.updatedAt,
    );
  }

  toObject(): IGeneralPost {
    return {
      postRef: this.postRef,
      requestingHelp: this.requestingHelp,
      creatorSnapshot: this.creatorSnapshot,
      title: this.title,
      description: this.description,
      latLng: this.latLng,
      creatorRef: this.creatorRef,
      status: this.status,
      streetAddress: this.streetAddress,
      participants: this.participants,
      rejected: this.rejected,
      offerCount: this.offerCount,
      rejectionCount: this.rejectionCount,
      firstOfferMade: this.firstOfferMade,
      firstRejectionMade: this.firstRejectionMade,
      seenBy: this.seenBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toFirestore(): DocumentData {
    return {
      postRef: db.doc(this.postRef),
      requestingHelp: this.requestingHelp,
      creatorSnapshot: this.creatorSnapshot,
      title: this.title,
      description: this.description,
      latLng: new GeoPoint(this.latLng.latitude, this.latLng.longitude),
      creatorRef: db.doc(this.creatorRef),
      status: this.status,
      streetAddress: this.streetAddress,
      participants: this.participants,
      rejected: this.rejected,
      offerCount: this.offerCount,
      rejectionCount: this.rejectionCount,
      firstOfferMade: this.firstOfferMade ? Timestamp.fromDate(this.firstOfferMade) : null,
      firstRejectionMade: this.firstRejectionMade ? Timestamp.fromDate(this.firstRejectionMade) : null,
      seenBy: this.seenBy,
      createdAt: Timestamp.fromDate(this.createdAt),
      updatedAt: Timestamp.fromDate(this.updatedAt),
    };
  }

  toAlgolia(): object {
    return {
      postRef: this.postRef,
      requestingHelp: this.requestingHelp,
      objectID: db.doc(this.postRef).id,
      creatorSnapshot: this.creatorSnapshot,
      title: this.title,
      description: this.description,
      _geoloc: {
        lat: this.latLng.latitude,
        lng: this.latLng.longitude,
      },
      creatorRef: this.creatorRef,
      status: this.status,
      streetAddress: this.streetAddress,
      participants: this.participants,
      rejected: this.rejected,
      offerCount: this.offerCount,
      rejectionCount: this.rejectionCount,
      firstOfferMade: this.firstOfferMade,
      firstRejectionMade: this.firstRejectionMade,
      seenBy: this.seenBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export const GeneralPostFirestoreConverter: FirestoreDataConverter<GeneralPost> = {
  fromFirestore: (data: QueryDocumentSnapshot<IGeneralPost>): GeneralPost => {
    return GeneralPost.fromFirestore(data.data());
  },
  toFirestore: (modelObject: GeneralPost): DocumentData => {
    return modelObject.toFirestore();
  },
};
