import * as firebase from 'firebase/app';

import 'firebase/firestore';

import { MarkerInfo } from './markers';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const isValidMarkerInfo = (
  data: firebase.firestore.DocumentData,
): data is MarkerInfo =>
  // TODO
  !!data;

const MARKER_COLLECTION_ID = 'markers';

firebase.initializeApp(config);
const db = firebase.firestore();
const markers = db.collection(MARKER_COLLECTION_ID);

export const submitInformation = async (info: MarkerInfo) => {
  await markers.add(info);
};

export interface InformationUpdate {
  loading: boolean;
  markers: Map<string, MarkerInfo>;
}

export type InformationListener = (event: InformationUpdate) => void;

const listeners = new Set<InformationListener>();
const state: {
  initialLoadDone: boolean;
  loadingOperations: Set<Promise<unknown>>;
  markers: Map<string, MarkerInfo>;
  errors: Set<Error>;
} = {
  initialLoadDone: false,
  loadingOperations: new Set(),
  markers: new Map(),
  errors: new Set(),
};

const getInfoForListeners = (): InformationUpdate => ({
  loading: state.loadingOperations.size > 0,
  markers: state.markers,
});

const updateListeners = () => {
  const data = getInfoForListeners();
  listeners.forEach(l => l(data));
};

/**
 * Store the promise in state, update listeners,
 * and setup appropriate handlers
 */
const processPromise = (promise: Promise<unknown>) => {
  state.loadingOperations.add(promise);
  updateListeners();
  promise.then(
    () => {
      state.loadingOperations.delete(promise);
      updateListeners();
    },
    err => {
      state.loadingOperations.delete(promise);
      state.errors.add(err);
      updateListeners();
    },
  );
};

export const addInformationListener = (l: InformationListener) => {
  listeners.add(l);
  l(getInfoForListeners());
};

export const removeInformationListener = (l: InformationListener) => {
  listeners.delete(l);
};

export const loadInitialData = () => {
  if (state.initialLoadDone) {
    return;
  }
  state.initialLoadDone = true;
  const promise = markers
    .where(new firebase.firestore.FieldPath('visible'), '==', false)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        if (isValidMarkerInfo(data)) {
          state.markers.set(doc.id, data);
        }
      });
    });
  processPromise(promise);
  return promise;
};
