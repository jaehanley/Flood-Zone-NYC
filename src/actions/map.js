import { post } from '../api/server';
import {
   MAP_PENDING,
   MAP_SUCCESS,
   MAP_ERROR,
} from '../constants';

export function getMap() {
  const types = [
    MAP_PENDING,
    MAP_SUCCESS,
    MAP_ERROR,
  ]
  return {
    request: () => {
      return dispatch({
        types: types,
        payload {
          promise: post('/zones')
            .then((res) => {
              return res;
            }),
        },
      });
    }
  }
}
