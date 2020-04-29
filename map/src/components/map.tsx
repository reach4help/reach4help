import isEqual from 'lodash/isEqual';
import React from 'react';
import { MdMyLocation, MdRefresh } from 'react-icons/md';
import mapState, {
  ActiveMarkers,
  MapInfo,
} from 'src/components/map-utils/map-state';
import Search from 'src/components/search';
import { Filter, MARKER_TYPES } from 'src/data';
import * as firebase from 'src/data/firebase';
import { t } from 'src/i18n';
import { Page } from 'src/state';
import { button, iconButton } from 'src/styling/mixins';
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
  updateResultsOnNextClustering: boolean;
  setUpdateResultsOnNextClustering: (
    updateResultsOnNextClustering: boolean,
  ) => void;
  page: Page;
  setPage: (page: Page) => void;
}

class MapComponent extends React.Component<Props, {}> {
  private readonly data: MarkerData = {
    hardcoded: new Map(),
    firebase: new Map(),
  };

  private addInfoMapClickedListener:
    | ((evt: google.maps.MouseEvent) => void)
    | null = null;

  private infoWindow: google.maps.InfoWindow | null = null;

  public constructor(props: Props) {
    super(props);

    // Initialize hardocded data
    MARKERS.forEach((marker, index) =>
      this.data.hardcoded.set(index.toString(), marker),
    );
  }

  public componentDidMount() {
    const { setUpdateResultsCallback } = this.props;
    setUpdateResultsCallback(this.updateResults);
    firebase.addInformationListener(this.informationUpdated);
    firebase.loadInitialData();
  }

  public componentDidUpdate(prevProps: Props) {
    const { map } = mapState();
    const { filter, results, nextResults, selectedResult } = this.props;
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
  }

  public componentWillUnmount() {
    const { setUpdateResultsCallback } = this.props;
    setUpdateResultsCallback(null);
    firebase.removeInformationListener(this.informationUpdated);
  }

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

        const {
          setNextResults: updateNextResults,
          updateResultsOnNextClustering,
          setUpdateResultsOnNextClustering,
        } = this.props;

        updateNextResults(nextResults);

        if (updateResultsOnNextClustering) {
          setUpdateResultsOnNextClustering(false);
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
      const { activeMarkers } = map;
      const visibleMarkers = results
        .map(({ id }) => activeMarkers[id.set].get(id.id))
        .filter(isDefined);
      // Relabel marker labels based on theri index
      visibleMarkers.forEach((marker, index) => {
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

  private centerToGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const { map } = mapState();
        if (!map) {
          return;
        }
        map.map.setCenter(pos);
        map.map.setZoom(8);
        const { setUpdateResultsOnNextClustering } = this.props;
        setUpdateResultsOnNextClustering(true);
      },
      error => {
        // eslint-disable-next-line no-alert
        alert('Unable to get geolocation!');
        // eslint-disable-next-line no-console
        console.error(error.message);
      },
    );
  };

  public render() {
    const { map } = mapState();
    const { className, results, nextResults, page, setPage } = this.props;
    const hasNewResults = nextResults && nextResults !== results;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <div className={className}>
            <div className="map" ref={this.updateGoogleMapRef} />
            {page.page === 'map' && (
              <Search className="search" searchInputId="main" />
            )}
            {page.page === 'add-information' && (
              <AddInstructions
                lang={lang}
                map={(map && map.map) || null}
                addInfoStep={page.step}
                setPage={setPage}
                setAddInfoMapClickedListener={this.setAddInfoMapClickedListener}
              />
            )}
            <div className="map-actions">
              {page.page === 'map' && hasNewResults && (
                <button type="button" onClick={this.updateResults}>
                  <MdRefresh className="icon icon-start" />
                  {t(lang, s => s.map.updateResultsForThisArea)}
                </button>
              )}
              {page.page !== 'about' && navigator.geolocation && (
                <button type="button" onClick={this.centerToGeolocation}>
                  <MdMyLocation className="icon icon-start" />
                  {t(lang, s => s.map.myLocation)}
                </button>
              )}
            </div>
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

  > .map-actions {
    position: absolute;
    bottom: ${p => p.theme.spacingPx}px;
    left: ${p => p.theme.spacingPx}px;
    right: ${p => p.theme.spacingPx}px;
    display: flex;
    justify-content: center;

    > button {
      ${button};
      ${iconButton};
      box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
      margin: 0 5px;
      background: #fff;
    }
  }
`;
