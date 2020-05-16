/* eslint no-underscore-dangle: 0 */
import {
  IsEnum,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import firebase, { firestore } from 'firebase';

import { IOffer, Offer } from '../offers';
import { IUser, User } from '../users';
import { IRequest, Request } from './index';

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

export interface ITimelineItem extends firebase.firestore.DocumentData {
  actorRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  offerRef?: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;
  requestRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  actorSnapshot: IUser;
  offerSnapshot?: IOffer | null;
  requestSnapshot: IRequest;
  action: TimelineItemAction;
  createdAt?: firebase.firestore.Timestamp;
}

/**
 * Cannot be created/modified/deleted by a User. This is audit log maintained by the system
 * It is used to render a timeline of the request on the front end, but all records
 * are created automatically by the system based on status changes.
 */
export class TimelineItem implements ITimelineItem {
  constructor(
    actorRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
    offerRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    > | null = null,
    requestRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
    actorSnapshot: User,
    offerSnapshot: Offer | null = null,
    requestSnapshot: Request,
    action: TimelineItemAction,
    createdAt = firebase.firestore.Timestamp.now(),
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
  private _actorRef: firestore.DocumentReference<firestore.DocumentData>;

  get actorRef(): firestore.DocumentReference<firestore.DocumentData> {
    return this._actorRef;
  }

  set actorRef(value: firestore.DocumentReference<firestore.DocumentData>) {
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
  private _offerRef: firestore.DocumentReference<firestore.DocumentData> | null;

  get offerRef(): firestore.DocumentReference<firestore.DocumentData> | null {
    return this._offerRef;
  }

  set offerRef(
    value: firestore.DocumentReference<firestore.DocumentData> | null,
  ) {
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
  private _requestRef: firestore.DocumentReference<firestore.DocumentData>;

  get requestRef(): firestore.DocumentReference<firestore.DocumentData> {
    return this._requestRef;
  }

  set requestRef(value: firestore.DocumentReference<firestore.DocumentData>) {
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
  private _createdAt: firebase.firestore.Timestamp;

  get createdAt(): firestore.Timestamp {
    return this._createdAt;
  }

  set createdAt(value: firebase.firestore.Timestamp) {
    this._createdAt = value;
  }

  static factory(data: ITimelineItem): TimelineItem {
    return new TimelineItem(
      data.actorRef,
      data.offerRef,
      data.requestRef,
      User.factory(data.actorSnapshot),
      data.offerSnapshot ? Offer.factory(data.offerSnapshot) : null,
      Request.factory(data.requestSnapshot),
      data.action,
      data.createdAt,
    );
  }

  toObject(): object {
    return {
      actorRef: this.actorRef.path,
      offerRef: this.offerRef ? this.offerRef.path : null,
      requestRef: this.requestRef.path,
      actorSnapshot: this.actorSnapshot.toObject(),
      offerSnapshot: this.offerSnapshot ? this.offerSnapshot.toObject() : null,
      requestSnapshot: this.requestSnapshot.toObject(),
      action: this.action,
      createdAt: this.createdAt.toDate(),
    };
  }
}

export const TimelineItemFirestoreConverter: firebase.firestore.FirestoreDataConverter<TimelineItem> = {
  fromFirestore(
    data: firebase.firestore.QueryDocumentSnapshot<ITimelineItem>,
  ): TimelineItem {
    return TimelineItem.factory(data.data());
  },
  toFirestore: (modelObject: TimelineItem): firebase.firestore.DocumentData =>
    modelObject.toObject(),
};
