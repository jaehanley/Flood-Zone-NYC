import {
  SET_CENTER,
  SET_ZONE_TRUE,
  SET_ZONE_FALSE,
  SET_RAW_LOCATION,
} from '../actions/mapStatus';

const initialState = {
  center: {
    lat: 40.70772349475603,
    lng: -73.96261174678801,
  },
  inZone: false,
  containedIn: null,
  rawLocation: {
    string: null,
    type: null,
  },
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CENTER:
      return {
        ...state,
        center: {
          lat: action.lat,
          long: action.long,
        }
      };
    case SET_ZONE_TRUE:
      return {
        ...state,
        inZone: true,
        containedIn: action.zone,
      };
    case SET_ZONE_FALSE:
      return {
        ...state,
        inZone: false,
        containedIn: null,
      };

    case SET_RAW_LOCATION:
      return {
        ...state,
        rawLocation: {
          string: action.string,
          type: action.stringType,
        }
      };
    default:
      return state;
  }
}
