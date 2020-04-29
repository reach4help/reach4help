import isEqual from 'lodash/isEqual';
import React from 'react';
import mapState, {
  ActiveMarkers,
  MapInfo,
} from 'src/components/map-utils/map-state';
import { Filter, MARKER_TYPES } from 'src/data';
import * as firebase from 'src/data/firebase';
import { Page } from 'src/state';
import { isDefined } from 'src/util';

import { MarkerInfo, MARKERS } from '../data/markers';
import styled, { LARGE_DEVICES } from '../styling';
import AddInstructions from './add-information';
import { AppContext } from './context';
import {
  createGoogleMap,
  generateSortBasedOnMapCenter,
  haversineDistance,
} from './map-utils/google-maps';
import infoWindowContent from './map-utils/info-window';
import { debouncedUpdateQueryStringMapLocation } from './map-utils/query-string';

interface MarkerData {
  hardcoded: Map<string, MarkerInfo>;
  firebase: Map<string, MarkerInfo>;
}

type DataSet = keyof MarkerData;

const MARKER_DATA_ID = 'id';

export interface MarkerId {
  set: DataSet;
  id: string;
}

export interface MarkerIdAndInfo {
  id: MarkerId;
  info: MarkerInfo;
}

const getMarkerId = (marker: google.maps.Marker): MarkerId =>
  marker.get(MARKER_DATA_ID);

interface Props {
  className?: string;
  filter: Filter;
  results: MarkerIdAndInfo[] | null;
  setResults: (results: MarkerIdAndInfo[]) => void;
  nextResults?: MarkerIdAndInfo[];
  setNextResults: (nextResults: MarkerIdAndInfo[]) => void;
  selectedResult: MarkerIdAndInfo | null;
  setSelectedResult: (selectedResult: MarkerIdAndInfo | null) => void;
  /**
   * Call this
   */
  setUpdateResultsCallback: (callback: (() => void) | null) => void;
<<<<<<< HEAD
  resultsMode: 'open' | 'closed';
  toggleResults: () => void;
  updateResultsOnNextClustering: boolean;
  setUpdateResultsOnNextClustering: (
    updateResultsOnNextClustering: boolean,
  ) => void;
}

interface State {
  markers: MarkerInfo[] | null;
  mapRef: HTMLDivElement | null;
}

/**
 * List of results to display next for the current map bounds
 */
export interface NextResults {
  markers: google.maps.Marker[];
  results: MarkerInfo[];
||||||| merged common ancestors
  resultsMode: 'open' | 'closed';
  toggleResults: () => void;
  updateResultsOnNextClustering: boolean;
  setUpdateResultsOnNextClustering: (
    updateResultsOnNextClustering: boolean,
  ) => void;
}

/**
 * List of results to display next for the current map bounds
 */
export interface NextResults {
  markers: google.maps.Marker[];
  results: MarkerInfo[];
=======
  page: Page;
  setPage: (page: Page) => void;
>>>>>>> upstream/master
}

<<<<<<< HEAD
class MapComponent extends React.Component<Props, State> {
  private map: MapInfo | null = null;
||||||| merged common ancestors
class MapComponent extends React.Component<Props, {}> {
  private map: MapInfo | null = null;
=======
class MapComponent extends React.Component<Props, {}> {
  private readonly data: MarkerData = {
    hardcoded: new Map(),
    firebase: new Map(),
  };
>>>>>>> upstream/master

  private addInfoMapClickedListener:
    | ((evt: google.maps.MouseEvent) => void)
    | null = null;

  private infoWindow: google.maps.InfoWindow | null = null;

<<<<<<< HEAD
  public constructor(props: Props) {
    super(props);
    this.state = {
      markers: null,
      mapRef: null,
    };
  }

||||||| merged common ancestors
=======
  public constructor(props: Props) {
    super(props);

    // Initialize hardocded data
    MARKERS.forEach((marker, index) =>
      this.data.hardcoded.set(index.toString(), marker),
    );
  }

>>>>>>> upstream/master
  public componentDidMount() {
    const { setUpdateResultsCallback } = this.props;
    setUpdateResultsCallback(this.updateResults);
<<<<<<< HEAD
    getMarkerData().then(markers => this.setState({ markers }));
||||||| merged common ancestors
=======
    firebase.addInformationListener(this.informationUpdated);
    firebase.loadInitialData();
>>>>>>> upstream/master
  }

<<<<<<< HEAD
  public componentDidUpdate(prevProps: Props, prevState: State) {
||||||| merged common ancestors
  public componentDidUpdate(prevProps: Props) {
=======
  public componentDidUpdate(prevProps: Props) {
    const { map } = mapState();
>>>>>>> upstream/master
    const { filter, results, nextResults, selectedResult } = this.props;
    const { markers, mapRef } = this.state;
    // Update filter if changed
    if (map && !isEqual(filter, map.currentFilter)) {
      this.updateMarkersVisibilityUsingFilter(filter);
      map.markerClusterer.repaint();
      map.currentFilter = filter;
    }
    if (nextResults && !results) {
      // If we have next results queued up, but no results yet, set the results
      this.updateResults();
    }
    // Update selected point if changed
    if (selectedResult !== prevProps.selectedResult) {
      this.updateInfoWindow();
    }
    // Initilize map if neccesary
    if (
      (markers !== prevState.markers || mapRef !== prevState.mapRef) &&
      markers &&
      mapRef
    ) {
      this.initializeMap(mapRef, markers);
    }
  }

  public componentWillUnmount() {
    const { setUpdateResultsCallback } = this.props;
    setUpdateResultsCallback(null);
    firebase.removeInformationListener(this.informationUpdated);
  }

<<<<<<< HEAD
  private updateGoogleMapRef = (mapRef: HTMLDivElement | null) => {
    this.setState({ mapRef });
  };

  private initializeMap = (ref: HTMLDivElement, markersInfo: MarkerInfo[]) => {
    const { filter, setSelectedResult } = this.props;
    const map = createGoogleMap(markersInfo, ref);
    const markers = new Map<MarkerInfo, google.maps.Marker>();
    for (const m of markersInfo) {
      const marker = new window.google.maps.Marker({
        position: m.loc,
        title: m.contentTitle,
      });
      marker.set('info', m);
      markers.set(m, marker);
||||||| merged common ancestors
  private updateGoogleMapRef = (ref: HTMLDivElement | null) => {
    const { filter, setSelectedResult } = this.props;
    if (!ref) {
      return;
    }
    const map = createGoogleMap(ref);
    const markers = new Map<MarkerInfo, google.maps.Marker>();
    for (const m of MARKERS) {
      const marker = new window.google.maps.Marker({
        position: m.loc,
        title: m.contentTitle,
      });
      marker.set('info', m);
      markers.set(m, marker);
=======
  private updateMarkersVisibilityUsingFilter = (filter: Filter) => {
    const { map } = mapState();
    if (map) {
      for (const marker of [
        ...map.activeMarkers.hardcoded.values(),
        ...map.activeMarkers.firebase.values(),
      ]) {
        const info = this.getMarkerInfo(marker);
        const visible = !filter.type || info?.info.type.type === filter.type;
        marker.setVisible(visible);
      }
      map.markerClusterer.repaint();
    }
  };

  private setAddInfoMapClickedListener = (
    listener: ((evt: google.maps.MouseEvent) => void) | null,
  ) => {
    this.addInfoMapClickedListener = listener;
  };

  /**
   * Return true if the usual behaviour for clicking should be supressed
   */
  private mapClicked = (evt: google.maps.MouseEvent): boolean => {
    if (this.addInfoMapClickedListener) {
      this.addInfoMapClickedListener(evt);
      return true;
    }
    return false;
  };

  private getMarkerInfo = (
    marker: google.maps.Marker,
  ): MarkerIdAndInfo | null => {
    const id = getMarkerId(marker);
    const info = this.data[id.set].get(id.id);
    return info ? { id, info } : null;
  };

  private createMarker = (
    activeMarkers: ActiveMarkers,
    set: DataSet,
    id: string,
    info: MarkerInfo,
  ) => {
    const marker = new window.google.maps.Marker({
      position: {
        lat: info.loc.latlng.latitude,
        lng: info.loc.latlng.longitude,
      },
      title: info.contentTitle,
    });
    const idData: MarkerId = { set, id };
    marker.set(MARKER_DATA_ID, idData);
    activeMarkers[set].set(id, marker);

    // Add marker listeners
    marker.addListener('click', event => {
      const { setSelectedResult } = this.props;
      if (!this.mapClicked(event)) {
        const i = this.getMarkerInfo(marker);
        if (i) {
          setSelectedResult(i);
        }
      }
    });
    return marker;
  };

  private informationUpdated: firebase.InformationListener = update => {
    // Update existing markers, add new markers and delete removed markers
    this.data.firebase = update.markers;
    const { map } = mapState();
    if (map) {
      // Update existing markers and add new markers
      const newMarkers: google.maps.Marker[] = [];
      for (const [id, info] of update.markers.entries()) {
        const marker = map.activeMarkers.firebase.get(id);
        if (marker) {
          // Update info
          marker.setPosition({
            lat: info.loc.latlng.latitude,
            lng: info.loc.latlng.longitude,
          });
          marker.setTitle(info.contentTitle);
        } else {
          newMarkers.push(
            this.createMarker(map.activeMarkers, 'firebase', id, info),
          );
        }
      }
      map.markerClusterer.addMarkers(newMarkers, true);
      // Delete removed markers
      const removedMarkers: google.maps.Marker[] = [];
      for (const [id, marker] of map.activeMarkers.firebase.entries()) {
        if (!update.markers.has(id)) {
          removedMarkers.push(marker);
          map.activeMarkers.firebase.delete(id);
        }
      }
      map.markerClusterer.removeMarkers(removedMarkers, true);
      this.updateMarkersVisibilityUsingFilter(map.currentFilter);
    }
  };

  private updateGoogleMapRef = (ref: HTMLDivElement | null) => {
    const { filter } = this.props;
    if (!ref) {
      return;
    }
    const map = createGoogleMap(ref);
    const activeMarkers: ActiveMarkers = {
      firebase: new Map(),
      hardcoded: new Map(),
    };

    // Create initial markers
    for (const set of ['hardcoded', 'firebase'] as const) {
      const data = this.data[set];
      for (const [id, info] of data) {
        this.createMarker(activeMarkers, set, id, info);
      }
>>>>>>> upstream/master
    }

    const allMarkers = [
      ...activeMarkers.hardcoded.values(),
      ...activeMarkers.firebase.values(),
    ];

    // Add a marker clusterer to manage the markers.
    const markerClusterer = new MarkerClusterer(map, allMarkers, {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      ignoreHidden: true,
      zoomOnClick: false,
      averageCenter: true,
      gridSize: 30,
    });

    const m: MapInfo = {
      map,
      activeMarkers,
      currentFilter: filter,
      markerClusterer,
    };
    mapState().map = m;

    this.updateMarkersVisibilityUsingFilter(filter);

    map.addListener('bounds_changed', () => {
      if ('replaceState' in window.history) {
        debouncedUpdateQueryStringMapLocation(map);
      }
    });

<<<<<<< HEAD
    // We iterate over all locations to create markers
    // This pretty much orchestrates everything since the map is the main interaction window
    markers.forEach(marker => {
      const info = getInfo(marker);
      marker.addListener('click', () => {
        setSelectedResult(info);
      });

      return marker;
    });

||||||| merged common ancestors
    // We iterate over all locations to create markers
    // This pretty much orchestrates everything since the map is the main interaction window
    markers.forEach(marker => {
      const info = getInfo(marker);

      marker.addListener('click', () => {
        setSelectedResult(info);
      });

      return marker;
    });

=======
>>>>>>> upstream/master
    const drawMarkerServiceArea = (marker: google.maps.Marker) => {
      if (m.clustering?.state !== 'idle') {
        return;
      }

      const info = this.getMarkerInfo(marker);
      if (!info) {
        return;
      }
      const { color } = MARKER_TYPES[info.info.type.type];

      const mapBoundingBox = map.getBounds();
      if (mapBoundingBox) {
        const topRight = mapBoundingBox.getNorthEast();
        const bottomLeft = mapBoundingBox.getSouthWest();
        const markerPosition = marker.getPosition();
        const radius = info.info.loc.serviceRadius;

        // Now compare the distance from the marker to corners of the box;
        if (markerPosition) {
          const distanceToTopRight = haversineDistance(
            markerPosition,
            topRight,
          );
          const distanceToBottomLeft = haversineDistance(
            markerPosition,
            bottomLeft,
          );

          if (distanceToBottomLeft > radius || distanceToTopRight > radius) {
            m.clustering.serviceCircles.push(
              new window.google.maps.Circle({
                strokeColor: color,
                strokeOpacity: 0.3,
                strokeWeight: 1,
                fillColor: color,
                fillOpacity: 0.15,
                map,
                center: marker.getPosition() || undefined,
                radius,
                // If we change this, we need to ensure that we make appropriate
                // changes to the marker placement when adding new data so that
                // the circle can be clicked to place a marker at the cursor
                clickable: false,
              }),
            );
          } else {
            // TODO: Add to border of map instead of adding a circle
          }
        }
      }
    };

    // Set up event listeners to tell us when the map has started refreshing.
    markerClusterer.addListener('clusteringbegin', () => {
      if (m.clustering?.state === 'idle') {
        m.clustering.serviceCircles.forEach(circle => {
          circle.setMap(null);
        });
      }
      // $("#visible-markers").html('<h2>Loading List View ... </h2>');
    });

    markerClusterer.addListener('click', (cluster: MarkerClusterer) => {
      // Immidiately change the result list to the cluster instead
      // Don't update nextResults as we want that to still be for the current
      // viewport
      this.updateResultsTo(
        cluster
          .getMarkers()
          .map(marker => this.getMarkerInfo(marker))
          .filter(isDefined),
      );
    });

    // The clusters have been computed so we can
    markerClusterer.addListener(
      'clusteringend',
      (newClusterParent: MarkerClusterer) => {
        m.clustering = {
          state: 'idle',
          serviceCircles: [],
          clusterMarkers: new Map(),
        };

        const visibleMarkers: google.maps.Marker[] = [];
        for (const cluster of newClusterParent.getClusters()) {
          let maxMarker: {
            marker: google.maps.Marker;
            serviceRadius: number;
          } | null = null;
          const center = cluster.getCenter();
          const clusterMarkers = cluster.getMarkers();
          // Figure out which marker in each cluster will generate a circle.
          for (const marker of clusterMarkers) {
            // Update maxMarker to higher value if found.
            const info = this.getMarkerInfo(marker);
            if (info) {
              if (
                !maxMarker ||
                maxMarker.serviceRadius < info.info.loc.serviceRadius
              ) {
                maxMarker = {
                  marker,
                  serviceRadius: info.info.loc.serviceRadius,
                };
              }
              visibleMarkers.push(marker);
              if (clusterMarkers.length > 1) {
                m.clustering.clusterMarkers.set(marker, center);
              }
            }
          }

          // Draw a circle for the marker with the largest radius for each cluster (even clusters with 1 marker)
          if (maxMarker) {
            drawMarkerServiceArea(maxMarker.marker);
          }
        }

        // Sort markers based on distance from center of screen
        const mapCenter = map.getCenter();
        visibleMarkers.sort(generateSortBasedOnMapCenter(mapCenter));

        // Store the next results in the state
        const nextResults = visibleMarkers
          .map(marker => this.getMarkerInfo(marker))
          .filter(isDefined);

        const { setNextResults: updateNextResults } = this.props;

        updateNextResults(nextResults);

        if (mapState().updateResultsOnNextClustering) {
          mapState().updateResultsOnNextClustering = false;
          this.updateResults();
        }
        // Update tooltip position if neccesary
        // (marker may be newly in or out of cluster)
        this.updateInfoWindow();
      },
    );
  };

  private updateResults = () => {
    const { map } = mapState();
    const { results, nextResults } = this.props;
    if (map && nextResults && results !== nextResults) {
      this.updateResultsTo(nextResults);
    }
  };

  private updateResultsTo = (results: MarkerIdAndInfo[]) => {
    const { map } = mapState();
    const { setResults } = this.props;
    if (map) {
      // Clear all existing marker labels
      for (const marker of [
        ...map.activeMarkers.hardcoded.values(),
        ...map.activeMarkers.firebase.values(),
      ]) {
        marker.setLabel('');
      }
<<<<<<< HEAD
      // Relabel marker labels based on their index
      results.markers.forEach((marker, index) => {
||||||| merged common ancestors
      // Relabel marker labels based on theri index
      results.markers.forEach((marker, index) => {
=======
      const { activeMarkers } = map;
      const visibleMarkers = results
        .map(({ id }) => activeMarkers[id.set].get(id.id))
        .filter(isDefined);
      // Relabel marker labels based on theri index
      visibleMarkers.forEach((marker, index) => {
>>>>>>> upstream/master
        marker.setLabel((index + 1).toString());
      });
      // Update the new results state
      setResults(results);
    }
  };

  /**
   * Open the tooltip for the currently selected marker, or close it if none is
   * selected. And return the coordinates that were used to place the tooltip.
   */
  private updateInfoWindow = (): google.maps.LatLng | undefined => {
    const { map } = mapState();
    const { selectedResult, setSelectedResult } = this.props;
    if (!map) {
      return;
    }
    const marker =
      selectedResult &&
      map.activeMarkers[selectedResult.id.set].get(selectedResult.id.id);
    if (selectedResult && marker) {
      const clusterCenter =
        map.clustering?.state === 'idle' &&
        map.clustering.clusterMarkers.get(marker);
      const contentString = infoWindowContent(selectedResult.info);
      if (!this.infoWindow) {
        this.infoWindow = new window.google.maps.InfoWindow({
          content: contentString,
        });
        this.infoWindow.addListener('closeclick', () =>
          setSelectedResult(null),
        );
      }
      this.infoWindow.setContent(contentString);
      if (clusterCenter) {
        this.infoWindow.open(map.map);
        this.infoWindow.setPosition(clusterCenter);
        return clusterCenter;
      }
      this.infoWindow.open(map.map, marker);
      return marker.getPosition() || undefined;
    }
    if (this.infoWindow) {
      this.infoWindow.close();
    }
  };

  public render() {
    const { map } = mapState();
    const { className, page, setPage } = this.props;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <div className={className}>
            <div className="map" ref={this.updateGoogleMapRef} />
            {page.page === 'add-information' && (
              <AddInstructions
                lang={lang}
                map={(map && map.map) || null}
                addInfoStep={page.step}
                setPage={setPage}
                setAddInfoMapClickedListener={this.setAddInfoMapClickedListener}
              />
            )}
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default styled(MapComponent)`
  height: 100%;
  position: relative;

  > .map {
    height: 100%;
  }

  > .search {
    position: absolute;
    max-width: 500px;
    top: ${p => p.theme.spacingPx}px;
    left: ${p => p.theme.spacingPx}px;
    right: 40px;

    ${LARGE_DEVICES} {
      top: ${p => p.theme.spacingPx + p.theme.secondaryHeaderSizePx}px;
    }
  }
`;
