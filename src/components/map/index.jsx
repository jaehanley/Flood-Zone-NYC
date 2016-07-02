import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { googleKey } from '../../data';
import { connect } from 'react-redux';

export default class Map extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div>
        <div
          ref='map-target'
        />
        <script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${googleKey}`}
        />
      </div>
    );
  }
}
