import getJSON from '../utils/api';
import firmData from '../data/nyc-preliminary-firm.json';

export const ZONES_REQUEST = 'ZONES_REQUEST';
export const ZONES_RECEIVED = 'ZONES_RECEIVED';
export const ZONES_FAILURE = 'ZONES_FAILURE';

export function getZones() {
  return {
    types: [
      ZONES_REQUEST,
      ZONES_RECEIVED,
      ZONES_FAILURE,
    ],
    // eslint-disable-next-line
    request: () => getJSON(firmData),
    shouldRequest: (state) => {
      return state.zones.locations.length === 0;
    }
  };
}
