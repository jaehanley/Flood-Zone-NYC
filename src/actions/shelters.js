import getJSON from '../utils/api';

export const SHELTERS_REQUEST = 'SHELTERS_REQUEST';
export const SHELTERS_RECEIVED = 'SHELTERS_RECEIVED';
export const SHELTERS_FAILURE = 'SHELTERS_FAILURE';

export function getShelters() {
  return {
    types: [
      SHELTERS_REQUEST,
      SHELTERS_RECEIVED,
      SHELTERS_FAILURE,
    ],
    // eslint-disable-next-line
    request: () => getJSON('https://data.cityofnewyork.us/api/geospatial/ayer-cga7?method=export&format=GeoJSON'),
    shouldRequest: (state) => {
      return state.shelters.locations.length === 0;
    }
  };
}
