import debounce from 'lodash/debounce';

export interface QueryStringData {
  map?: {
    pos: {
      lat: number;
      lng: number;
    };
    zoom: number;
  };
}

export const updateQueryString = (update: Partial<QueryStringData>) => {
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
};

export const parseQueryString = (): QueryStringData => {
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
};

export const debouncedUpdateQueryStringMapLocation = debounce(
  (map: google.maps.Map) => {
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
  },
  299,
); // max is 100 times in 30 seconds
