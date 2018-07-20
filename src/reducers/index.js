import { combineReducers } from 'redux';
import zones from './zones';
import shelters from './shelters';
import mapStatus from './mapStatus';
import privacy from './privacy';

export default combineReducers({
  zones,
  shelters,
  mapStatus,
  privacy,
});
