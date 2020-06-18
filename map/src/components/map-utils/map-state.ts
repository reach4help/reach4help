/**
 * This module allows sharing certain elements of the Map state across
 * multiple components (outside of react).
 */
import { Filter } from 'src/state';

export interface ActiveMarkers {
  /** map from firebase id to marker */
  firebase: Map<string, google.maps.Marker>;
}

export const MARKER_SET_KEYS: Array<keyof ActiveMarkers> = ['firebase'];

export interface MapInfo {
  map: google.maps.Map;
  activeMarkers: ActiveMarkers;
  markerClusterer: MarkerClusterer;
  /**
   * The filter that is currently being used to display the markers on the map
   */
  currentFilter: Filter;
  clustering?: {
    /** Map from original marker to position of cluster if in a cluster */
    clusterMarkers: Map<google.maps.Marker, google.maps.LatLng>;
  };
}

export type SearchBoxId = 'main' | 'add-information';

interface SearchBox {
  searchInput: HTMLInputElement;
  /**
   * This is only initialized once we have a map (we have have the search
   * components before the google maps scripts have loaded), allows for
   * delayed initializing of search boxes
   */
  box?: google.maps.places.SearchBox;
}

let state: MapState | null = null;

class MapState {
  private _map: MapInfo | null = null;

  private readonly searchBoxes = new Map<SearchBoxId, SearchBox>();

  private _updateResultsOnNextClustering = false;

  public set map(map: MapInfo | null) {
    this._map = map;
    if (map) {
      // Add listener that update the search boxes when
      map.map.addListener('bounds_changed', () => {
        const bounds = map.map.getBounds();
        if (bounds) {
          for (const box of this.searchBoxes.values()) {
            if (box.box) {
              box.box.setBounds(bounds);
            }
          }
        }
      });
      // Initialize any search boxes that have not yet been initialized
      for (const box of this.searchBoxes.values()) {
        if (!box.box) {
          this.initializeSearchInput(box);
        }
      }
    }
  }

  public get map() {
    return this._map;
  }

  public updateSearchInputRef = (
    id: SearchBoxId,
    searchInput: HTMLInputElement | null,
  ) => {
    if (searchInput) {
      const searchBox: SearchBox = { searchInput };
      this.searchBoxes.set(id, searchBox);
      this.initializeSearchInput(searchBox);
    } else {
      this.searchBoxes.delete(id);
    }
  };

  private initializeSearchInput = (search: SearchBox) => {
    if (!this.map) {
      // Map has not been initialized yet, wait until it is as the google
      // libraries may not have loaded yet
      return;
    }
    if (search.box) {
      // Already initialized!
      return;
    }
    const box = new google.maps.places.SearchBox(search.searchInput);
    // eslint-disable-next-line no-param-reassign
    search.box = box;

    box.addListener('places_changed', () => {
      if (!this.map) {
        return;
      }

      const places = box.getPlaces();
      const bounds = new window.google.maps.LatLngBounds();

      if (places.length === 0) {
        return;
      }

      places.forEach(place => {
        if (!place.geometry) {
          return;
        }

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      this.map.map.fitBounds(bounds);
    });

    const bounds = this.map.map.getBounds();
    if (bounds) {
      box.setBounds(bounds);
    }
  };

  public set updateResultsOnNextBoundsChange(update: boolean) {
    this._updateResultsOnNextClustering = update;
  }

  public get updateResultsOnNextBoundsChange() {
    return this._updateResultsOnNextClustering;
  }
}

export default () => {
  if (!state) {
    state = new MapState();
  }
  return state;
};
