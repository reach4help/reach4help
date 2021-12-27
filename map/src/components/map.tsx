import debounce from 'lodash/debounce';
import React from 'react';
import mapState, {
  ActiveMarkers,
  MapInfo,
  MARKER_SET_KEYS,
} from 'src/components/map-utils/map-state';
import { MARKER_TYPES } from 'src/data';
import * as dataDriver from 'src/data/dataDriver';
import { Filter, Page } from 'src/state';
import { isDefined } from 'src/util';

import styled, { LARGE_DEVICES } from '../styling';
import AddInstructions from './add-information';
import { AppContext } from './context';
import { createGoogleMap, haversineDistance } from './map-utils/google-maps';
import infoWindowContent from './map-utils/info-window';
import { debouncedUpdateQueryStringMapLocation } from './map-utils/query-string';

type MarkerInfo = dataDriver.MarkerInfoType;

interface MarkersData {
  markersData: Map<string, MarkerIdAndInfo>;
}

type DataSet = keyof MarkersData;

const MARKER_DATA_ID = 'id';
const MARKER_DATA_CIRCLE = 'circle';

const INITIAL_NUMBER_OF_RESULTS = 20;

export interface MarkerId {
  set: DataSet;
  id: string;
}

export interface MarkerIdAndInfo {
  id: MarkerId;
  info: MarkerInfo;
}

/**
 * Either the current or next set of results in the results pane
 */
export interface ResultsSet {
  /**
   * How were these results calculated? E.g. were they from a cluster, or the
   * current zoom for the whole map.
   */
  context: {
    /**
     * The bounds of the map at the time the results were calculated
     */
    bounds: google.maps.LatLngBounds | null;
  };
  results: MarkerIdAndInfo[];
  /**
   * How many rows from the results should be shown in the pane?
   * (used to limit how many dom elements we have)
   */
  showRows: number;
}

const getMarkerId = (marker: google.maps.Marker): MarkerId =>
  marker.get(MARKER_DATA_ID);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasIntersection = (set_: Set<any>, array_: Array<any>): boolean =>
  array_.some(value => set_.has(value));

interface Props {
  className?: string;
  filter: Filter;
  results: ResultsSet | null;
  setResults: (results: ResultsSet, openResults?: boolean) => void;
  nextResults: ResultsSet | null;
  setNextResults: (nextResults: ResultsSet) => void;
  selectedResult: MarkerIdAndInfo | null;
  setSelectedResult: (selectedResult: MarkerIdAndInfo | null) => void;
  /**
   * Call this
   */
  setUpdateResultsCallback: (callback: (() => void) | null) => void;
  page: Page;
  setPage: (page: Page) => void;
  resultsOpen: boolean;
}

interface State {
  /**
   * Shall we display service areas?
   * Can be disabled when the device has decreased performance
   */
  displayServiceAreas: boolean;
}

class MapComponent extends React.Component<Props, State> {
  private readonly data: MarkersData = {
    markersData: new Map(),
  };

  private addInfoMapClickedListener:
    | ((evt: google.maps.MouseEvent) => void)
    | null = null;

  private infoWindow: google.maps.InfoWindow | null = null;

  public constructor(props: Props) {
    super(props);
    this.state = {
      displayServiceAreas: true,
    };
  }

  public componentDidMount() {
    const { setUpdateResultsCallback } = this.props;
    setUpdateResultsCallback(this.updateResults);
    dataDriver.addInformationListener(this.informationUpdated);
    dataDriver.loadData();
    this.centerMap();
  }

  public componentDidUpdate(prevProps: Props) {
    const { map } = mapState();
    const { filter, results, nextResults, selectedResult } = this.props;
    // Update filter if changed
    if (map && !filter.filterExecuted) {
      this.updateMarkersVisibilityUsingFilter(filter);
      filter.filterExecuted = true;
      map.currentFilter = filter;
    }
    if (nextResults && !results) {
      // If we have next results queued up, but no results yet, set the results
      this.updateResults();
    }
    // Update selected point if changed
    if (selectedResult !== prevProps.selectedResult) {
      if (map && selectedResult) {
        // Center selected result
        // selectedResult.info.loc.
        map.map.panTo({
          lat: selectedResult.info.loc.latlng.latitude,
          lng: selectedResult.info.loc.latlng.longitude,
        });
      }
      this.updateInfoWindow();
    }
  }

  public componentWillUnmount() {
    const { setUpdateResultsCallback } = this.props;
    setUpdateResultsCallback(null);
    dataDriver.removeInformationListener(this.informationUpdated);
  }

  private centerMap = () => {
    let location: {
      lat: number;
      lng: number;
    };
    fetch('https://get.geojs.io/v1/ip/geo.json')
      .then(response => response.json())
      .then(data => {
        // If the API returns a geolocation
        if (data.longitude && data.latitude) {
          location = {
            lat: parseFloat(data.latitude),
            lng: parseFloat(data.longitude),
          };
          const { map } = mapState();
          if (!map) {
            return;
          }
          map.map.setCenter(location);
          map.map.setZoom(8);
          mapState().updateResultsOnNextBoundsChange = true;
        } else {
          // Call the browser's geolocation API (will prompt the first time)
          navigator.geolocation.getCurrentPosition(
            position => {
              location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              const { map } = mapState();
              if (!map) {
                return;
              }
              map.map.setCenter(location);
              map.map.setZoom(8);
              mapState().updateResultsOnNextBoundsChange = true;
            },
            () => {
              // Position over India if no other option works
              location = {
                lat: 21.7679,
                lng: 78.8718,
              };
              const { map } = mapState();
              if (!map) {
                return;
              }
              map.map.setCenter(location);
              map.map.setZoom(4);
              mapState().updateResultsOnNextBoundsChange = true;
            },
          );
        }
      });
  };

  private isValidMarker = (filter: Filter, info: MarkerIdAndInfo): boolean => {
    let validTypes = true;
    if (
      filter.markerTypes &&
      filter.markerTypes.size > 0 &&
      (typeof info.info.type.type === 'undefined' ||
        !filter.markerTypes.has(info.info.type.type))
    ) {
      validTypes = false;
    }

    let validServices = true;
    if (
      filter.services &&
      filter.services.size > 0 &&
      (typeof info.info.type.services === 'undefined' ||
        !hasIntersection(filter.services, info.info.type.services))
    ) {
      validServices = false;
    }

    const validVisibility = !!(
      !filter.hiddenMarkers ||
      filter.hiddenMarkers === 'any' ||
      (filter.hiddenMarkers === 'hidden' && !info.info.visible) ||
      (filter.hiddenMarkers === 'visible' && info.info.visible)
    );
    const validText = !!(
      !filter.searchText ||
      JSON.stringify(info.info)
        .toUpperCase()
        .includes(filter.searchText.toUpperCase())
    );
    return validTypes && validServices && validVisibility && validText;
  };

  private updateMarkersVisibilityUsingFilter = (filter: Filter) => {
    const { map } = mapState();
    if (map) {
      map.activeMarkers.markersData.forEach(marker => {
        const info = this.getMarkerInfo(marker);
        if (info) {
          marker.setVisible(this.isValidMarker(filter, info));
        }
      });
      // Ensure that the results are updated given the filter has changed
      mapState().updateResultsOnNextBoundsChange = true;
      // Trigger reclustering
      map.markerClusterer.repaint();
      // Trigger recomputation of results
      this.updateResultsBasedOnViewport();
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
    return info || null;
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

  private informationUpdated: dataDriver.InformationListener = update => {
    // Update existing markers, add new markers and delete removed markers

    this.data.markersData = new Map();
    for (const entry of update.markers.entries()) {
      this.data.markersData.set(entry[0], {
        id: { set: 'markersData', id: entry[0] },
        info: entry[1],
      });
    }

    const { map } = mapState();
    if (map) {
      // Update existing markers and add new markers
      const newMarkers: google.maps.Marker[] = [];
      for (const [id, info] of update.markers.entries()) {
        const marker = map.activeMarkers.markersData.get(id);
        if (marker) {
          // Update info
          marker.setPosition({
            lat: info.loc.latlng.latitude,
            lng: info.loc.latlng.longitude,
          });
          marker.setTitle(info.contentTitle);
        } else {
          newMarkers.push(
            this.createMarker(map.activeMarkers, 'markersData', id, info),
          );
        }
      }
      map.markerClusterer.addMarkers(newMarkers, true);
      // Delete removed markers
      const removedMarkers: google.maps.Marker[] = [];
      for (const [id, marker] of map.activeMarkers.markersData.entries()) {
        if (!update.markers.has(id)) {
          removedMarkers.push(marker);
          map.activeMarkers.markersData.delete(id);
          // const circle: google.maps.Circle = marker.get(MARKER_DATA_CIRCLE);
          // if (circle) {
          //   circle.setMap(null);
          // }
        }
      }
      map.markerClusterer.removeMarkers(removedMarkers, true);
      this.updateMarkersVisibilityUsingFilter(map.currentFilter);
    }
  };

  // eslint-disable-next-line react/sort-comp
  private updateResultsBasedOnViewport = debounce(() => {
    const { map } = mapState();
    if (map) {
      const bounds = map.map.getBounds() || null;

      const nextResults: ResultsSet = {
        context: {
          bounds,
        },
        results: [],
        showRows: INITIAL_NUMBER_OF_RESULTS,
      };

      // Go through every marker, and add to results if it is within the bounds
      // of the map, and visible
      for (const markerIdAndInfo of this.data.markersData.values()) {
        if (
          !bounds ||
          bounds.contains({
            lat: markerIdAndInfo.info.loc.latlng.latitude,
            lng: markerIdAndInfo.info.loc.latlng.longitude,
          })
        ) {
          const marker = map.activeMarkers.markersData.get(
            markerIdAndInfo.id.id,
          );
          if (marker && marker.getVisible()) {
            nextResults.results.push(markerIdAndInfo);
          }
        }
      }
      // }

      const {
        results,
        setNextResults,
        resultsOpen,
        selectedResult,
        setResults,
      } = this.props;

      setNextResults(nextResults);

      if (
        // If we need to update on next clustering
        mapState().updateResultsOnNextBoundsChange ||
        // If the location hasn't changed (i.e. filter or results themselves)
        (nextResults.context.bounds &&
          results?.context.bounds?.equals(nextResults.context.bounds)) ||
        // If the results panel is currently closed, update the results
        // (so that the count display is fresh)
        (!resultsOpen && !selectedResult)
      ) {
        mapState().updateResultsOnNextBoundsChange = false;
        setResults(nextResults, false);
      }
    }
  }, 50);

  private updateGoogleMapRef = (ref: HTMLDivElement | null) => {
    const { filter } = this.props;
    if (!ref) {
      return;
    }
    const map = createGoogleMap(ref);
    const activeMarkers: ActiveMarkers = {
      markersData: new Map(),
    };

    // Create initial markers
    const data = this.data.markersData;
    for (const [id, info] of data) {
      this.createMarker(activeMarkers, MARKER_SET_KEYS[0], id, info.info);
    }

    const allMarkers = MARKER_SET_KEYS.map(s => [
      ...activeMarkers[s].values(),
    ]).flat();

    // Add a marker clusterer to manage the markers.
    const markerClusterer = new MarkerClusterer(map, allMarkers, {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      ignoreHidden: true,
      zoomOnClick: false,
      minimumClusterSize: 6,
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
      this.updateResultsBasedOnViewport();
    });

    const drawMarkerServiceArea = (marker: google.maps.Marker) => {
      const info = this.getMarkerInfo(marker);
      if (!info) {
        return;
      }
      const markerTypeInfo = MARKER_TYPES[info.info.type.type];
      const color = markerTypeInfo
        ? markerTypeInfo.color
        : MARKER_TYPES.notFound.color;

      const mapBoundingBox = map.getBounds();
      if (mapBoundingBox) {
        const topRight = mapBoundingBox.getNorthEast();
        const bottomLeft = mapBoundingBox.getSouthWest();
        const markerPosition = marker.getPosition();
        const radius = info.info.loc.serviceRadius;
        if (!radius) {
          return;
        }

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

          let circle: google.maps.Circle = marker.get(MARKER_DATA_CIRCLE);

          if (distanceToBottomLeft > radius || distanceToTopRight > radius) {
            if (!circle) {
              circle = new window.google.maps.Circle({
                strokeColor: color,
                strokeOpacity: 0.3,
                strokeWeight: 1,
                fillColor: color,
                fillOpacity: 0.15,
                map,
                center: marker.getPosition() || new google.maps.LatLng(90, 90),
                radius,
                // If we change this, we need to ensure that we make appropriate
                // changes to the marker placement when adding new data so that
                // the circle can be clicked to place a marker at the cursor
                clickable: false,
              });
              marker.set(MARKER_DATA_CIRCLE, circle);
            }
            circle.setVisible(true);
          } else if (circle) {
            circle.setVisible(false);
          }
        }
      }
    };

    markerClusterer.addListener('click', (cluster: MarkerClusterer) => {
      // Immidiately change the result list to the cluster instead
      // Don't update nextResults as we want that to still be for the current
      // viewport
      const { setResults, setSelectedResult } = this.props;
      setSelectedResult(null);
      setResults(
        {
          context: {
            bounds: map.getBounds() || null,
          },
          results: cluster
            .getMarkers()
            .map(marker => this.getMarkerInfo(marker))
            .filter(isDefined),
          showRows: INITIAL_NUMBER_OF_RESULTS,
        },
        true,
      );
    });

    // The clusters have been computed so we can
    markerClusterer.addListener(
      'clusteringend',
      (newClusterParent: MarkerClusterer) => {
        const { displayServiceAreas } = this.state;
        m.clustering = {
          clusterMarkers: new Map(),
        };
        const markersWithAreaDrawn = new Set<google.maps.Marker>();

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
                info.info.loc.serviceRadius &&
                (!maxMarker ||
                  maxMarker.serviceRadius < info.info.loc.serviceRadius)
              ) {
                maxMarker = {
                  marker,
                  serviceRadius: info.info.loc.serviceRadius,
                };
              }
              if (clusterMarkers.length > 1) {
                m.clustering.clusterMarkers.set(marker, center);
              }
            }
          }

          // Draw a circle for the marker with the largest radius for each cluster (even clusters with 1 marker)
          if (displayServiceAreas && maxMarker) {
            markersWithAreaDrawn.add(maxMarker.marker);
            drawMarkerServiceArea(maxMarker.marker);
          }
        }

        if (displayServiceAreas) {
          // Iterate through ALL markers (including hidden ones) to hide all
          // service areas we don't want to be visible
          MARKER_SET_KEYS.forEach(s =>
            m.activeMarkers[s].forEach(marker => {
              if (!markersWithAreaDrawn.has(marker)) {
                const circle: google.maps.Circle | undefined = marker.get(
                  MARKER_DATA_CIRCLE,
                );
                if (circle) {
                  circle.setVisible(false);
                }
              }
            }),
          );
        }

        // Update tooltip position if neccesary
        // (marker may be newly in or out of cluster)
        this.updateInfoWindow();
      },
    );
  };

  private updateResults = () => {
    const { map } = mapState();
    const { results, nextResults, setResults } = this.props;
    if (map && nextResults && results !== nextResults) {
      setResults(nextResults, false);
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
      const clusterCenter = map.clustering?.clusterMarkers.get(marker);
      const contentString = infoWindowContent(selectedResult.info);
      if (!this.infoWindow) {
        this.infoWindow = new window.google.maps.InfoWindow({
          content: contentString,
          disableAutoPan: true,
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
          <div className={className || 'undefined'}>
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
