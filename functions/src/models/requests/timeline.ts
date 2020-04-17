import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsObject } from 'class-validator';
import { firestore } from 'firebase';

import { IOffer } from '../offers';
import { IRequest } from './index';
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;

export interface ITimelineItem extends DocumentData {
  offerSnapshot: IOffer;
  requestSnapshot: IRequest;
  createdAt?: Timestamp;
}

/**
 * Cannot be created/modified/deleted by a User. This is audit log maintained by the system
 * It is used to render a timeline of the request on the front end, but all records
 * are created automatically by the system based on status changes.
 */
export class TimelineItem implements ITimelineItem, FirestoreDataConverter<TimelineItem> {

  @IsObject()
  private _offerSnapshot: IOffer;

  @IsObject()
  private _requestSnapshot: IRequest;

  @IsObject()
  private _createdAt: Timestamp;

  constructor(offerSnapshot: IOffer, requestSnapshot: IRequest, createdAt = Timestamp.now()) {
    this._offerSnapshot = offerSnapshot;
    this._requestSnapshot = requestSnapshot;
    this._createdAt = createdAt;
  }

  static factory(data: ITimelineItem): TimelineItem {
    return new TimelineItem(
      data.offerSnapshot,
      data.requestSnapshot,
      data.createdAt || Timestamp.now(),
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

  get createdAt(): Timestamp {
    return this._createdAt;
  }

  set createdAt(value: Timestamp) {
    this._createdAt = value;
  }

  fromFirestore(data: ITimelineItem): TimelineItem {
    return TimelineItem.factory(data);
  }

  toFirestore(modelObject: TimelineItem): ITimelineItem {
    return {
      offerSnapshot: modelObject.offerSnapshot,
      requestSnapshot: modelObject.requestSnapshot,
      createdAt: modelObject._createdAt,
    };
  }
}
