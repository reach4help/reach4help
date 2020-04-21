import { MediaQueries } from 'src/types/constants';

export const MEDIA_QUERIES: MediaQueries = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const DEVICE_MIN: MediaQueries = {
  mobileS: `(min-width: ${MEDIA_QUERIES.mobileS})`,
  mobileM: `(min-width: ${MEDIA_QUERIES.mobileM})`,
  mobileL: `(min-width: ${MEDIA_QUERIES.mobileL})`,
  tablet: `(min-width: ${MEDIA_QUERIES.tablet})`,
  laptop: `(min-width: ${MEDIA_QUERIES.laptop})`,
  laptopL: `(min-width: ${MEDIA_QUERIES.laptopL})`,
  desktop: `(min-width: ${MEDIA_QUERIES.desktop})`,
};

export const DEVICE_MAX: MediaQueries = {
  mobileS: `(max-width: ${MEDIA_QUERIES.mobileS})`,
  mobileM: `(max-width: ${MEDIA_QUERIES.mobileM})`,
  mobileL: `(max-width: ${MEDIA_QUERIES.mobileL})`,
  tablet: `(max-width: ${MEDIA_QUERIES.tablet})`,
  laptop: `(max-width: ${MEDIA_QUERIES.laptop})`,
  laptopL: `(max-width: ${MEDIA_QUERIES.laptopL})`,
  desktop: `(max-width: ${MEDIA_QUERIES.desktop})`,
};
