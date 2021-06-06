import {
  Location as BaseLocation,
  MarkerInfo as BaseMarkerInfo,
  MarkerInfoWithId as BaseMarkerInfoWithId,
} from '@reach4help/model/lib/markers';
import algoliasearch from 'algoliasearch';
import { processAlgolia } from 'src/algolia-scripts/algoliaScriptHelper';
import { R4HGeoPoint } from './R4hGeoPoint';

export type Location = BaseLocation<R4HGeoPoint>;
export type MarkerInfo = BaseMarkerInfo<R4HGeoPoint>;
export type MarkerInfoWithId = BaseMarkerInfoWithId<R4HGeoPoint>;

const algoliaAdminKey = process.env.REACT_APP_ALGOLIA_ADMIN_KEY || 'undefined';
const algoliaAppId = process.env.REACT_APP_ALGOLIA_APP_ID || 'undefined';
const algoliaIndexName =
  process.env.REACT_APP_ALGOLIA_INDEX_NAME || 'undefined';

const client = algoliasearch(algoliaAppId, algoliaAdminKey);
const index = client.initIndex(algoliaIndexName);

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

export const submitInformation = async (info: MarkerInfo) => {
  info.objectID = info.id || '';
  const latlng = info.loc.latlng;
  info._geoloc = { lat: latlng.latitude, lng: latlng.latitude };
  console.log('trying other way');
  processAlgolia([info], 'markers-debug1', 'DELETE');

  // await markers.add(info);
};

export interface InformationUpdate {
  loading: boolean;
  markers: Map<string, MarkerInfo>;
  /**
   * True iff the data includes hidden markers that have not yet been
   * reviewed and approved.
   */
  includingHidden: boolean;
}

export type InformationListener = (event: InformationUpdate) => void;

interface CategoryData {
  initialLoadDone: boolean;
  markers: Map<string, MarkerInfo>;
}

const listeners = new Set<InformationListener>();
const state: {
  data: {
    hidden: CategoryData;
    visible: CategoryData;
  };
  includeHidden: boolean;
  loadingOperations: Set<Promise<unknown>>;
  errors: Set<Error>;
} = {
  data: {
    hidden: {
      initialLoadDone: false,
      markers: new Map(),
    },
    visible: {
      initialLoadDone: false,
      markers: new Map(),
    },
  },
  includeHidden: getDataConfig().includingHidden,
  loadingOperations: new Set(),
  errors: new Set(),
};

const getInfoForListeners = (): InformationUpdate => ({
  loading: state.loadingOperations.size > 0,
  markers: new Map([
    ...state.data.visible.markers,
    ...(state.includeHidden ? state.data.hidden.markers : []),
  ]),
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

// TODO:
// X Import marker data into algoia index
// X Set up Algoia API keys for the index
// - Replace below code with code to return a promise to load from algolia
// - look at index settings to set what is returned from Algoli

// - text search
// - zoom into current position
// - how to re-execute as map moves

const loadInitialDataForMode = (mode: 'hidden' | 'visible') => {
  if (state.data[mode].initialLoadDone) {
    return;
  }
  state.data[mode].initialLoadDone = true;

  const promise = index.search('').then(data => {
    const hits = (data.hits as unknown) as MarkerInfoWithId[];
    for (const marker of hits) {
      state.data[mode].markers.set(marker.id, marker);
    }
  });
  processPromise(promise);
  return promise;
};

export const loadInitialData = () => {
  loadInitialDataForMode('visible');
  if (state.includeHidden) {
    loadInitialDataForMode('hidden');
  }
};

export const includingHidden = () => state.includeHidden;

export const includeHiddenMarkers = (include: boolean) => {
  setDataConfig({
    includingHidden: include,
  });
  state.includeHidden = include;
  loadInitialData();
  updateListeners();
};

window.addEventListener('storage', e => {
  if (e.key === LOCAL_STORAGE_KEY) {
    const dataConfig = getDataConfig();
    state.includeHidden = dataConfig.includingHidden;
    loadInitialData();
    updateListeners();
  }
});
