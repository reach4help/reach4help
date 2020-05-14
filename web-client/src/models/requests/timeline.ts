/* eslint no-underscore-dangle: 0 */
import { IsObject } from 'class-validator';
import { firestore } from 'firebase';

import { IOffer } from '../offers';
import { IUser } from '../users';
import { IRequest } from './index';

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
export class TimelineItem
  implements
    ITimelineItem,
    firebase.firestore.FirestoreDataConverter<TimelineItem> {
  @IsObject()
  private _actorSnapshot: IUser;

  @IsObject()
  private _offerSnapshot: IOffer | null;

  @IsObject()
  private _requestSnapshot: IRequest;

  @IsObject()
  private _action: TimelineItemAction;

  @IsObject()
  private _createdAt: firebase.firestore.Timestamp;

  constructor(
    actorSnapshot: IUser,
    offerSnapshot: IOffer | null = null,
    requestSnapshot: IRequest,
    action: TimelineItemAction,
    createdAt = firestore.Timestamp.now(),
  ) {
    this._actorSnapshot = actorSnapshot;
    this._offerSnapshot = offerSnapshot;
    this._requestSnapshot = requestSnapshot;
    this._action = action;
    this._createdAt = createdAt;
  }

  static factory(data: ITimelineItem): TimelineItem {
    return new TimelineItem(
      data.actorSnapshot,
      data.offerSnapshot,
      data.requestSnapshot,
      data.action,
      data.createdAt || firestore.Timestamp.now(),
    );
  }

  get actorSnapshot(): IUser {
    return this._actorSnapshot;
  }

  set actorSnapshot(value: IUser) {
    this._actorSnapshot = value;
  }

  get offerSnapshot(): IOffer | null {
    return this._offerSnapshot;
  }

  set offerSnapshot(value: IOffer | null) {
    this._offerSnapshot = value;
  }

  get requestSnapshot(): IRequest {
    return this._requestSnapshot;
  }

  set requestSnapshot(value: IRequest) {
    this._requestSnapshot = value;
  }

  get action(): TimelineItemAction {
    return this._action;
  }

  set action(value: TimelineItemAction) {
    this._action = value;
  }

  get createdAt(): firebase.firestore.Timestamp {
    return this._createdAt;
  }

  set createdAt(value: firebase.firestore.Timestamp) {
    this._createdAt = value;
  }

  // eslint-disable-next-line class-methods-use-this
  fromFirestore(
    data: firebase.firestore.QueryDocumentSnapshot<ITimelineItem>,
  ): TimelineItem {
    return TimelineItem.factory(data.data());
  }

  // eslint-disable-next-line class-methods-use-this
  toFirestore(modelObject: TimelineItem): ITimelineItem {
    return {
      actorSnapshot: modelObject.actorSnapshot,
      offerSnapshot: modelObject.offerSnapshot,
      requestSnapshot: modelObject.requestSnapshot,
      action: modelObject.action,
      createdAt: modelObject._createdAt,
    };
  }
}
