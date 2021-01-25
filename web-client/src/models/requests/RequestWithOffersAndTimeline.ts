/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint no-underscore-dangle: 0 */
import { IsArray, IsString } from 'class-validator';
import { firestore } from 'firebase';
import { firestore as db } from 'src/firebase';

import {
  IOfferWithLocation,
  OfferWithLocation,
} from '../offers/offersWithLocation';
import { User } from '../users';
import { IRequest, Request, RequestStatus } from './index';
import { ITimelineItem, TimelineItem } from './timeline';

export enum AbstractRequestStatus {
  pending = 'pending',
  accepted = 'accepted',
  ongoing = 'ongoing',
  finished = 'finished',
  archived = 'archived',
}

export interface IRequestWithOffersAndTimelineItems extends IRequest {
  offers: Record<string, IOfferWithLocation>;
  timeline: ITimelineItem[];
  contactNumber?: string | null;
}

export class RequestWithOffersAndTimeline extends Request
  implements IRequestWithOffersAndTimelineItems {
  constructor(
    pinUserRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
    pinUserSnapshot: User,
    title: string,
    description: string,
    latLng: firebase.firestore.GeoPoint,
    streetAddress: string,
    cavUserRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    > | null = null,
    cavUserSnapshot: User | null = null,
    status = RequestStatus.pending,
    createdAt = firestore.Timestamp.now(),
    updatedAt = firestore.Timestamp.now(),
    pinRating: number | null = null,
    cavRating: number | null = null,
    pinRatedAt: firebase.firestore.Timestamp | null = null,
    cavRatedAt: firebase.firestore.Timestamp | null = null,
    offers: Record<string, OfferWithLocation> = {},
    timelineItems: TimelineItem[] = [],
    contactNumber: string | null = null,
  ) {
    super(
      '????', // TODO: (es) This needs to be rewritten
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
    this._timelineItems = timelineItems;
    this._contactNumber = contactNumber;
  }

  @IsString()
  private _contactNumber: string | null;

  get contactNumber(): string | null {
    return this._contactNumber;
  }

  set contactNumber(contactNumber: string | null) {
    this._contactNumber = contactNumber;
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
  private _timelineItems: TimelineItem[];

  get timeline(): TimelineItem[] {
    return this._timelineItems;
  }

  set timeline(timelineItems: TimelineItem[]) {
    this._timelineItems = timelineItems;
  }

  public addToTimeline(timelineItem: TimelineItem) {
    this._timelineItems.push(timelineItem);
  }

  public getRequest(): Request {
    return Request.factory(this.toObject() as IRequest);
  }

  public static factory(
    data: IRequestWithOffersAndTimelineItems,
  ): RequestWithOffersAndTimeline {
    return new RequestWithOffersAndTimeline(
      // TODO: (es) This is old codeL
      // db.doc(data.pinUserRef as any),
      // not working now, not sure how it originally worked
      // as argument to doc has to be a string.  pinUserRef is what is needed
      data.pinUserRef,
      User.factory(data.pinUserSnapshot),
      data.title,
      data.description,
      new firestore.GeoPoint(
        (data.latLng as any)._latitude,
        (data.latLng as any)._longitude,
      ),
      data.streetAddress,
      // TODO: (es) review remove: data.cavUserRef ? db.doc(data.cavUserRef as any) : null,
      data.cavUserRef,
      // This field may be null
      data.cavUserSnapshot ? User.factory(data.cavUserSnapshot) : null,
      data.status,
      data.createdAt
        ? new firestore.Timestamp(
            (data.createdAt as any)._seconds,
            (data.createdAt as any)._nanoseconds,
          )
        : data.createdAt,
      data.updatedAt
        ? new firestore.Timestamp(
            (data.updatedAt as any)._seconds,
            (data.updatedAt as any)._nanoseconds,
          )
        : data.updatedAt,
      data.pinRating,
      data.cavRating,
      data.pinRatedAt
        ? new firestore.Timestamp(
            (data.pinRatedAt as any)._seconds,
            (data.pinRatedAt as any)._nanoseconds,
          )
        : data.pinRatedAt,
      data.cavRatedAt
        ? new firestore.Timestamp(
            (data.cavRatedAt as any)._seconds,
            (data.cavRatedAt as any)._nanoseconds,
          )
        : data.cavRatedAt,
      Object.keys(data.offers).reduce(
        (acc: Record<string, OfferWithLocation>, key: string) => ({
          ...acc,
          [key]: OfferWithLocation.factory(data.offers[key]),
        }),
        {},
      ),
      data.timeline.map(timeline =>
        TimelineItem.factory({
          ...timeline,
          actorRef: db.doc(timeline.actorRef as any),
          actorSnapshot: {
            ...timeline.actorSnapshot,
            createdAt: timeline.actorSnapshot.createdAt
              ? new firestore.Timestamp(
                  (timeline.actorSnapshot.createdAt as any)._seconds,
                  (timeline.actorSnapshot.createdAt as any)._nanoseconds,
                )
              : timeline.actorSnapshot.createdAt,
          },
          requestRef: db.doc(timeline.requestRef as any),
          requestSnapshot: {
            ...timeline.requestSnapshot,
            latLng: new firestore.GeoPoint(
              (timeline.requestSnapshot.latLng as any)._latitude,
              (timeline.requestSnapshot.latLng as any)._longitude,
            ),
            pinUserRef: db.doc(timeline.requestSnapshot.pinUserRef as any),
            createdAt: timeline.requestSnapshot.createdAt
              ? new firestore.Timestamp(
                  (timeline.requestSnapshot.createdAt as any)._seconds,
                  (timeline.requestSnapshot.createdAt as any)._nanoseconds,
                )
              : timeline.requestSnapshot.createdAt,
            updatedAt: timeline.requestSnapshot.updatedAt
              ? new firestore.Timestamp(
                  (timeline.requestSnapshot.updatedAt as any)._seconds,
                  (timeline.requestSnapshot.updatedAt as any)._nanoseconds,
                )
              : timeline.requestSnapshot.updatedAt,
            pinRatedAt: timeline.requestSnapshot.pinRatedAt
              ? new firestore.Timestamp(
                  (timeline.requestSnapshot.pinRatedAt as any)._seconds,
                  (timeline.requestSnapshot.pinRatedAt as any)._nanoseconds,
                )
              : timeline.requestSnapshot.pinRatedAt,
            cavRatedAt: timeline.requestSnapshot.cavRatedAt
              ? new firestore.Timestamp(
                  (timeline.requestSnapshot.cavRatedAt as any)._seconds,
                  (timeline.requestSnapshot.cavRatedAt as any)._nanoseconds,
                )
              : timeline.requestSnapshot.cavRatedAt,
          },
          createdAt: timeline.createdAt
            ? new firestore.Timestamp(
                (timeline.createdAt as any)._seconds,
                (timeline.createdAt as any)._nanoseconds,
              )
            : timeline.createdAt,
        }),
      ),
      data.contactNumber,
    );
  }

  public toObject(): object {
    return {
      cavUserRef: this.cavUserRef,
      cavUserSnapshot: this.cavUserSnapshot
        ? this.cavUserSnapshot.toObject()
        : null,
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
      offers: Object.keys(this.offers).reduce(
        (acc: Record<string, IOfferWithLocation>, key: string) => ({
          ...acc,
          [key]: this.offers[key].toObject() as IOfferWithLocation,
        }),
        {},
      ),
      timeline: this.timeline.map(obj => obj.toObject()),
      contactNumber: this.contactNumber,
    };
  }
}

export const RequestWithOffersFirestoreConverter: firebase.firestore.FirestoreDataConverter<RequestWithOffersAndTimeline> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<
      IRequestWithOffersAndTimelineItems
    >,
  ): RequestWithOffersAndTimeline =>
    RequestWithOffersAndTimeline.factory(data.data()),
  toFirestore: (
    modelObject: RequestWithOffersAndTimeline,
  ): firebase.firestore.DocumentData => modelObject.toObject(),
};
