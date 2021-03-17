import { IsEnum } from 'class-validator';
import { firestore } from 'firebase';
import { firebaseFirestore as db } from 'src/firebaseConfig';
import { IResponsePost } from 'src/models/posts/IResponsePost';
import { Post } from 'src/models/posts/Post';
import { ResponsePostStatus } from 'src/models/posts/ResponsePostStatus';

export class ResponsePost extends Post implements IResponsePost {
  _responseStatus: ResponsePostStatus;

  postRef: any;

  constructor(responsePost: IResponsePost) {
    super(responsePost);
    this._responseStatus = responsePost.responseStatus;
  }

  @IsEnum(ResponseStatus)
  private _responseStatus: ResponsePostStatus;

  get responseStatus(): ResponsePostStatus {
    return this._status;
  }

  set responseStatus(status: ResponsePostStatus) {
    this._status = status;
  }

  public static fromFirestore(
    data: firebase.firestore.DocumentData,
  ): ResponsePost {
    return new ResponsePost(data as IResponsePost);
  }

  public static fromAlgolia(data: Record<string, any>): ResponsePost {
    return new ResponsePost(data as IResponsePost);
  }

  public static getObjectId(postPath: string): string {
    return db.doc(postPath).id;
  }

  public static getParticipantId(userPath: string): string {
    return db.doc(userPath).id;
  }

  public static fromObject(data: IResponsePost): ResponsePost {
    return new ResponsePost(data);
  }

  toObject(): IResponsePost {
    return { ...this };
  }

  toFirestore(): firebase.firestore.DocumentData {
    return {
      postRef: this.postRef,
      isRequest: this.isRequest,
      creatorSnapshot: this.creatorSnapshot,
      title: this.title,
      description: this.description,
      latLng: new firestore.GeoPoint(
        this.latLng.latitude,
        this.latLng.longitude,
      ),
      creatorRef: db.doc(this.creatorRef),
      status: this.responseStatus,
      streetAddress: this.streetAddress,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toAlgolia(): object {
    return {
      postRef: this.postRef,
      isRequest: this.isRequest,
      objectID: db.doc(this.postRef).id,
      creatorSnapshot: this.creatorSnapshot,
      title: this.title,
      description: this.description,
      _geoloc: {
        lat: this.latLng.latitude,
        lng: this.latLng.longitude,
      },
      creatorRef: this.creatorRef,
      status: this.responseStatus,
      streetAddress: this.streetAddress,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
