import {
  ZONES_REQUEST,
  ZONES_RECEIVED,
  ZONES_FAILURE,
} from '../actions/zones';

const initialState = {
  locations: [],
  loading: false,
  error: null,
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case ZONES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ZONES_RECEIVED:
      return {
        ...state,
        locations: action.response,
        loading: false,
      };
    case ZONES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
