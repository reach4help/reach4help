import React from 'react';
import styled from 'styled-components';
import {Filter} from 'src/data';
import {MARKERS} from "../data/markers";

interface Props {
  className?: string;
  filter: Filter;
}

class Map extends React.Component<Props, {}> {
  private readonly googleMapRef: React.RefObject<any>;

  private map: any;

  private markers: any[] = [];

  private serviceCircles: any[] = [];

  private markerCluster: any = null;

  private visibleMarkers: any = [];

  private infoWindow: any = null;

  private activeMarker: any = null;


  constructor(props: Props) {
    super(props);
    this.googleMapRef = React.createRef();
  }

  componentDidMount(): void {

    const googleMapScript = document.createElement('script');
    googleMapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD5ywRBOAoyjwic5SzT9q3MPjLT1aibHO8&libraries=places'

    const clusterLibScript = document.createElement('script');
    clusterLibScript.src = 'https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js';

    // Load the scripts in order
    window.document.body.appendChild(clusterLibScript);
    clusterLibScript.addEventListener('load', () => {
      window.document.body.appendChild(googleMapScript);
    });

    googleMapScript.addEventListener('load', () => {
      this.map = this.createGoogleMap();

      // This also likely needs a separate service
      // // Create the search box and link it to the UI element.
      // if (this.map) {
      //   const input = document.getElementById('address-input');
      //   // @ts-ignore
      //   const searchBox = new window.google.maps.places.SearchBox(input);
      //
      //   this.map.addListener('bounds_changed', () => {
      //     searchBox.setBounds(this.map.getBounds());
      //   });
      //
      //   searchBox.addListener('places_changed', () => {
      //     const places = searchBox.getPlaces();
      //     // @ts-ignore
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
      this.markers = Object.values(MARKERS).map((location) => {
        // @ts-ignore
        const marker = new window.google.maps.Marker({
          position: location,
          label: location.label,
          // @ts-ignore
          title: location.services.join(',')
        });

        marker.addListener('click', () => {
          const contentString = '<div id="content">' +
              '<div id="siteNotice">' +
              '</div>' +
              `<h1 id="firstHeading" class="firstHeading">${location.contentTitle}</h1>` +
              `<div id="bodyContent">${location.contentBody}</div>` +
              '<div>' +
              '<hr>' +
              `<p>Email: <a href="mailto:${location.contact.email}">${location.contact.email}</a></p>` +
              `<p>Phone: <a href="tel:${location.contact.phone}">${location.contact.phone}</a></p>` +
              '<div>' +
              '</div>';

          // Reuse the info window or not
          if (this.infoWindow && this.infoWindow.setContent) {
            this.infoWindow.open(this.map, marker);
            this.infoWindow.setContent(contentString)
          } else {
            // @ts-ignore
            this.infoWindow = new window.google.maps.InfoWindow({
              content: contentString
            });
            this.infoWindow.open(this.map, marker);
          }

          this.map.panTo(marker.getPosition())
          this.map.setZoom(18)
        });

        // The Marker Cluster app doesn't have events for when it renders a single marker without a cluster.
        // We want to piggyback on an existing event so that we can render a circle of influence
        // when the marker cluster lib tells us it's singled out a marker.
        marker.addListener('title_changed', () => {
          // Save some processing juice here by skipping on hidden markers (based on a filter users select for service types)
          if (!marker.getVisible()) {
            return;
          }

          let color: string;
          const services = marker.title.split(',')
          if (services.indexOf('mobility') !== -1) {
            color = '#742388'
          } else if (services.indexOf('medicine') !== -1) {
            color = '#4285F4'
          } else if (services.indexOf('food') !== -1) {
            color = '#DB4437'
          } else if (services.indexOf('supplies') !== -1) {
            color = '#0F9D58'
          } else {
            color = '#F4B400'
          }

          const mapBoundingBox = this.map.getBounds();
          const topRight = mapBoundingBox.getNorthEast();
          const bottomLeft = mapBoundingBox.getSouthWest();
          const markerPosition = marker.position;
          const radius = location.serviceRadius;

          // Now compare the distance from the marker to corners of the box;
          const distanceToTopRight = this.haversineDistance(markerPosition, topRight);
          const distanceToBottomLeft = this.haversineDistance(markerPosition, bottomLeft);

          if (distanceToBottomLeft > radius || distanceToTopRight > radius) {
            // @ts-ignore
            this.serviceCircles.push(new window.google.maps.Circle({
              strokeColor: color,
              strokeOpacity: 0.3,
              strokeWeight: 1,
              fillColor: color,
              fillOpacity: 0.15,
              map: this.map,
              center: marker.position,
              radius
            }));
          } else {
            // TODO: Add to border of map instead of adding a circle
          }
        });

        return marker;
      });

      if (this.markers.length) {
        this.map.setCenter(this.markers[0].getPosition());
      }

      // Add a marker clusterer to manage the markers.
      // @ts-ignore
      this.markerCluster = new MarkerClusterer(this.map, this.markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        ignoreHidden: true,
        averageCenter: true,
        gridSize: 30
      });

      // Set up event listeners to tell us when the map has started refreshing.
      this.markerCluster.addListener('clusteringbegin', (mc: any) => {
        // $("#visible-markers").html('<h2>Loading List View ... </h2>');

        this.serviceCircles.forEach(function (circle) {
          // Check this first since not everything we put into serviceCircles is a valid circle object, some may be null
          if (circle.setMap) {
            circle.setMap(null);
          }
        })
      });

      // The clusters have been computed so we can
      this.markerCluster.addListener('clusteringend', (newClusterParent: any) => {
        this.visibleMarkers = [];
        this.serviceCircles = [];

        newClusterParent.getClusters().forEach((cluster: any) => {
          const maxMarkerRadius = 0;
          let maxMarker: any;

          // Figure out which marker in each cluster will generate a circle.
          cluster.getMarkers().forEach((singleMarker: any) => {
            // Update maxMarker to higher value if found.
            const newPotentialMaxMarkerRadius = Math.max(maxMarkerRadius, MARKERS[singleMarker.label].serviceRadius);
            maxMarker = newPotentialMaxMarkerRadius > maxMarkerRadius ? singleMarker : maxMarker;
            this.visibleMarkers.push(singleMarker); // Register it so we can clear or manipulate it later
          });

          // Draw a circle for the marker with the largest radius for each cluster (even clusters with 1 marker)
          if (maxMarker) {
            maxMarker.setTitle(maxMarker.getTitle()) // Trigger Radius Drawing on max radius marker for the cluster
          }
        });

        // Commented out as this is likely handled via react reducers and stuff I don't understand :P
        // // Prepare HTML content for side list view
        // let newListContent = '';
        // // Rebuild list using currently visible markers
        // this.visibleMarkers.forEach((marker: any) => {
        //   const location = MARKERS[marker.getLabel()];
        //
        //   newListContent +=
        //       '<a onclick="window.sourcecode.activateMarker(' + marker.getLabel() + ');" class="list-group-item list-group-item-action flex-column align-items-start">' +
        //       '<div class="d-flex w-100 justify-content-between">' +
        //       '<h5 class="mb-1">' + location.label + ': ' + location.contentTitle + '</h5>' +
        //       '<small class="text-muted">' + location.types.join(', ') + '</small>' +
        //       '</div >' +
        //       '<p class="mb-1">' + location.contentBody + '</p>' +
        //       '</a >'
        // })
        //
        // // In case there aren't any visible markers show a friendly message
        // if (!newListContent) {
        //   newListContent = '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +
        //       '<div class="d-flex w-100 justify-content-between">' +
        //       '<h5 class="mb-1">No Locations Found</h5>' +
        //       '</div >' +
        //       '<p class="mb-1">Try looking at a different area of the map</p>' +
        //       '</a >'
        // }
        //
        // // Refresh the HTML element on the right scroll view
        // $("#visible-markers").html(newListContent);
      })
    })
  };

  private haversineDistance = (latLng1: any, latLng2: any): number => {
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

  private createGoogleMap = (): any => {
    // @ts-ignore
    return new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 3,
      center: { lat: -28.024, lng: 140.887 },
      // @ts-ignore
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      clickableIcons: false,
      mapTypeControl: false
    });
  };

  public render() {
    const {className, filter} = this.props;
    return (
      <div className={className} id="google-map" ref={this.googleMapRef}>
        {filter.service}
      </div>
    )
  }
}

export default styled(Map)`
  flex-grow: 1;
  background: #f99;
  font-size: 70px;
  text-align: center;
`;
