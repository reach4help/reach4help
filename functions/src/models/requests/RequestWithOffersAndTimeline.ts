import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsArray } from 'class-validator';
import { firestore } from 'firebase-admin';

import { IRequest, Request, RequestStatus } from './index';
import { ITimelineItem, TimelineItem } from './timeline';

import { IOfferWithLocation, OfferWithLocation } from '../offers/offersWithLocation';
import { User } from '../users';

import GeoPoint = firestore.GeoPoint;
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export interface IRequestWithOffersAndTimeline extends IRequest {
  offers: IOfferWithLocation[];
  timeline: ITimelineItem[];
}

export class RequestWithOffersAndTimeline extends Request implements IRequestWithOffersAndTimeline {
  constructor(
    pinUserRef: DocumentReference<DocumentData>,
    pinUserSnapshot: User,
    title: string,
    description: string,
    latLng: GeoPoint,
    streetAddress: string,
    cavUserRef: DocumentReference<DocumentData> | null = null,
    cavUserSnapshot: User | null = null,
    status = RequestStatus.pending,
    createdAt = Timestamp.now(),
    updatedAt = Timestamp.now(),
    pinRating: number | null = null,
    cavRating: number | null = null,
    pinRatedAt: Timestamp | null = null,
    cavRatedAt: Timestamp | null = null,
    offers: OfferWithLocation[] = [],
    timeline: TimelineItem[] = [],
  ) {
    super(
      pinUserRef,
      pinUserSnapshot,
      title,
      description,
      latLng,
      streetAddress,
      cavUserRef,
      cavUserSnapshot,
      status,
      createdAt,
      updatedAt,
      pinRating,
      cavRating,
      pinRatedAt,
      cavRatedAt,
    );
    this._offers = offers;
    this._timeline = timeline;
  }

  @IsArray()
  private _offers: OfferWithLocation[];

  get offers(): OfferWithLocation[] {
    return this._offers;
  }

  set offers(offers: OfferWithLocation[]) {
    this._offers = offers;
  }

  public addOffer(offer: OfferWithLocation) {
    this._offers.push(offer);
  }

  @IsArray()
  private _timeline: TimelineItem[];

  get timeline(): TimelineItem[] {
    return this._timeline;
  }

  set timeline(timelineItems: TimelineItem[]) {
    this._timeline = timelineItems;
  }

  public addToTimeline(timelineItem: TimelineItem) {
    this._timeline.push(timelineItem);
  }

  public getRequest(): Request {
    return Request.factory(this.toObject() as IRequest);
  }

  public static factory(data: IRequestWithOffersAndTimeline): RequestWithOffersAndTimeline {
    return new RequestWithOffersAndTimeline(
      data.pinUserRef,
      User.factory(data.pinUserSnapshot),
      data.title,
      data.description,
      data.latLng,
      data.streetAddress,
      data.cavUserRef,
      // This field may be null
      data.cavUserSnapshot ? User.factory(data.cavUserSnapshot) : null,
      data.status,
      data.createdAt,
      data.updatedAt,
      data.pinRating,
      data.cavRating,
      data.pinRatedAt,
      data.cavRatedAt,
    );
  }

  public toObject(): object {
    return {
      cavUserRef: this.cavUserRef,
      cavUserSnapshot: this.cavUserSnapshot ? this.cavUserSnapshot.toObject() : null,
      pinUserRef: this.pinUserRef,
      pinUserSnapshot: this.pinUserSnapshot.toObject(),
      title: this.title,
      description: this.description,
      latLng: this.latLng,
      streetAddress: this.streetAddress,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      pinRating: this.pinRating,
      cavRating: this.cavRating,
      pinRatedAt: this.pinRatedAt,
      cavRatedAt: this.cavRatedAt,
      offers: this.offers.map(offer => offer.toObject()),
    };
  }
}

export const RequestWithOffersFirestoreConverter: FirestoreDataConverter<RequestWithOffersAndTimeline> = {
  fromFirestore: (data: QueryDocumentSnapshot<IRequestWithOffersAndTimeline>): RequestWithOffersAndTimeline => {
    return RequestWithOffersAndTimeline.factory(data.data());
  },
  toFirestore: (modelObject: RequestWithOffersAndTimeline): DocumentData => {
    return modelObject.toObject();
  },
};
