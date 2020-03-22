import React from 'react';
import {Filter} from 'src/data';
import styled from 'styled-components';
import {MARKERS, MarkerInfo} from "../data/markers";

interface Props {
  className?: string;
  filter: Filter;
  updateResults: (results: MarkerInfo[]) => void;
}

interface MapInfo {
  map: google.maps.Map;
  markers: google.maps.Marker[];
  clustering?: {
    state: 'idle';
    /** The circles we rendered for the current visible markers */
    serviceCircles: google.maps.Circle[];
  } | {
    /** A clustering is in progress */
    state: 'active';
  };
};

function createGoogleMap(ref: HTMLDivElement): google.maps.Map {
  return new google.maps.Map(ref, {
    zoom: 3,
    center: { lat: -28.024, lng: 140.887 },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    clickableIcons: false,
    mapTypeControl: false
  });
};

class Map extends React.Component<Props, {}> {

  private infoWindow: google.maps.InfoWindow | null = null;

  private updateGoogleMapRef = (ref: HTMLDivElement | null) => {
    if (!ref) {
      return;
    }
    const map = createGoogleMap(ref);
    const markers = MARKERS.map(info => {
      const marker = new window.google.maps.Marker({
        position: info,
        title: info.services.join(',')
      });
      marker.set('info', info);
      return marker;
    });

    const m: MapInfo = {
      map,
      markers
    };

    // This also likely needs a separate service
    // // Create the search box and link it to the UI element.
    // if (this.map) {
    //   const input = document.getElementById('address-input');
    //   const searchBox = new window.google.maps.places.SearchBox(input);
    //
    //   this.map.addListener('bounds_changed', () => {
    //     searchBox.setBounds(this.map.getBounds());
    //   });
    //
    //   searchBox.addListener('places_changed', () => {
    //     const places = searchBox.getPlaces();
    //     const bounds = new window.google.maps.LatLngBounds();
    //
    //     if (places.length === 0) {
    //       return;
    //     }
    //
    //     places.forEach((place: any) => {
    //       if (!place.geometry) {
    //         console.log("Returned place contains no geometry");
    //         return;
    //       }
    //
    //       if (place.geometry.viewport) {
    //         bounds.union(place.geometry.viewport);
    //       } else {
    //         bounds.extend(place.geometry.location);
    //       }
    //     });
    //
    //     this.map.fitBounds(bounds);
    //   })
    // }

    // We iterate over all locations to create markers
    // This pretty much orchestrates everything since the map is the main interaction window
    markers.forEach(marker => {

      const location = marker.get('info') as MarkerInfo;

      marker.addListener('click', () => {
        const contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            `<h1 id="firstHeading" class="firstHeading">${location.contentTitle}</h1>` +
            `<div id="bodyContent">${location.contentBody}</div>` +
            '<div>' +
            '<hr>' +
            `<p>Website: <a href="${location.contact.web}">${location.contact.web}</a></p>` +
            `<p>Email: <a href="mailto:${location.contact.email}">${location.contact.email}</a></p>` +
            `<p>Phone: <a href="tel:${location.contact.phone}">${location.contact.phone}</a></p>` +
            '<div>' +
            '</div>';

        // Reuse the info window or not
        if (this.infoWindow && this.infoWindow.setContent) {
          this.infoWindow.open(map, marker);
          this.infoWindow.setContent(contentString)
        } else {
          this.infoWindow = new window.google.maps.InfoWindow({
            content: contentString
          });
          this.infoWindow.open(map, marker);
        }

        const pos = marker.getPosition();
        if (pos)
          map.panTo(pos);
        map.setZoom(18);
      });

      return marker;
    });

    if (markers.length) {
      const position = markers[0].getPosition();
      if (position)
        map.setCenter(position);
    }

    const drawMarkerServiceArea = (marker: google.maps.Marker) => {
      if (m.clustering?.state !== 'idle') {
        return;
      }

      const info: MarkerInfo = marker.get('info');

      let color: string;
      const services = (marker.getTitle() || '').split(',')
      if (services.includes('mobility')) {
        color = '#742388'
      } else if (services.includes('medicine')) {
        color = '#4285F4'
      } else if (services.includes('food')) {
        color = '#DB4437'
      } else if (services.includes('supplies')) {
        color = '#0F9D58'
      } else {
        color = '#F4B400'
      }

      const mapBoundingBox = map.getBounds();
      if (mapBoundingBox) {
        const topRight = mapBoundingBox.getNorthEast();
        const bottomLeft = mapBoundingBox.getSouthWest();
        const markerPosition = marker.getPosition();
        const radius = info.serviceRadius;

        // Now compare the distance from the marker to corners of the box;
        if (markerPosition) {
          const distanceToTopRight = this.haversineDistance(markerPosition, topRight);
          const distanceToBottomLeft = this.haversineDistance(markerPosition, bottomLeft);

          if (distanceToBottomLeft > radius || distanceToTopRight > radius) {
            m.clustering.serviceCircles.push(new window.google.maps.Circle({
              strokeColor: color,
              strokeOpacity: 0.3,
              strokeWeight: 1,
              fillColor: color,
              fillOpacity: 0.15,
              map,
              center: marker.getPosition() || undefined,
              radius
            }));
          } else {
            // TODO: Add to border of map instead of adding a circle
          }
        }
      }
    };

    // Add a marker clusterer to manage the markers.
    const markerCluster = new MarkerClusterer(map, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      ignoreHidden: true,
      averageCenter: true,
      gridSize: 30
    });

    // Set up event listeners to tell us when the map has started refreshing.
    markerCluster.addListener('clusteringbegin', () => {
      if (m.clustering?.state === 'idle') {
        m.clustering.serviceCircles.forEach(circle => {
          circle.setMap(null);
        });
      }
      // $("#visible-markers").html('<h2>Loading List View ... </h2>');
    });

    // The clusters have been computed so we can
    markerCluster.addListener('clusteringend', (newClusterParent: MarkerClusterer) => {
      m.clustering = {
        state: 'idle',
        serviceCircles: []
      };
      const visibleMarkers: Array<{
        marker: google.maps.Marker;
        info: MarkerInfo;
      }> = [];

      newClusterParent.getClusters().forEach(cluster => {
        const maxMarkerRadius = 0;
        let maxMarker: google.maps.Marker | null = null;

        // Figure out which marker in each cluster will generate a circle.
        for (const marker of cluster.getMarkers()) {
          // Update maxMarker to higher value if found.
          const info = marker.get('info') as MarkerInfo;
          const newPotentialMaxMarkerRadius = Math.max(maxMarkerRadius, info.serviceRadius);
          maxMarker = newPotentialMaxMarkerRadius > maxMarkerRadius ? marker : maxMarker;
          visibleMarkers.push({marker, info});
        }

        // Draw a circle for the marker with the largest radius for each cluster (even clusters with 1 marker)
        if (maxMarker) {
          drawMarkerServiceArea(maxMarker);
        }
      });

      // Clear all marker labels
      for (const marker of markers) {
        marker.setLabel('');
      }

      // Update labels of markers to be based on index in visibleMarkers
      visibleMarkers.forEach(({marker}, index) => {
        marker.setLabel((index + 1).toString());
      });

      const { updateResults } = this.props;
      updateResults(visibleMarkers.map(marker => marker.info));
    });
  };

  private haversineDistance = (latLng1: google.maps.LatLng, latLng2: google.maps.LatLng): number => {
    const lon1 = latLng1.lng();
    const lon2 = latLng2.lng();
    const radlat1 = Math.PI * latLng1.lat() / 180;
    const radlat2 = Math.PI * latLng2.lat() / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist *= 1609.344; // for meters
    return dist
  };

  public render() {
    const {className, filter} = this.props;
    return (
      <div className={className} id="google-map" ref={this.updateGoogleMapRef}>
        {filter.service}
      </div>
    )
  }
}

export default styled(Map)`
  height: 100%;
`;
