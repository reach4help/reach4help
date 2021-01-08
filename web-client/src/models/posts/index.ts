/* eslint no-underscore-dangle: 0 */
// TODO: (ES) changing to force format, remove
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
  postId: string | null;
  isResponse: boolean;
  requestingHelp: boolean;
  sourcePostId?: string | null;
  creatorId: string;
  creatorSnapshot: IUser;
  title: string;
  description: string;
  streetAddress: string;
  geoloc?: firebase.firestore.GeoPoint | undefined;
  latLng: firebase.firestore.GeoPoint;
  status: PostStatus;
  creatorGivenRating: number | null;
  parentCreatorGivenRating: number | null;
  creatorRatedAt: Date | null;
  parentCreatorRatedAt: Date | null;
  updateSeenBy: string[];
  positiveResponseCount: number;
  negativeResponseCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Post implements IPost {
  constructor(
    /* TODO: (es) define keyType and change this to a keyType */
    postId: string,
    isResponse = false,
    requestingHelp = false,
    sourcePostId: string | null = null,
    creatorId: string,
    creatorSnapshot: User,
    title: string,
    description: string,
    streetAddress: string,
    latLng: firebase.firestore.GeoPoint,
    status: PostStatus = PostStatus.open,
    creatorGivenRating: number | null = null,
    parentCreatorGivenRating: number | null = null,
    creatorRatedAt: Date | null = null,
    parentCreatorRatedAt: Date | null = null,
    updateSeenBy: string[] = [],
    positiveResponseCount = 0,
    negativeResponseCount = 0,
    createdAt = firestore.Timestamp.now(),
    updatedAt = firestore.Timestamp.now(),
  ) {
    this._postId = postId;
    this._isResponse = isResponse;
    this._requestingHelp = requestingHelp;
    this._sourcePostId = sourcePostId;
    this._creatorId = creatorId;
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

  @IsString()
  @IsNotEmpty()
  private _postId: string;

  get postId(): string {
    return this._postId;
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
  private _requestingHelp: boolean;

  get requestingHelp(): boolean {
    return this._requestingHelp;
  }

  set requestingHelp(requestingHelp: boolean) {
    this._requestingHelp = requestingHelp;
  }

  @Allow()
  @IsOptional()
  private _sourcePostId: string | null;

  get sourcePostId(): string | null {
    return this._sourcePostId;
  }

  set sourcePostId(sourcePostId: string | null) {
    this._sourcePostId = sourcePostId;
  }

  @IsNotEmptyObject()
  private _creatorId: string;

  get creatorId(): string {
    return this._creatorId;
  }

  set creatorId(creatorId: string) {
    this._creatorId = creatorId;
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

  @IsOptional()
  @IsObject()
  public _geoloc: firebase.firestore.GeoPoint | undefined;

  get geoloc(): firebase.firestore.GeoPoint | undefined {
    return this._geoloc;
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
  private _updateSeenBy: string[];

  get updateSeenBy(): string[] {
    return this._updateSeenBy;
  }

  set updateSeenBy(updateSeenBy: string[]) {
    this._updateSeenBy = updateSeenBy;
  }

  /* TODO: When we reach greater than 500 requests created per second:
       https://firebase.google.com/docs/firestore/solutions/shard-timestamp#sharding_a_timestamp_field
     */
  @IsObject()
  private _createdAt: Date;

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  /* TODO: When we reach greater than 500 requests updated per second:
       https://firebase.google.com/docs/firestore/solutions/shard-timestamp#sharding_a_timestamp_field
     */
  @IsObject()
  private _updatedAt: Date;

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
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
  private _creatorRatedAt: Date | null;

  get creatorRatedAt(): Date | null {
    return this._creatorRatedAt;
  }

  set creatorRatedAt(creatorRatedAt: Date | null) {
    this._creatorRatedAt = creatorRatedAt;
  }

  @Allow()
  @IsOptional()
  private _parentCreatorRatedAt: Date | null;

  get parentCreatorRatedAt(): Date | null {
    return this._parentCreatorRatedAt;
  }

  set parentCreatorRatedAt(parentCreatorRatedAt: Date | null) {
    this._parentCreatorRatedAt = parentCreatorRatedAt;
  }

  public static factory(data: IPost): Post {
    const id = data.postId || new Date().getTime().toString();
    return new Post(
      id,
      data.isResponse,
      data.requestingHelp,
      data.sourcePostId,
      data.creatorId,
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
      requestingHelp: this.requestingHelp,
      parentRef: this.sourcePostId || null,
      creatorId: this.creatorId,
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
      postiveResponseCount: this.positiveResponseCount,
      negativeResponseCount: this.negativeResponseCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export const PostFirestoreConverter: firebase.firestore.FirestoreDataConverter<Post> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<IPost>,
  ): Post => Post.factory(data.data()),
  toFirestore: (modelObject: Post): firebase.firestore.DocumentData =>
    modelObject.toObject(),
};
