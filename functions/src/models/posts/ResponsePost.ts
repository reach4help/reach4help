import firebase from 'firebase/app';

// import { firebaseFirestore as db } from 'src/firebaseConfig';
import { IResponsePost } from './IResponsePost';
import { Post } from './Post';
import { ResponsePostStatus } from './ResponsePostStatus';

export class ResponsePost extends Post implements IResponsePost {
  responseStatus: ResponsePostStatus;

  postUuid: any;

  constructor(responsePost: IResponsePost) {
    super(responsePost);
    this.responseStatus = responsePost.responseStatus;
  }

  public static fromFirestore(data: firebase.firestore.DocumentData): ResponsePost {
    return new ResponsePost(data as IResponsePost);
  }

  public static fromAlgolia(data: Record<string, any>): ResponsePost {
    return new ResponsePost(data as IResponsePost);
  }

  public static fromObject(data: IResponsePost): ResponsePost {
    return new ResponsePost(data);
  }

  toObject(): IResponsePost {
    return { ...this };
  }

  toFirestore(): firebase.firestore.DocumentData {
    return {
      postUuid: this.postUuid,
      isRequest: this.isRequest,
      creatorSnapshot: this.creatorSnapshot,
      title: this.title,
      description: this.description,
      latLng: new firebase.firestore.GeoPoint(this.latLng.latitude, this.latLng.longitude),
      creatorRef: this.creatorRef,
      status: this.responseStatus,
      streetAddress: this.streetAddress,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
