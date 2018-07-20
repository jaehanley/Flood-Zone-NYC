export const SET_ADS = 'SET_ADS';
export const SET_IDENTIFIABLE = 'SET_IDENTIFIABLE';
export const FIRST_SETTINGS_SET = 'FIRST_SETTINGS_SET';

export function enableAds(value = true) {
  return {
    type: SET_ADS,
    value
  };
}

export function enableID(value = true) {
  return {
    type: SET_IDENTIFIABLE,
    value
  };
}

export function initSettings(
  allowAds = true,
  allowIdentifiableAnalytics = true
) {
  return {
    type: FIRST_SETTINGS_SET,
    allowAds,
    allowIdentifiableAnalytics
  };
}
