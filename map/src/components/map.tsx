import isEqual from 'lodash/isEqual';
import React from 'react';
import {
  MdExpandLess,
  MdExpandMore,
  MdMyLocation,
  MdRefresh,
} from 'react-icons/md';
import Search from 'src/components/search';
import { Filter, MARKER_TYPES } from 'src/data';
import * as firebase from 'src/data/firebase';
import { t } from 'src/i18n';
import { button, iconButton } from 'src/styling/mixins';
import { isDefined } from 'src/util';

import { MarkerInfo, MARKERS } from '../data/markers';
import styled from '../styling';
import AddInstructions, { AddInfoStep } from './add-information';
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

interface ActiveMarkers {
  /** map from marker index to marker */
  hardcoded: Map<string, google.maps.Marker>;
  /** map from firebase id to marker */
  firebase: Map<string, google.maps.Marker>;
}

interface MapInfo {
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

// const updateMarkersVisibilityUsingFilter = (
//   markerData: MarkerData,
//   markers: ActiveMarkers,
//   filter: Filter,
// ) => {
//   for (const marker of [...markers.hardcoded.values(), ...markers.firebase.values()]) {
//     const id = getId(marker);
//     const info = getInfo(marker);
//     const visible = !filter.type || info.type.type === filter.type;
//     marker.setVisible(visible);
//   }
// };

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
  resultsMode: 'open' | 'closed';
  toggleResults: () => void;
  updateResultsOnNextClustering: boolean;
  setUpdateResultsOnNextClustering: (
    updateResultsOnNextClustering: boolean,
  ) => void;
  addInfoStep: AddInfoStep | null;
  setAddInfoStep: (addInfoStep: AddInfoStep | null) => void;
}

type SearchBoxes = 'main' | 'add-information';

interface SearchBox {
  searchInput: HTMLInputElement;
  box: google.maps.places.SearchBox;
}

class MapComponent extends React.Component<Props, {}> {
  private readonly data: MarkerData = {
    hardcoded: new Map(),
    firebase: new Map(),
  };

  private map: MapInfo | null = null;

  private addInfoMapClickedListener:
    | ((evt: google.maps.MouseEvent) => void)
    | null = null;

  private readonly searchBoxes = new Map<SearchBoxes, SearchBox>();

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
    const { filter, results, nextResults, selectedResult } = this.props;
    // Update filter if changed
    if (this.map && !isEqual(filter, this.map.currentFilter)) {
      // updateMarkersVisibilityUsingFilter(this.map.markers, filter);
      this.map.markerClusterer.repaint();
      this.map.currentFilter = filter;
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
    if (this.map) {
      // Update existing markers and add new markers
      const newMarkers: google.maps.Marker[] = [];
      for (const [id, info] of update.markers.entries()) {
        const marker = this.map.activeMarkers.firebase.get(id);
        if (marker) {
          // Update info
          marker.setPosition({
            lat: info.loc.latlng.latitude,
            lng: info.loc.latlng.longitude,
          });
          marker.setTitle(info.contentTitle);
        } else {
          newMarkers.push(
            this.createMarker(this.map.activeMarkers, 'firebase', id, info),
          );
        }
      }
      this.map.markerClusterer.addMarkers(newMarkers, true);
      // Delete removed markers
      const removedMarkers: google.maps.Marker[] = [];
      for (const [id, marker] of this.map.activeMarkers.firebase.entries()) {
        if (!update.markers.has(id)) {
          removedMarkers.push(marker);
          this.map.activeMarkers.firebase.delete(id);
        }
      }
      this.map.markerClusterer.removeMarkers(removedMarkers, true);
      this.map.markerClusterer.repaint();
    }
    this.data.firebase = update.markers;
    // TODO: redraw cluster circles
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
    this.map = m;

    // updateMarkersVisibilityUsingFilter(markers, filter);

    map.addListener('bounds_changed', () => {
      const bounds = map.getBounds();
      if (bounds) {
        for (const box of this.searchBoxes.values()) {
          box.box.setBounds(bounds);
        }
      }
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
    const { results, nextResults } = this.props;
    if (this.map && nextResults && results !== nextResults) {
      this.updateResultsTo(nextResults);
    }
  };

  private updateResultsTo = (results: MarkerIdAndInfo[]) => {
    const { setResults } = this.props;
    if (this.map) {
      // Clear all existing marker labels
      for (const marker of [
        ...this.map.activeMarkers.hardcoded.values(),
        ...this.map.activeMarkers.firebase.values(),
      ]) {
        marker.setLabel('');
      }
      const { activeMarkers } = this.map;
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
    const { selectedResult, setSelectedResult } = this.props;
    if (!this.map) {
      return;
    }
    const marker =
      selectedResult &&
      this.map.activeMarkers[selectedResult.id.set].get(selectedResult.id.id);
    if (selectedResult && marker) {
      const clusterCenter =
        this.map.clustering?.state === 'idle' &&
        this.map.clustering.clusterMarkers.get(marker);
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
        this.infoWindow.open(this.map.map);
        this.infoWindow.setPosition(clusterCenter);
        return clusterCenter;
      }
      this.infoWindow.open(this.map.map, marker);
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
        if (!this.map) {
          return;
        }
        this.map.map.setCenter(pos);
        this.map.map.setZoom(8);
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

  private updateSearchInput = (searchInput: HTMLInputElement | null) => {
    if (searchInput) {
      this.searchBoxes.set('main', this.initializeSearchInput(searchInput));
    } else {
      this.searchBoxes.delete('main');
    }
  };

  private updateAddInfoSearchInput = (searchInput: HTMLInputElement | null) => {
    if (searchInput) {
      this.searchBoxes.set(
        'add-information',
        this.initializeSearchInput(searchInput),
      );
    } else {
      this.searchBoxes.delete('add-information');
    }
  };

  public render() {
    const {
      className,
      results,
      nextResults,
      resultsMode,
      toggleResults,
      addInfoStep,
      setAddInfoStep,
    } = this.props;
    const hasNewResults = nextResults && nextResults !== results;
    const ExpandIcon = resultsMode === 'open' ? MdExpandMore : MdExpandLess;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <div className={className}>
            <div className="map" ref={this.updateGoogleMapRef} />
            {!addInfoStep && (
              <Search
                className="search"
                updateSearchInput={this.updateSearchInput}
              />
            )}
            {addInfoStep && (
              <AddInstructions
                lang={lang}
                map={(this.map && this.map.map) || null}
                addInfoStep={addInfoStep}
                setAddInfoStep={setAddInfoStep}
                updateSearchInput={this.updateAddInfoSearchInput}
                setAddInfoMapClickedListener={this.setAddInfoMapClickedListener}
              />
            )}
            <div className="map-actions">
              {!addInfoStep && hasNewResults && (
                <button type="button" onClick={this.updateResults}>
                  <MdRefresh className="icon icon-start" />
                  {t(lang, s => s.map.updateResultsForThisArea)}
                </button>
              )}
              {navigator.geolocation && (
                <button type="button" onClick={this.centerToGeolocation}>
                  <MdMyLocation className="icon icon-start" />
                  {t(lang, s => s.map.myLocation)}
                </button>
              )}
            </div>
            {!addInfoStep && (
              <div className="results-tab" onClick={toggleResults}>
                <div>
                  <ExpandIcon />
                  <span>
                    {resultsMode === 'open'
                      ? 'close'
                      : `${results?.length || 0} result(s)`}
                  </span>
                  <ExpandIcon />
                </div>
              </div>
            )}
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

const TAB_WIDTH_PX = 30;

export default styled(MapComponent)`
  height: 100%;
  position: relative;

  > .map {
    height: 100%;
  }

  > .search {
    position: absolute;
    z-index: 100;
    max-width: 500px;
    top: ${p => p.theme.spacingPx}px;
    left: ${p => p.theme.spacingPx}px;
    right: 40px;
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

  > .results-tab {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: ${TAB_WIDTH_PX}px;
    pointer-events: none;

    > div {
      z-index: 50;
      position: absolute;
      top: 50%;
      left: 50%;
      height: ${TAB_WIDTH_PX}px;
      line-height: ${TAB_WIDTH_PX}px;
      transform: translate(-50%, -50%) rotate(-90deg);
      pointer-events: all;

      ${button};
      padding: 0 5px;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
      background: #fff;
      font-size: 1rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      display: flex;
      align-items: center;

      > span {
        margin: 0 5px;
      }

      > svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
