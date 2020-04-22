import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsObject } from 'class-validator';
import { firestore } from 'firebase';

import { IOffer, Offer } from '../offers';
import { IRequest, Request } from './index';
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export interface ITimelineItem extends DocumentData {
  offerRef: DocumentReference<DocumentData>;
  requestRef: DocumentReference<DocumentData>;
  offerSnapshot: IOffer;
  requestSnapshot: IRequest;
  createdAt?: Timestamp;
}

/**
 * Cannot be created/modified/deleted by a User. This is audit log maintained by the system
 * It is used to render a timeline of the request on the front end, but all records
 * are created automatically by the system based on status changes.
 */
export class TimelineItem implements ITimelineItem {

  constructor(
    offerRef: DocumentReference<DocumentData>,
    requestRef: DocumentReference<DocumentData>,
    offerSnapshot: Offer,
    requestSnapshot: Request,
    createdAt = Timestamp.now(),
  ) {
    this._offerRef = offerRef;
    this._requestRef = requestRef;
    this._offerSnapshot = offerSnapshot;
    this._requestSnapshot = requestSnapshot;
    this._createdAt = createdAt;
  }

  @IsObject()
  private _offerRef: DocumentReference<DocumentData>;

  get offerRef(): DocumentReference<DocumentData> {
    return this._offerRef;
  }

  set offerRef(value: DocumentReference<DocumentData>) {
    this._offerRef = value;
  }

  @IsObject()
  private _offerSnapshot: Offer;

  get offerSnapshot(): Offer {
    return this._offerSnapshot;
  }

  set offerSnapshot(value: Offer) {
    this._offerSnapshot = value;
  }

  @IsObject()
  private _requestRef: DocumentReference<DocumentData>;

  get requestRef(): DocumentReference<DocumentData> {
    return this._requestRef;
  }

  set requestRef(value: DocumentReference<DocumentData>) {
    this._requestRef = value;
  }

  @IsObject()
  private _requestSnapshot: Request;

  get requestSnapshot(): Request {
    return this._requestSnapshot;
  }

  set requestSnapshot(value: Request) {
    this._requestSnapshot = value;
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
      data.offerRef,
      data.requestRef,
      Offer.factory(data.offerSnapshot),
      Request.factory(data.requestSnapshot),
      data.createdAt || Timestamp.now(),
    );
  }

  toObject(): object {
    return {
      offerRef: this.offerRef,
      requestRef: this.requestRef,
      offerSnapshot: this.offerSnapshot.toObject(),
      requestSnapshot: this.requestSnapshot.toObject(),
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
