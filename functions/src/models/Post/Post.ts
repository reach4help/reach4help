import {
  Allow,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { firestore } from 'firebase';

import { User } from '../users';
import { IPost } from './IPost';
import { GenericPostStatus } from './GenericPostStatus';

export class Post implements IPost {
  constructor(
    isResponse = false,
    isRequest = false,
    parentRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    > | null = null,
    creatorRef: string,
    creatorSnapshot: User,
    title: string,
    description: string,
    streetAddress: string,
    latLng: firebase.firestore.GeoPoint,
    status: GenericPostStatus = GenericPostStatus.open,
    createdAt = firestore.Timestamp.now(),
    updatedAt = firestore.Timestamp.now(),
  ) {
    this._isResponse = isResponse;
    this._isRequest = isRequest;
    this._parentRef = parentRef;
    this._creatorRef = creatorRef;
    this._creatorSnapshot = creatorSnapshot;
    this._title = title;
    this._description = description;
    this._latLng = latLng;
    this._streetAddress = streetAddress;
    this._status = status;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  @Allow()
  @IsOptional()
  private _isResponse: boolean;

  get isResponse(): boolean {
    return this._isResponse;
  }

  set isResponse(isResponse: boolean) {
    this._isResponse = isResponse;
  }

  @Allow()
  private _isRequest: boolean;

  get isRequest(): boolean {
    return this._isRequest;
  }

  set isRequest(isRequest: boolean) {
    this._isRequest = isRequest;
  }

  @Allow()
  @IsOptional()
  private _parentRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;

  get parentRef(): firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null {
    return this._parentRef;
  }

  set parentRef(
    parentRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    > | null,
  ) {
    this._parentRef = parentRef;
  }

  @IsNotEmptyObject()
  private _creatorRef: string;

  get creatorRef(): string {
    return this._creatorRef;
  }

  set creatorRef(
    creatorRef: string,
  ) {
    this._creatorRef = creatorRef;
  }

  @ValidateNested()
  private _creatorSnapshot: User;

  get creatorSnapshot(): User {
    return this._creatorSnapshot;
  }

  set creatorSnapshot(creatorSnapshot: User) {
    this._creatorSnapshot = creatorSnapshot;
  }

  @IsString()
  @IsNotEmpty()
  private _title: string;

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  @IsString()
  private _description: string;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  @IsString()
  private _streetAddress: string;

  get streetAddress(): string {
    return this._streetAddress;
  }

  set streetAddress(value: string) {
    this._streetAddress = value;
  }

  @IsObject()
  private _latLng: firebase.firestore.GeoPoint;

  get latLng(): firebase.firestore.GeoPoint {
    return this._latLng;
  }

  set latLng(value: firebase.firestore.GeoPoint) {
    this._latLng = value;
  }

  @IsEnum(GenericPostStatus)
  private _status: GenericPostStatus;

  get status(): GenericPostStatus {
    return this._status;
  }

  set status(status: GenericPostStatus) {
    this._status = status;
  }

  @IsArray()
  private _updateSeenBy: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >[];

  get updateSeenBy(): firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >[] {
    return this._updateSeenBy;
  }

  set updateSeenBy(
    updateSeenBy: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >[],
  ) {
    this._updateSeenBy = updateSeenBy;
  }

  /* TODO: When we reach greater than 500 requests created per second:
       https://firebase.google.com/docs/firestore/solutions/shard-timestamp#sharding_a_timestamp_field
     */
  @IsObject()
  private _createdAt: firebase.firestore.Timestamp;

  get createdAt(): firebase.firestore.Timestamp {
    return this._createdAt;
  }

  set createdAt(value: firebase.firestore.Timestamp) {
    this._createdAt = value;
  }

  /* TODO: When we reach greater than 500 requests updated per second:
       https://firebase.google.com/docs/firestore/solutions/shard-timestamp#sharding_a_timestamp_field
     */
  @IsObject()
  private _updatedAt: firebase.firestore.Timestamp;

  get updatedAt(): firebase.firestore.Timestamp {
    return this._updatedAt;
  }

  set updatedAt(value: firebase.firestore.Timestamp) {
    this._updatedAt = value;
  }

  public static factory(data: IPost): Post {
    return new Post(
      data.isResponse,
      data.isRequest,
      data.parentRef,
      data.creatorRef,
      User.factory(data.creatorSnapshot),
      data.title,
      data.description,
      data.streetAddress,
      data.latLng,
      data.status,
      data.createdAt,
      data.updatedAt,
    );
  }

  toObject(): object {
    return {
      isResponse: this.isResponse,
      isRequest: this.isRequest,
      parentRef: this.parentRef || null,
      creatorRef: this.creatorRef,
      creatorSnapshot: this.creatorSnapshot.toObject(),
      title: this.title,
      description: this.description,
      streetAddress: this.streetAddress,
      latLng: this.latLng,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
