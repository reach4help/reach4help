import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsArray } from 'class-validator';
import { firestore } from 'firebase';

import { IRequest, Request, RequestStatus } from './index';
import { ITimelineItem, TimelineItem } from './timeline';

import { IOfferWithLocation, OfferWithLocation } from '../offers/offersWithLocation';
import { User } from '../users';

import GeoPoint = firestore.GeoPoint;
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export enum AbstractRequestStatus {
  pending = 'pending',
  accepted = 'accepted',
  ongoing = 'ongoing',
  finished = 'finished',
  archived = 'archived',
}

export interface IRequestWithOffersAndTimeline extends IRequest {
  offers: Record<string, IOfferWithLocation>;
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
    offers: Record<string, OfferWithLocation> = {},
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
  private _offers: Record<string, OfferWithLocation>;

  get offers(): Record<string, OfferWithLocation> {
    return this._offers;
  }

  set offers(offers: Record<string, OfferWithLocation>) {
    this._offers = offers;
  }

  public addOffer(offer: OfferWithLocation, key: string) {
    this._offers[key] = offer;
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
      Object.keys(data.offers).reduce(
        (acc: Record<string, OfferWithLocation>, key: string) => ({
          ...acc,
          [key]: OfferWithLocation.factory(data.offers[key]),
        }),
        {},
      ),
      data.timeline.map(timeline => TimelineItem.factory(timeline)),
    );
  }

  public toObject(): object {
    return {
      cavUserRef: this.cavUserRef?.path,
      cavUserSnapshot: this.cavUserSnapshot ? this.cavUserSnapshot.toObject() : null,
      pinUserRef: this.pinUserRef.path,
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
      offers: Object.keys(this.offers).reduce(
        (acc: Record<string, IOfferWithLocation>, key: string) => ({
          ...acc,
          [key]: this.offers[key].toObject() as IOfferWithLocation,
        }),
        {},
      ),
      timeline: this.timeline.map(obj => ({
        ...obj.toObject(),
        actorRef: obj.actorRef.path,
        requestRef: obj.requestRef.path,
        requestSnapshot: {
          ...obj.requestSnapshot.toObject(),
          pinUserRef: obj.requestSnapshot.pinUserRef.path,
        },
      })),
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
