export interface PrivilegedRequestInformation {
  address: google.maps.GeocoderResult;
}

export const PrivilegedRequestInformationFirestoreConverter: firebase.firestore.FirestoreDataConverter<PrivilegedRequestInformation> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<
      PrivilegedRequestInformation
    >,
  ) => data.data(),
  toFirestore: modelObject => modelObject,
};
