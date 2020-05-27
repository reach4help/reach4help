import moment from 'moment';

// default center
const ANGKOR_WAT = {
  lat: 13.4124693,
  lng: 103.8667,
};

export const secondsToTimestring = (seconds: number) =>
  moment.duration(seconds, 'seconds').humanize();

export const metersToKm = (meters: number) => `${(meters / 1000).toFixed(1)}km`;

export const metersToImperial = (meters: number) =>
  `${(meters * 0.000621371).toFixed(1)}mi`;

export const getCoordsFromProfile = profileState => {
  if (
    profileState &&
    profileState.privilegedInformation &&
    profileState.privilegedInformation.address &&
    profileState.privilegedInformation.address.coords
  ) {
    return {
      lat: profileState.privilegedInformation.address.coords.latitude,
      lng: profileState.privilegedInformation.address.coords.longitude,
    };
  }
  return {
    lat: ANGKOR_WAT.lat,
    lng: ANGKOR_WAT.lng,
  };
};

export const getStreetAddressFromProfile = profileState => {
  if (
    profileState &&
    profileState.privilegedInformation &&
    profileState.privilegedInformation.address
  ) {
    const { address } = profileState.privilegedInformation;
    const { address1, address2, postalCode, city, state, country } = address;
    const undefinedSafe = value => value || '';
    const formattedAddress = `${undefinedSafe(address1)} ${undefinedSafe(
      address2,
    )} ${undefinedSafe(city)} ${undefinedSafe(state)} ${undefinedSafe(
      postalCode,
    )} ${undefinedSafe(country)}`;

    return formattedAddress;
  }
};
