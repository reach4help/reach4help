import firebase from 'firebase/app';
import { IUser } from '../users/IUser';
import { GenericPostStatus } from './GenericPostStatus';
import { IPost } from './IPost';

export class Post implements IPost {
  postRef: string;

  postStatus: GenericPostStatus;

  isResponse: boolean;

  isRequest: boolean;

  parentRef: string;

  creatorRef: string;

  creatorSnapshot: IUser;

  title: string;

  description: string;

  latLng: firebase.firestore.GeoPoint;

  streetAddress: string;

  createdAt?: firebase.firestore.Timestamp | undefined;

  updatedAt?: firebase.firestore.Timestamp | undefined;

  constructor(post: IPost) {
    this.postRef = post.postRef;
    this.postStatus = post.postStatus;
    this.isResponse = post.isResponse;
    this.isRequest = post.isRequest;
    this.parentRef = post.parentRef;
    this.creatorRef = post.creatorRef;
    this.creatorSnapshot = post.creatorSnapshot;
    this.title = post.title;
    this.description = post.description;
    this.latLng = post.latLng;
    this.streetAddress = post.streetAddress;
    this.postStatus = post.postStatus;
    // this._createdAt = firebase.firestore.Timestamp.now();
    // this._updatedAt = firebase.firestore.Timestamp.now();
  }

  public static factory(data: IPost): Post {
    return new Post(data);
  }

  // TODO: Get rid of path
  public static async fromPost(data: IPost, path: string): Promise<Post> {
    return path ? Promise.resolve(new Post(data)) : new Post(data);
  }

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
      postStatus: this.postStatus,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
