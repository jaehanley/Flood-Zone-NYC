import { combineReducers } from 'redux';
import zones from './zones';
import shelters from './shelters';
import mapStatus from './mapStatus';

export default combineReducers({
  zones,
  shelters,
  mapStatus,
});
