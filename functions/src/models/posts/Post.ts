import {
  Allow,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { firestore } from 'firebase';

import { User } from '../users/User';
import { GenericPostStatus } from './GenericPostStatus';
import { IPost } from './IPost';

export class Post implements IPost {
  postRef: string;

  genericStatus: GenericPostStatus;

  constructor(post: IPost) {
    this.postRef = post.postRef;
    this.genericStatus = post.genericStatus;
    this._isResponse = post.isResponse;
    this._isRequest = post.isRequest;
    this._parentRef = post.parentRef;
    this._creatorRef = post.creatorRef;
    this._creatorSnapshot = post.creatorSnapshot;
    this._title = post.title;
    this._description = post.description;
    this._latLng = post.latLng;
    this._streetAddress = post.streetAddress;
    this._genericStatus = post.genericStatus;
    this._createdAt = firestore.Timestamp.now();
    this._updatedAt = firestore.Timestamp.now();
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

  set creatorRef(creatorRef: string) {
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
  private _genericStatus: GenericPostStatus;

  get status(): GenericPostStatus {
    return this._genericStatus;
  }

  set status(status: GenericPostStatus) {
    this._genericStatus = status;
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
    return new Post(data);
  }

  public static async fromPost(data: Post, path: string): Promise<Post> {
    console.log(path);
    return Promise.resolve(new Post(data));
  };

  public static getObjectId(postPath: string): string {
    const lastSlashPos = postPath.lastIndexOf('/');
    return postPath.substring(lastSlashPos + 1);
  }

  toAlgolia(): object {
    return {
      postRef: this.postRef,
      isRequest: this.isRequest,
      objectID: Post.getObjectId(this.postRef),
      creatorSnapshot: this.creatorSnapshot,
      title: this.title,
      description: this.description,
      _geoloc: {
        lat: this.latLng.latitude,
        lng: this.latLng.longitude,
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
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
