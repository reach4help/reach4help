import { parseQueryString } from './query-string';

export const createGoogleMap = (ref: HTMLDivElement): google.maps.Map => {
  const query = parseQueryString();
  return new google.maps.Map(ref, {
    zoom: query.map ? query.map.zoom : 3,
    center: query.map ? query.map.pos : { lat: 0, lng: 0 },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    clickableIcons: false,
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    },
  });
};

export const haversineDistance = (
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

export const generateSortBasedOnMapCenter = (mapCenter: google.maps.LatLng) => (
  a: google.maps.Marker,
  b: google.maps.Marker,
): number => {
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
