import 'babel-polyfill';
import 'fetch-polyfill';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import a11y from 'react-a11y';
import Root from './containers/root.jsx';
import store from './store/configureStore.js';

if (process.env.NODE_ENV === 'development') {
  a11y(React, { ReactDOM });
}

render(
  <Root store={store} />,
  document.getElementById('root')
);
