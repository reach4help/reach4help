/* eslint-disable no-console */
import {
  Location,
  MarkerInfo,
  MarkerInfoWithId,
} from '@reach4help/model/lib/markers';
import algoliasearch from 'algoliasearch';
import { debugLog } from 'src/util/util';
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

export interface InformationUpdate {
  loading: boolean;
  initialMarkers: Map<string, MarkerInfoType>;
  detailMarkers: Map<string, MarkerInfoType>;
  /**
   * True iff the data includes hidden markers that have not yet been
   * reviewed and approved.
   */
  includingHidden: boolean;
}

export type InformationListener = (event: InformationUpdate) => void;

interface CategoryData {
  loadDone: boolean;
  markers: Map<string, MarkerInfoType>;
}

const listeners = new Set<InformationListener>();
const state: {
  data: {
    initial: CategoryData;
    detail: CategoryData;
  };
  increment: number;
  includeHidden: boolean;
  loadingOperations: Set<Promise<unknown>>;
  errors: Set<Error>;
} = {
  data: {
    initial: {
      loadDone: false,
      markers: new Map(),
    },
    detail: {
      loadDone: false,
      markers: new Map(),
    },
  },
  increment: 0,
  includeHidden: getDataConfig().includingHidden,
  loadingOperations: new Set(),
  errors: new Set(),
};

const getInfoForListeners = (): InformationUpdate => ({
  loading: state.loadingOperations.size > 0,
  initialMarkers: new Map([...state.data.initial.markers]),
  detailMarkers: new Map([...state.data.detail.markers]),
  includingHidden: state.includeHidden,
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
      // eslint-disable-next-line no-console
      console.error(err);
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

const loadInitialDataForMode = (
  mode: 'initial' | 'detail',
  corner1?: { lat: number; lng: number },
  corner2?: { lat: number; lng: number },
) => {
  const dataMode = mode === 'initial' ? state.data.initial : state.data.detail;
  if (dataMode.loadDone) {
    return;
  }
  dataMode.loadDone = true;
  const boundingBox =
    corner1 && corner2
      ? [corner1.lat, corner2.lng, corner2.lat, corner1.lng]
      : undefined;
  const boundingBoxParam = boundingBox
    ? { insideBoundingBox: [boundingBox] }
    : {};
  if (boundingBox) {
    debugLog('boundingBox', ...boundingBox);
  }
  const attributesToDisplay =
    mode === 'initial' ? ['id', 'contentTitle', 'loc', 'type'] : ['*'];

  const promise = algoliaIndex.browseObjects({
    query: '',
    ...boundingBoxParam,
    hitsPerPage: 12000,
    attributesToRetrieve: attributesToDisplay,
    batch: batch => {
      batch.forEach(batchMarker => {
        const marker = (batchMarker as unknown) as MarkerInfoWithIdType;
        dataMode.markers.set(marker.id, marker);
      });
      state.increment += 1;
    },
  });

  processPromise(promise);
  return promise;
};

export const loadData = (
  upperLeftCorner?: { lat: number; lng: number },
  lowerRightCorner?: { lat: number; lng: number },
) => {
  loadInitialDataForMode('initial', upperLeftCorner, lowerRightCorner);
  loadInitialDataForMode('detail');
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
