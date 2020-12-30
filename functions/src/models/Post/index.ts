/* eslint no-underscore-dangle: 0 */
import {
  Allow,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { firestore } from 'firebase';

import { IUser, User } from '../users';

export enum PostStatus {
  pending = 'pending',
  ongoing = 'ongoing',
  completed = 'completed',
  closed = 'closed',
  open = 'open',
  active = 'active',
  removed = 'removed',
}

export interface IPost extends firebase.firestore.DocumentData {
  isResponse: boolean;
  parentSnapshot: IPost | null;
  parentRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null;
  creatorRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
  creatorSnapshot: IUser;
  title: string;
  description: string;
  streetAddress: string;
  latLng: firebase.firestore.GeoPoint;
  status: PostStatus;
  creatorGivenRating: number | null;
  parentCreatorGivenRating: number | null;
  creatorRatedAt: firebase.firestore.Timestamp | null;
  parentCreatorRatedAt: firebase.firestore.Timestamp | null;
  updateSeenBy: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>[];
  positiveResponseCount: number;
  negativeResponseCount: number;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}

export class Post implements IPost {
  constructor(
    isResponse = false,
    parentSnapshot: Post | null = null,
    parentRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null = null,
    creatorRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
    creatorSnapshot: User,
    title: string,
    description: string,
    streetAddress: string,
    latLng: firebase.firestore.GeoPoint,
    status: PostStatus = PostStatus.open,
    creatorGivenRating: number | null = null,
    parentCreatorGivenRating: number | null = null,
    creatorRatedAt: firebase.firestore.Timestamp | null = null,
    parentCreatorRatedAt: firebase.firestore.Timestamp | null = null,
    updateSeenBy: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>[] = [],
    positiveResponseCount = 0,
    negativeResponseCount = 0,
    createdAt = firestore.Timestamp.now(),
    updatedAt = firestore.Timestamp.now(),
  ) {
    this._isResponse = isResponse;
    this._parentRef = parentRef;
    this._parentSnapshot = parentSnapshot;
    this._creatorRef = creatorRef;
    this._creatorSnapshot = creatorSnapshot;
    this._title = title;
    this._description = description;
    this._latLng = latLng;
    this._streetAddress = streetAddress;
    this._status = status;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._creatorGivenRating = creatorGivenRating;
    this._parentCreatorGivenRating = parentCreatorGivenRating;
    this._creatorRatedAt = creatorRatedAt;
    this._parentCreatorRatedAt = parentCreatorRatedAt;
    this._updateSeenBy = updateSeenBy;
    this._positiveResponseCount = positiveResponseCount;
    this._negativeResponseCount = negativeResponseCount;
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
  @IsOptional()
  private _parentRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null;

  get parentRef(): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null {
    return this._parentRef;
  }

  set parentRef(parentRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null) {
    this._parentRef = parentRef;
  }

  @ValidateNested()
  @IsOptional()
  private _parentSnapshot: Post | null;

  get parentSnapshot(): Post | null {
    return this._parentSnapshot;
  }

  set parentSnapshot(parentSnapshot: Post | null) {
    this._parentSnapshot = parentSnapshot;
  }

  @IsNotEmptyObject()
  private _creatorRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

  get creatorRef(): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
    return this._creatorRef;
  }

  set creatorRef(creatorRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>) {
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

  @IsInt()
  @IsNotEmpty()
  private _positiveResponseCount: number;

  get positiveResponseCount(): number {
    return this._positiveResponseCount;
  }

  set postiveResponseCount(value: number) {
    this._positiveResponseCount = value;
  }

  @IsInt()
  @IsNotEmpty()
  private _negativeResponseCount: number;

  get negativeResponseCount(): number {
    return this._negativeResponseCount;
  }

  set negativeResponseCount(value: number) {
    this._negativeResponseCount = value;
  }

  @IsString()
  @IsNotEmpty()
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

  @IsEnum(PostStatus)
  private _status: PostStatus;

  get status(): PostStatus {
    return this._status;
  }

  set status(status: PostStatus) {
    this._status = status;
  }

  @IsArray()
  private _updateSeenBy: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>[];

  get updateSeenBy(): firebase.firestore.DocumentReference<firebase.firestore.DocumentData>[] {
    return this._updateSeenBy;
  }

  set updateSeenBy(updateSeenBy: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>[]) {
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

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  private _creatorGivenRating: number | null;

  get creatorGivenRating(): number | null {
    return this._creatorGivenRating;
  }

  set creatorGivenRating(creatorGivenRating: number | null) {
    this._creatorGivenRating = creatorGivenRating;
  }

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  private _parentCreatorGivenRating: number | null;

  get parentCreatorGivenRating(): number | null {
    return this._parentCreatorGivenRating;
  }

  set parentCreatorGivenRating(parentCreatorGivenRating: number | null) {
    this._parentCreatorGivenRating = parentCreatorGivenRating;
  }

  @Allow()
  @IsOptional()
  private _creatorRatedAt: firebase.firestore.Timestamp | null;

  get creatorRatedAt(): firebase.firestore.Timestamp | null {
    return this._creatorRatedAt;
  }

  set creatorRatedAt(creatorRatedAt: firebase.firestore.Timestamp | null) {
    this._creatorRatedAt = creatorRatedAt;
  }

  @Allow()
  @IsOptional()
  private _parentCreatorRatedAt: firebase.firestore.Timestamp | null;

  get parentCreatorRatedAt(): firebase.firestore.Timestamp | null {
    return this._parentCreatorRatedAt;
  }

  set parentCreatorRatedAt(parentCreatorRatedAt: firebase.firestore.Timestamp | null) {
    this._parentCreatorRatedAt = parentCreatorRatedAt;
  }

  public static factory(data: IPost): Post {
    return new Post(
      data.isResponse,
      data.parentSnapshot ? Post.factory(data.parentSnapshot) : data.parentSnapshot,
      data.parentRef,
      data.creatorRef,
      User.factory(data.creatorSnapshot),
      data.title,
      data.description,
      data.streetAddress,
      data.latLng,
      data.status,
      data.creatorGivenRating,
      data.parentCreatorGivenRating,
      data.creatorRatedAt,
      data.parentCreatorRatedAt,
      data.updateSeenBy,
      data.positiveResponseCount,
      data.negativeResponseCount,
      data.createdAt,
      data.updatedAt,
    );
  }

  toObject(): object {
    return {
      isResponse: this.isResponse,
      parentSnapshot: this.parentSnapshot?.toObject(),
      parentRef: this.parentRef,
      creatorRef: this.creatorRef,
      creatorSnapshot: this.creatorSnapshot.toObject(),
      title: this.title,
      description: this.description,
      streetAddress: this.streetAddress,
      latLng: this.latLng,
      status: this.status,
      creatorGivenRating: this.creatorGivenRating,
      parentCreatorGivenRating: this.parentCreatorGivenRating,
      creatorRatedAt: this.creatorRatedAt,
      parentCreatorRatedAt: this.parentCreatorRatedAt,
      updateSeenBy: this.updateSeenBy,
      postiveResponseCount: this.postiveResponseCount,
      negativeResponseCount: this.negativeResponseCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export const PostFirestoreConverter: firebase.firestore.FirestoreDataConverter<Post> = {
  fromFirestore: (data: firebase.firestore.QueryDocumentSnapshot<IPost>): Post => Post.factory(data.data()),
  toFirestore: (modelObject: Post): firebase.firestore.DocumentData => modelObject.toObject(),
};
