/**
 * This module allows sharing certain elements of the Map state across
 * multiple components (outside of react).
 */
import { Filter } from 'src/data';

export interface ActiveMarkers {
  /** map from marker index to marker */
  hardcoded: Map<string, google.maps.Marker>;
  /** map from firebase id to marker */
  firebase: Map<string, google.maps.Marker>;
}

export interface MapInfo {
  map: google.maps.Map;
  activeMarkers: ActiveMarkers;
  markerClusterer: MarkerClusterer;
  /**
   * The filter that is currently being used to display the markers on the map
   */
  currentFilter: Filter;
  clustering?:
    | {
        state: 'idle';
        /** The circles we rendered for the current visible markers */
        serviceCircles: google.maps.Circle[];
        /** Map from original marker to position of cluster if in a cluster */
        clusterMarkers: Map<google.maps.Marker, google.maps.LatLng>;
      }
    | {
        /** A clustering is in progress */
        state: 'active';
      };
}

export type SearchBoxId = 'main' | 'add-information';

interface SearchBox {
  searchInput: HTMLInputElement;
  box: google.maps.places.SearchBox;
}

let state: MapState | null = null;

class MapState {
  private _map: MapInfo | null = null;

  private readonly searchBoxes = new Map<SearchBoxId, SearchBox>();

  public set map(map: MapInfo | null) {
    this._map = map;
    if (map) {
      // Add listener that update the search boxes when
      map.map.addListener('bounds_changed', () => {
        const bounds = map.map.getBounds();
        if (bounds) {
          for (const box of this.searchBoxes.values()) {
            box.box.setBounds(bounds);
          }
        }
      });
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
      this.searchBoxes.set(id, this.initializeSearchInput(searchInput));
    } else {
      this.searchBoxes.delete(id);
    }
  };

  private initializeSearchInput = (
    searchInput: HTMLInputElement,
  ): SearchBox => {
    const box = new google.maps.places.SearchBox(searchInput);
    const searchBox: SearchBox = {
      searchInput,
      box,
    };

    searchBox.box.addListener('places_changed', () => {
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
    if (this.map) {
      const bounds = this.map.map.getBounds();
      if (bounds) {
        searchBox.box.setBounds(bounds);
      }
    }
    return searchBox;
  };
}

export default () => {
  if (!state) {
    state = new MapState();
  }
  return state;
};
