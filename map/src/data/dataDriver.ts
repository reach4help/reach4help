/* eslint-disable no-console */
import {
  Location,
  MarkerInfo,
  MarkerInfoWithId,
} from '@reach4help/model/lib/markers';
import algoliasearch from 'algoliasearch';
import { v4 as uuidv4 } from 'uuid';

import { R4HGeoPoint } from './R4HGeoPoint';

export type LocationType = Location<R4HGeoPoint>;
export type MarkerInfoType = MarkerInfo<R4HGeoPoint>;
export type MarkerInfoWithIdType = MarkerInfoWithId<R4HGeoPoint>;

const algoliaAdminKey = process.env.REACT_APP_ALGOLIA_ADMIN_KEY || 'undefined';
const algoliaAppId = process.env.REACT_APP_ALGOLIA_APP_ID || 'undefined';
const algoliaIndexName =
  process.env.REACT_APP_ALGOLIA_INDEX_NAME || 'undefined';

const client = algoliasearch(algoliaAppId, algoliaAdminKey);
const algoliaIndex = client.initIndex(algoliaIndexName);

const LOCAL_STORAGE_KEY = 'dataConfig';

interface DataConfig {
  includingHidden: boolean;
}

const getDataConfig = (): DataConfig => {
  const dataConfig = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (dataConfig) {
    return JSON.parse(dataConfig);
  }
  return {
    includingHidden: false,
  };
};

const setDataConfig = (dataConfig: DataConfig) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataConfig));
};

export const addMarker = async (marker: MarkerInfoType, visible: boolean) => {
  // eslint-disable-next-line no-param-reassign
  const latlng = marker?.loc?.latlng;
  const newMarker = { ...marker } as MarkerInfoWithIdType;
  newMarker._geoLoc = {
    lat: latlng?.latitude,
    lng: latlng?.longitude,
  };
  newMarker.id = `MAH-${marker?.source?.id || uuidv4()}`;
  newMarker.visible = visible;
  newMarker.objectID = newMarker.id;
  newMarker.createdAt = new Date();
  newMarker.updatedAt = new Date();
  // eslint-disable-next-line no-param-reassign
  newMarker._geoLoc = { lat: latlng.latitude, lng: latlng.latitude };
  await algoliaIndex.saveObject(newMarker);
};

export interface MarkersUpdate {
  loading: boolean;
  initialMarkers: Map<string, MarkerInfoType>;
  detailMarkers: Map<string, MarkerInfoType>;
  /**
   * True iff the data includes hidden markers that have not yet been
   * reviewed and approved.
   */
  includingHidden: boolean;
}

export type MarkersListener = (event: MarkersUpdate) => void;

interface MarkersDataInfo {
  loadDone: boolean;
  markers: Map<string, MarkerInfoType>;
}

const listeners = new Set<MarkersListener>();
const state: {
  data: {
    initialMarkersInfo: MarkersDataInfo;
    detailMarkersInfo: MarkersDataInfo;
  };
  increment: number;
  includeHidden: boolean;
  loadingOperations: Set<Promise<unknown>>;
  errors: Set<Error>;
} = {
  data: {
    initialMarkersInfo: {
      loadDone: false,
      markers: new Map(),
    },
    detailMarkersInfo: {
      loadDone: false,
      markers: new Map(),
    },
  },
  increment: 0,
  includeHidden: getDataConfig().includingHidden,
  loadingOperations: new Set(),
  errors: new Set(),
};

const getMarkersDataForListener = (): MarkersUpdate => ({
  loading: state.loadingOperations.size > 0,
  initialMarkers: state.data.initialMarkersInfo.markers,
  detailMarkers: state.data.detailMarkersInfo.markers,
  includingHidden: state.includeHidden,
});

const updateListeners = () => {
  const data = getMarkersDataForListener();
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
      // eslint-disable-next-line no-console
      console.error(err);
      state.loadingOperations.delete(promise);
      state.errors.add(err);
      updateListeners();
    },
  );
};

export const addInformationListener = (l: MarkersListener) => {
  listeners.add(l);
  l(getMarkersDataForListener());
};

export const removeInformationListener = (l: MarkersListener) => {
  listeners.delete(l);
};

const loadDataForMode = (
  mode: 'initial' | 'detail',
  bounds?: {
    upperLeft: { lat: number; lng: number };
    lowerRight: { lat: number; lng: number };
  },
) => {
  const dataModeMarkers =
    mode === 'initial'
      ? state.data.initialMarkersInfo
      : state.data.detailMarkersInfo;
  if (dataModeMarkers.loadDone) {
    return;
  }
  dataModeMarkers.loadDone = true;

  const boundingBox = bounds
    ? [
        bounds.upperLeft.lat,
        bounds.upperLeft.lng,
        bounds.lowerRight.lat,
        bounds.lowerRight.lng,
      ]
    : undefined;
  const boundingBoxParam = boundingBox
    ? { insideBoundingBox: [boundingBox] }
    : {};

  const attributesToDisplay =
    mode === 'initial' ? ['id', 'contentTitle', 'loc', 'type'] : ['*'];

  const promise = algoliaIndex.browseObjects({
    query: '',
    hitsPerPage: 12000,
    ...boundingBoxParam,
    attributesToRetrieve: attributesToDisplay,
    batch: batch => {
      batch.forEach(batchMarker => {
        const marker = (batchMarker as unknown) as MarkerInfoWithIdType;
        dataModeMarkers.markers.set(marker.id, marker);
      });
      state.increment += 1;
    },
  });

  processPromise(promise);
  return promise;
};

export const loadData = (bounds?: {
  upperLeft: { lat: number; lng: number };
  lowerRight: { lat: number; lng: number };
}) => {
  // note: if nothing passed to bounds, bounds still set to an object
  //       validBounds corrects this
  const validBounds = bounds?.upperLeft?.lat ? bounds : undefined;
  loadDataForMode('initial', validBounds);
  loadDataForMode('detail');
};

export const includingHidden = () => state.includeHidden;

export const includeHiddenMarkers = (include: boolean) => {
  setDataConfig({
    includingHidden: include,
  });
  state.includeHidden = include;
  loadData();
  updateListeners();
};

export const addStorageListener = () => {
  window.addEventListener('storage', e => {
    if (e.key === LOCAL_STORAGE_KEY) {
      const dataConfig = getDataConfig();
      state.includeHidden = dataConfig.includingHidden;
      loadData();
      updateListeners();
    }
  });
};
