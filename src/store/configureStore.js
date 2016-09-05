import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import api from '../middleware/api';

function applyReduxDevToolsExtension() {
  // eslint-disable-next-line max-len
  if (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') {
    return window.devToolsExtension();
  }
  return function(f) { return f; };
}


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk,
      api,
    ),
    applyReduxDevToolsExtension(),
  ),
);

export default store;
