import {
  SET_ADS,
  SET_IDENTIFIABLE,
  FIRST_SETTINGS_SET,
} from '../actions/privacy';

const initialState = {
  allowAds: false,
  allowIdentifiableAnalytics: false,
  initSettingsSet: false,
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ADS:
      return {
        ...state,
        allowAds: action.value
      };
    case SET_IDENTIFIABLE:
      return {
        ...state,
        allowIdentifiableAnalytics: action.value
      };
    case FIRST_SETTINGS_SET:
      return {
        ...state,
        initSettingsSet: true,
        allowIdentifiableAnalytics: action.allowIdentifiableAnalytics,
        allowAds: action.allowAds
      };
    default:
      return state;
  }
}
