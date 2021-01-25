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

type firebaseRefType = firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>;

type firebaseTimestampType = firebase.firestore.Timestamp;
export interface IPost extends firebase.firestore.DocumentData {
  postId: string | null;
  isResponse: boolean;
  requestingHelp: boolean;
  sourcePublicPostId: string | null;
  userRef: firebaseRefType | null;
  userSnapshot: IUser;
  title: string;
  description: string;
  streetAddress: string;
  latLng: firebase.firestore.GeoPoint;
  status: PostStatus;
  creatorGivenRating: number | null;
  parentCreatorGivenRating: number | null;
  creatorRatedAt: firebaseTimestampType | null;
  parentCreatorRatedAt: firebaseTimestampType | null;
  updateSeenBy: string[];
  positiveResponseCount: number;
  negativeResponseCount: number;
  createdAt?: firebaseTimestampType | null;
  updatedAt?: firebaseTimestampType | null;
}

export class Post implements IPost {
  constructor(
    /* TODO: (es) define keyType and change this to a keyType */
    postId: string | null,
    isResponse = false,
    requestingHelp = false,
    sourcePublicPostId: string | null = null,
    userRef: firebaseRefType | null,
    userSnapshot: User,
    title: string,
    description: string,
    streetAddress: string,
    latLng: firebase.firestore.GeoPoint,
    status: PostStatus = PostStatus.open,
    creatorGivenRating: number | null = null,
    parentCreatorGivenRating: number | null = null,
    creatorRatedAt: firebaseTimestampType | null = null,
    parentCreatorRatedAt: firebaseTimestampType | null = null,
    updateSeenBy: string[] = [],
    positiveResponseCount = 0,
    negativeResponseCount = 0,
    createdAt?: firebaseTimestampType | null,
    updatedAt?: firebaseTimestampType | null,
  ) {
    this._postId = postId;
    this._isResponse = isResponse;
    this._requestingHelp = requestingHelp;
    this._sourcePublicPostId = sourcePublicPostId;
    this._userRef = userRef;
    this._userSnapshot = userSnapshot;
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
  private _postId: string | null;

  set postId(postId: string | null) {
    this._postId = postId;
  }

  get postId(): string | null {
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
  private _sourcePublicPostId: string | null;

  get sourcePublicPostId(): string | null {
    return this._sourcePublicPostId;
  }

  set sourcePublicPostId(sourcePublicPostId: string | null) {
    this._sourcePublicPostId = sourcePublicPostId;
  }

  @IsNotEmptyObject()
  private _userRef: firebaseRefType | null;

  get userRef(): firebaseRefType | null {
    return this._userRef;
  }

  set userRef(userRef: firebaseRefType | null) {
    this._userRef = userRef;
  }

  @ValidateNested()
  private _userSnapshot: User;

  get userSnapshot(): User {
    return this._userSnapshot;
  }

  set userSnapshot(userSnapshot: User) {
    this._userSnapshot = userSnapshot;
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
  private _createdAt: firebaseTimestampType | null | undefined;

  get createdAt(): firebaseTimestampType | null | undefined {
    return this._createdAt;
  }

  set createdAt(value: firebaseTimestampType | null | undefined) {
    this._createdAt = value;
  }

  /* TODO: When we reach greater than 500 requests updated per second:
       https://firebase.google.com/docs/firestore/solutions/shard-timestamp#sharding_a_timestamp_field
     */
  @IsObject()
  private _updatedAt: firebaseTimestampType | null | undefined;

  get updatedAt(): firebaseTimestampType | null | undefined {
    return this._updatedAt;
  }

  set updatedAt(value: firebaseTimestampType | null | undefined) {
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
  private _creatorRatedAt: firebaseTimestampType | null;

  get creatorRatedAt(): firebaseTimestampType | null {
    return this._creatorRatedAt;
  }

  set creatorRatedAt(creatorRatedAt: firebaseTimestampType | null) {
    this._creatorRatedAt = creatorRatedAt;
  }

  @Allow()
  @IsOptional()
  private _parentCreatorRatedAt: firebaseTimestampType | null;

  get parentCreatorRatedAt(): firebaseTimestampType | null {
    return this._parentCreatorRatedAt;
  }

  set parentCreatorRatedAt(parentCreatorRatedAt: firebaseTimestampType | null) {
    this._parentCreatorRatedAt = parentCreatorRatedAt;
  }

  public static factory(data: IPost): Post {
    return new Post(
      data.postId,
      data.isResponse,
      data.requestingHelp,
      data.sourcePublicPostId,
      data.userRef,
      User.factory(data.userSnapshot),
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
      postId: this.postId,
      isResponse: this.isResponse,
      requestingHelp: this.requestingHelp,
      sourcePublicPostId: this.sourcePublicPostId || null,
      userRef: this.userRef,
      userSnapshot: this.userSnapshot.toObject(),
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
      createdAt: this.createdAt || null,
      updatedAt: this.updatedAt || null,
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
