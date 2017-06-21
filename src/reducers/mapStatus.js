import {
  SET_CENTER,
  SET_NEARBY_SHELTERS,
  SET_RAW_LOCATION,
  SET_MAP_WAITING,
  SET_WAITING_EVAL,
  SET_ZONE_FALSE,
  SET_ZONE_TRUE,
  HIDE_AD,
  SHOW_AD,
} from '../actions/mapStatus';

const initialState = {
  center: {
    lat: 40.70772349475603,
    lng: -73.96261174678801,
  },
  containedIn: null,
  inZone: false,
  rawLocation: {
    string: null,
    type: null,
  },
  waitingEval: true,
  nearbyShelters: [],
  firstfound: false,
  hideAd: false,
  waitingMapLoad: false,
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CENTER:
      return {
        ...state,
        center: {
          lat: action.lat,
          long: action.long,
        },
        firstfound: true
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
        },
      };
    case SET_WAITING_EVAL:
      return {
        ...state,
        waitingEval: action.waiting,
      };
    case SET_NEARBY_SHELTERS:
      return {
        ...state,
        nearbyShelters: action.shelters,
      };
    case SET_MAP_WAITING:
      return {
        ...state,
        waitingMapLoad: state.waiting,
      };
    case HIDE_AD:
      return {
        ...state,
        hideAd: true,
      };
    case SHOW_AD:
      return {
        ...state,
        hideAd: false,
      };
    default:
      return state;
  }
}
