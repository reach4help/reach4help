/* eslint no-underscore-dangle: 0 */
import { IsObject } from 'class-validator';
import { firestore } from 'firebase';

import { IOffer } from '../offers';
import { IRequest } from './index';

export interface ITimelineItem extends firebase.firestore.DocumentData {
  offerSnapshot: IOffer;
  requestSnapshot: IRequest;
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
  private _offerSnapshot: IOffer;

  @IsObject()
  private _requestSnapshot: IRequest;

  @IsObject()
  private _createdAt: firebase.firestore.Timestamp;

  constructor(
    offerSnapshot: IOffer,
    requestSnapshot: IRequest,
    createdAt = firestore.Timestamp.now(),
  ) {
    this._offerSnapshot = offerSnapshot;
    this._requestSnapshot = requestSnapshot;
    this._createdAt = createdAt;
  }

  static factory(data: ITimelineItem): TimelineItem {
    return new TimelineItem(
      data.offerSnapshot,
      data.requestSnapshot,
      data.createdAt || firestore.Timestamp.now(),
    );
  }

  get offerSnapshot(): IOffer {
    return this._offerSnapshot;
  }

  set offerSnapshot(value: IOffer) {
    this._offerSnapshot = value;
  }

  get requestSnapshot(): IRequest {
    return this._requestSnapshot;
  }

  set requestSnapshot(value: IRequest) {
    this._requestSnapshot = value;
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
      offerSnapshot: modelObject.offerSnapshot,
      requestSnapshot: modelObject.requestSnapshot,
      createdAt: modelObject._createdAt,
    };
  }
}
