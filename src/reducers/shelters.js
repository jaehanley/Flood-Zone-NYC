import {
  SHELTERS_REQUEST,
  SHELTERS_RECEIVED,
  SHELTERS_FAILURE,
} from '../actions/shelters';

const initialState = {
  locations: [],
  loading: false,
  error: null,
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case SHELTERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SHELTERS_RECEIVED:
      return {
        ...state,
        locations: action.response,
        loading: false,
      };
    case SHELTERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
