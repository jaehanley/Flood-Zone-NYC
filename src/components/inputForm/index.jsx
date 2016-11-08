import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  setRawLocation,
  setCenter,
} from '../../actions/mapStatus';
import style from './style.css';
import locationBtn from '../../assets/img/location.svg';

class InputForm extends Component {
  static propTypes = {
    containedIn: PropTypes.string,
    inZone: PropTypes.bool.isRequired,
    rawLocation: PropTypes.object.isRequired,
    setCenter: PropTypes.func.isRequired,
    setRawLocation: PropTypes.func.isRequired,
    waitingEval: PropTypes.bool.isRequired,
  }

  componentWillReceiveProps(newProps) {
    if (newProps.rawLocation !== this.props.rawLocation) {
      this.updateInputLocation(newProps.rawLocation);
    }
  }

  getGeolocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const google = window.google;
      const fallbackLocation = () => {
        this.props.setRawLocation(
          `${lat}, ${lng}`,
          'coords'
        );
      };
      if (google) {
        // eslint-disable-next-line new-parens
        const geocoder = new google.maps.Geocoder;
        geocoder.geocode(
          { location: { lat, lng } },
          (results, status) => {
            if (status === 'OK') {
              if (results[1]) {
                this.props.setRawLocation(
                  results[1].formatted_address,
                  'address'
                );
              } else {
                fallbackLocation();
              }
            } else {
              fallbackLocation();
            }
          }
        );
      } else {
        fallbackLocation();
      }
      this.props.setCenter(lat, lng);
    });
  }

  getAddressLocation(event) {
    event.preventDefault();
    const address = this.mapInput.value;
    const google = window.google;
    if (google) {
      // eslint-disable-next-line new-parens
      const geocoder = new google.maps.Geocoder;
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          this.props.setRawLocation(
            results[0].formatted_address,
            'address'
          );
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          this.props.setCenter(lat, lng);
        }
      });
    }
  }

  updateInputLocation(newAddress) {
    this.mapInput.value = newAddress.string;
  }

  render() {
    const {
      rawLocation,
      inZone,
      containedIn,
      waitingEval,
    } = this.props;
    const iosApp = window.navigator.standalone;
    let outputMessage = 'Not in an evac zone';
    if (waitingEval) {
      outputMessage = 'Loading…';
    } else if (inZone) {
      outputMessage = `In evac zone ${containedIn}`;
    }
    return (
      <div className={iosApp ? style.inAppMode : style.webMode}>
        <div className={style.searchContainer}>
          <div className={style.topView}>
            <div className={style.inputContainer}>
              <form
                onSubmit={this.getAddressLocation.bind(this)}
              >
                <input
                  aria-label='Search by address'
                  placeholder='Search by address'
                  type='text'
                  ref={(c) => { this.mapInput = c; }}
                  defaultValue={rawLocation.string || ''}
                />
              </form>
              {(window && 'geolocation' in window.navigator) && (
                <button
                  aria-label='Find by location'
                  className={style.geolocate}
                  style={{
                    backgroundImage: `url(${locationBtn})`
                  }}
                  onClick={this.getGeolocation.bind(this)}
                />
              )}
            </div>
            <div
              className={
                `${style.locationStatus} ${
                  inZone
                  ? style.activeZone
                  : ''
                }`
              }
            >
              <span>{outputMessage}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    containedIn: state.mapStatus.containedIn,
    inZone: state.mapStatus.inZone,
    rawLocation: state.mapStatus.rawLocation,
    waitingEval: state.mapStatus.waitingEval,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRawLocation: (string, type) => {
      dispatch(setRawLocation(string, type));
    },
    setCenter: (lat, long) => {
      dispatch(setCenter(lat, long));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputForm);
