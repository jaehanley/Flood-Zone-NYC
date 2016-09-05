export const SET_CENTER = 'SET_CENTER';
export const SET_ZONE_TRUE = 'SET_ZONE_TRUE';
export const SET_ZONE_FALSE = 'SET_ZONE_FALSE';
export const SET_RAW_LOCATION = 'SET_RAW_LOCATION';

export function setCenter(lat, long) {
  return {
    type: SET_CENTER,
    lat,
    long,
  };
}

export function setInZone(inZone, zone = null) {
  return {
    type: inZone ? SET_ZONE_TRUE : SET_ZONE_FALSE,
    zone,
  };
}

export function setRawLocation(string, stringType) {
  return {
    type: SET_RAW_LOCATION,
    string,
    stringType,
  };
}
