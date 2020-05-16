import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsEnum, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { firestore } from 'firebase';

import { IOffer, Offer } from '../offers';
import { IRequest, Request } from './index';
import { IUser, User } from '../users';
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export enum TimelineItemAction {
  CREATE_REQUEST = 'CREATE_REQUEST',
  CANCEL_REQUEST = 'CANCEL_REQUEST',
  REMOVE_REQUEST = 'REMOVE_REQUEST',
  COMPLETE_REQUEST = 'COMPLETE_REQUEST',
  CREATE_OFFER = 'CREATE_OFFER',
  ACCEPT_OFFER = 'ACCEPT_OFFER',
  REJECT_OFFER = 'REJECT_OFFER',
  RATE_PIN = 'RATE_PIN',
  RATE_CAV = 'RATE_CAV',
}

export interface ITimelineItem extends DocumentData {
  actorRef: DocumentReference<DocumentData>;
  offerRef?: DocumentReference<DocumentData> | null;
  requestRef: DocumentReference<DocumentData>;
  actorSnapshot: IUser;
  offerSnapshot?: IOffer | null;
  requestSnapshot: IRequest;
  action: TimelineItemAction;
  createdAt?: Timestamp;
}

/**
 * Cannot be created/modified/deleted by a User. This is audit log maintained by the system
 * It is used to render a timeline of the request on the front end, but all records
 * are created automatically by the system based on status changes.
 */
export class TimelineItem implements ITimelineItem {
  constructor(
    actorRef: DocumentReference<DocumentData>,
    offerRef: DocumentReference<DocumentData> | null = null,
    requestRef: DocumentReference<DocumentData>,
    actorSnapshot: User,
    offerSnapshot: Offer | null = null,
    requestSnapshot: Request,
    action: TimelineItemAction,
    createdAt = Timestamp.now(),
  ) {
    this._actorRef = actorRef;
    this._offerRef = offerRef;
    this._requestRef = requestRef;
    this._actorSnapshot = actorSnapshot;
    this._offerSnapshot = offerSnapshot;
    this._requestSnapshot = requestSnapshot;
    this._action = action;
    this._createdAt = createdAt;
  }

  @IsNotEmptyObject()
  private _actorRef: DocumentReference<DocumentData>;

  get actorRef(): DocumentReference<DocumentData> {
    return this._actorRef;
  }

  set actorRef(value: DocumentReference<DocumentData>) {
    this._actorRef = value;
  }

  @IsObject()
  @ValidateNested()
  private _actorSnapshot: User;

  get actorSnapshot(): User {
    return this._actorSnapshot;
  }

  set actorSnapshot(value: User) {
    this._actorSnapshot = value;
  }

  @IsNotEmptyObject()
  @IsOptional()
  private _offerRef: DocumentReference<DocumentData> | null;

  get offerRef(): DocumentReference<DocumentData> | null {
    return this._offerRef;
  }

  set offerRef(value: DocumentReference<DocumentData> | null) {
    this._offerRef = value;
  }

  @IsObject()
  @IsOptional()
  @ValidateNested()
  private _offerSnapshot: Offer | null;

  get offerSnapshot(): Offer | null {
    return this._offerSnapshot;
  }

  set offerSnapshot(value: Offer | null) {
    this._offerSnapshot = value;
  }

  @IsNotEmptyObject()
  private _requestRef: DocumentReference<DocumentData>;

  get requestRef(): DocumentReference<DocumentData> {
    return this._requestRef;
  }

  set requestRef(value: DocumentReference<DocumentData>) {
    this._requestRef = value;
  }

  @IsObject()
  @ValidateNested()
  private _requestSnapshot: Request;

  get requestSnapshot(): Request {
    return this._requestSnapshot;
  }

  set requestSnapshot(value: Request) {
    this._requestSnapshot = value;
  }

  @IsEnum(TimelineItemAction)
  private _action: TimelineItemAction;

  get action(): TimelineItemAction {
    return this._action;
  }

  set action(value: TimelineItemAction) {
    this._action = value;
  }

  @IsObject()
  private _createdAt: Timestamp;

  get createdAt(): Timestamp {
    return this._createdAt;
  }

  set createdAt(value: Timestamp) {
    this._createdAt = value;
  }

  static factory(data: ITimelineItem): TimelineItem {
    return new TimelineItem(
      data.actorRef,
      data.offerRef || null,
      data.requestRef,
      User.factory(data.actorSnapshot),
      data.offerSnapshot ? Offer.factory(data.offerSnapshot) : null,
      Request.factory(data.requestSnapshot),
      data.action,
      data.createdAt || Timestamp.now(),
    );
  }

  toObject(): object {
    return {
      actorRef: this.actorRef,
      offerRef: this.offerRef,
      requestRef: this.requestRef,
      actorSnapshot: this.actorSnapshot.toObject(),
      offerSnapshot: this.offerSnapshot ? this.offerSnapshot.toObject() : null,
      requestSnapshot: this.requestSnapshot.toObject(),
      action: this.action,
      createdAt: this.createdAt,
    };
  }
}

export const TimelineFirestoreConverter: FirestoreDataConverter<TimelineItem> = {
  fromFirestore(data: QueryDocumentSnapshot<ITimelineItem>): TimelineItem {
    return TimelineItem.factory(data.data());
  },
  toFirestore(modelObject: TimelineItem): DocumentData {
    return modelObject.toObject();
  },
};
