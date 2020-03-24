import React from 'react';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';

import { Filter, SERVICES } from 'src/data';
import styled from '../styling';
import { MARKERS, MarkerInfo, ContactDetails } from '../data/markers';

export type SelectMarkerCallback = ((marker: number) => void) | null;

interface MapInfo {
  map: google.maps.Map;
  markers: Map<MarkerInfo, google.maps.Marker>;
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
        // visibleMarkers: google.maps.Marker[];
      }
    | {
        /** A clustering is in progress */
        state: 'active';
      };
}

function updateQueryString(update: Partial<QueryStringData>) {
  if (!URLSearchParams) {
    return window.location.search;
  }
  const params = new URLSearchParams(window.location.search);
  if (update.map) {
    params.set(
      'map',
      [update.map.pos.lat, update.map.pos.lng, update.map.zoom].join(','),
    );
  }
  return `?${params.toString()}`;
}

function parseQueryString(): QueryStringData {
  const result: QueryStringData = {};
  if (URLSearchParams) {
    const params = new URLSearchParams(window.location.search);
    const map = params.get('map');
    if (map) {
      const split = map.split(',').map(s => parseFloat(s));
      if (split.length === 3 && split.every(v => !Number.isNaN(v))) {
        result.map = {
          zoom: split[2],
          pos: {
            lat: split[0],
            lng: split[1],
          },
        };
      }
    }
  }
  return result;
}

function createGoogleMap(ref: HTMLDivElement): google.maps.Map {
  const query = parseQueryString();
  return new google.maps.Map(ref, {
    zoom: query.map ? query.map.zoom : 3,
    center: query.map ? query.map.pos : { lat: 0, lng: 0 },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    clickableIcons: false,
    mapTypeControl: false,
  });
}

function getInfo(marker: google.maps.Marker): MarkerInfo {
  return marker.get('info');
}

function updateMarkersVisiblility(
  markers: Map<MarkerInfo, google.maps.Marker>,
  filter: Filter,
) {
  for (const marker of markers.values()) {
    const info = getInfo(marker);
    const visible = !filter.service || info.services.includes(filter.service);
    marker.setVisible(visible);
  }
}

function contactInfo(label: string, info?: ContactDetails): string {
  if (!info) {
    return '';
  }
  const items: Array<{ href: string; label: string }> = [];
  if (info.phone) {
    items.push(
      ...info.phone.map(number => ({
        href: `tel:${number.replace(/\s/g, '')}`,
        label: number,
      })),
    );
  }
  if (info.email) {
    items.push(
      ...info.email.map(email => ({
        href: `mailto:${email}`,
        label: email,
      })),
    );
  }
  if (info.facebookGroup) {
    items.push({
      href: info.facebookGroup,
      label: 'Facebook',
    });
  }
  if (info.web) {
    items.push(
      ...Object.entries(info.web).map(entry => ({
        href: entry[1],
        label: entry[0],
      })),
    );
  }
  if (items.length === 0) {
    return '';
  }
  return `
    <div>
      <span>${label}:</span>
      ${items.map(
        item => `<a href="${item.href}" target="_blank">${item.label}</a> `,
      )}
    </div>
    `;
}

function infoWindoContent(info: MarkerInfo): string {
  return `<div id="content">
    <div id="siteNotice">
    </div>
    <h1 id="firstHeading" class="firstHeading">${info.contentTitle}</h1>
    ${info.contentBody ? `<div id="bodyContent">${info.contentBody}</div>` : ''}
    <div>
      <hr>
      ${contactInfo('General Inquiries', info.contact.general)}
      ${contactInfo('Volunteer', info.contact.volunteers)}
      ${contactInfo('Request Help', info.contact.getHelp)}
    <div>
  </div>`;
}

const debouncedReplaceHistory = debounce((map: google.maps.Map) => {
  const pos = map.getCenter();
  const zoom = map.getZoom();
  window.history.replaceState(
    null,
    '',
    updateQueryString({
      map: {
        pos: { lat: pos.lat(), lng: pos.lng() },
        zoom,
      },
    }),
  );
}, 299); // max is 100 times in 30 seconds

const haversineDistance = (
  latLng1: google.maps.LatLng,
  latLng2: google.maps.LatLng,
): number => {
  const lon1 = latLng1.lng();
  const lon2 = latLng2.lng();
  const radlat1 = (Math.PI * latLng1.lat()) / 180;
  const radlat2 = (Math.PI * latLng2.lat()) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist *= 1609.344; // for meters
  return dist;
};

const generateSortBasedOnMapCenter = (mapCenter: google.maps.LatLng) => {
  return (a: google.maps.Marker, b: google.maps.Marker): number => {
    const aPosition = a.getPosition();
    const bPosition = b.getPosition();

    if (aPosition && bPosition) {
      const aFromCenter = haversineDistance(aPosition, mapCenter);
      const bFromCenter = haversineDistance(bPosition, mapCenter);

      if (aFromCenter > bFromCenter) {
        return 1;
      }
      if (aFromCenter < bFromCenter) {
        return -1;
      }
      return 0;
    }
    if (!aPosition) {
      return -1;
    }
    if (!bPosition) {
      return 1;
    }
    return 0;
  };
};

interface QueryStringData {
  map?: {
    pos: {
      lat: number;
      lng: number;
    };
    zoom: number;
  };
}

interface Props {
  className?: string;
  filter: Filter;
  searchInput: HTMLInputElement | null;
  results: MarkerInfo[] | null;
  updateResults: (results: MarkerInfo[]) => void;
  /**
   * Set a callback that expects the index from the results array representing
   * the marker that has been selected;
   */
  setSelectResultCallback: (callback: SelectMarkerCallback) => void;
}

interface State {
  /**
   * List of results to display next for the current map bounds
   */
  nextResults?: {
    markers: google.maps.Marker[];
    results: MarkerInfo[];
  };
}

class MapComponent extends React.Component<Props, State> {
  private map: MapInfo | null = null;

  private searchBox: {
    searchInput: HTMLInputElement;
    box: google.maps.places.SearchBox;
  } | null = null;

  private infoWindow: google.maps.InfoWindow | null = null;

  public constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    this.initializeSearch();
  }

  public componentDidUpdate() {
    const { filter } = this.props;
    // Update filter if changed
    if (this.map && !isEqual(filter, this.map.currentFilter)) {
      updateMarkersVisiblility(this.map.markers, filter);
      this.map.markerClusterer.repaint();
      this.map.currentFilter = filter;
    }
    // Update search box if changed
    this.initializeSearch();
  }

  private updateGoogleMapRef = (ref: HTMLDivElement | null) => {
    const { filter, setSelectResultCallback } = this.props;
    if (!ref) {
      setSelectResultCallback(null);
      return;
    }
    const map = createGoogleMap(ref);
    const markers = new Map<MarkerInfo, google.maps.Marker>();
    for (const m of MARKERS) {
      const marker = new window.google.maps.Marker({
        position: m.loc,
        title: m.services.join(','),
      });
      marker.set('info', m);
      markers.set(m, marker);
    }

    // Add a marker clusterer to manage the markers.
    const markerClusterer = new MarkerClusterer(
      map,
      Array.from(markers.values()),
      {
        imagePath:
          'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        ignoreHidden: true,
        averageCenter: true,
        gridSize: 30,
      },
    );

    const m: MapInfo = {
      map,
      markers,
      currentFilter: filter,
      markerClusterer,
    };
    this.map = m;

    setSelectResultCallback(index => {
      const { results } = this.props;
      if (m.clustering?.state === 'idle') {
        // The index represents which result in results
        const markerInfo = results && results[index];
        const marker = markerInfo && markers.get(markerInfo);
        if (marker) {
          google.maps.event.trigger(marker, 'click');
        }
      }
    });

    updateMarkersVisiblility(markers, filter);

    map.addListener('bounds_changed', () => {
      const bounds = map.getBounds();
      if (this.searchBox && bounds) {
        this.searchBox.box.setBounds(bounds);
      }
      if ('replaceState' in window.history) {
        debouncedReplaceHistory(map);
      }
    });

    // We iterate over all locations to create markers
    // This pretty much orchestrates everything since the map is the main interaction window
    markers.forEach(marker => {
      const location = getInfo(marker);

      marker.addListener('click', () => {
        const contentString = infoWindoContent(location);

        // Reuse the info window or not
        if (this.infoWindow && this.infoWindow.setContent) {
          this.infoWindow.open(map, marker);
          this.infoWindow.setContent(contentString);
        } else {
          this.infoWindow = new window.google.maps.InfoWindow({
            content: contentString,
          });
          this.infoWindow.open(map, marker);
        }
      });

      return marker;
    });

    const drawMarkerServiceArea = (marker: google.maps.Marker) => {
      if (m.clustering?.state !== 'idle') {
        return;
      }

      const info = getInfo(marker);
      const { color } = SERVICES[m.currentFilter.service || info.services[0]];

      const mapBoundingBox = map.getBounds();
      if (mapBoundingBox) {
        const topRight = mapBoundingBox.getNorthEast();
        const bottomLeft = mapBoundingBox.getSouthWest();
        const markerPosition = marker.getPosition();
        const radius = info.loc.serviceRadius;

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

    // The clusters have been computed so we can
    markerClusterer.addListener(
      'clusteringend',
      (newClusterParent: MarkerClusterer) => {
        m.clustering = {
          state: 'idle',
          serviceCircles: [],
        };
        const visibleMarkers: google.maps.Marker[] = [];

        for (const cluster of newClusterParent.getClusters()) {
          let maxMarker: {
            marker: google.maps.Marker;
            serviceRadius: number;
          } | null = null;

          // Figure out which marker in each cluster will generate a circle.
          for (const marker of cluster.getMarkers()) {
            // Update maxMarker to higher value if found.
            const info = getInfo(marker);
            if (
              !maxMarker ||
              maxMarker.serviceRadius < info.loc.serviceRadius
            ) {
              maxMarker = {
                marker,
                serviceRadius: info.loc.serviceRadius,
              };
            }
            visibleMarkers.push(marker);
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
        const nextResults = {
          markers: visibleMarkers,
          results: visibleMarkers.map(marker => getInfo(marker)),
        };
        this.setState(
          state =>
            isEqual(state.nextResults, nextResults) ? {} : { nextResults },
          () => {
            // If there have been no results set yet, update them!
            const { results } = this.props;
            if (results === null) {
              this.updateResults();
            }
          },
        );
      },
    );
  };

  private updateResults = () => {
    const { results, updateResults } = this.props;
    const { nextResults } = this.state;
    if (this.map && nextResults && results !== nextResults.results) {
      // Clear all existing marker labels
      for (const marker of this.map.markers.values()) {
        marker.setLabel('');
      }
      // Relabel marker labels based on theri index
      nextResults.markers.forEach((marker, index) => {
        marker.setLabel((index + 1).toString());
      });
      // Update the new results state
      updateResults(nextResults.results);
    }
  };

  private initializeSearch() {
    const { searchInput } = this.props;
    if (this.searchBox?.searchInput !== searchInput) {
      if (!searchInput) {
        this.searchBox = null;
        return;
      }
      const box = new google.maps.places.SearchBox(searchInput);
      this.searchBox = {
        searchInput,
        box,
      };

      this.searchBox.box.addListener('places_changed', () => {
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
    }
  }

  public render() {
    const { className, results } = this.props;
    const { nextResults } = this.state;
    const hasNewResults = nextResults && nextResults.results !== results;
    return (
      <div className={className}>
        <div ref={this.updateGoogleMapRef} />
        {hasNewResults && (
          <button type="button" onClick={this.updateResults}>
            Update results for this area
          </button>
        )}
      </div>
    );
  }
}

export default styled(MapComponent)`
  height: 100%;
  position: relative;

  > div {
    height: 100%;
  }

  > button {
    position: absolute;
    bottom: ${p => p.theme.spacingPx}px;
    left: ${p => p.theme.spacingPx}px;
    right: ${p => p.theme.spacingPx}px;
    margin: 0 auto;
    color: #333;
    background: #fff;
    border: none;
    outline: none;
    font-size: 15px;
    padding: 9px 9px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
    cursor: pointer;

    &:hover {
      color: #000;
    }
  }
`;
