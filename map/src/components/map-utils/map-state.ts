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

let state: MapState | null = null;

class MapState {
  public map: MapInfo | null = null;
}

export default () => {
  if (!state) {
    state = new MapState();
  }
  return state;
};
