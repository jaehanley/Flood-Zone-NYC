import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  setRawLocation,
  setCenter,
  setWaiting,
} from '../../actions/mapStatus';
import style from './style.css';

class InputForm extends Component {
  static propTypes = {
    center: PropTypes.object,
    containedIn: PropTypes.string,
    inZone: PropTypes.bool.isRequired,
    nearbyShelters: PropTypes.array,
    rawLocation: PropTypes.object.isRequired,
    setCenter: PropTypes.func.isRequired,
    setRawLocation: PropTypes.func.isRequired,
    setWaiting: PropTypes.func.isRequired,
    waitingEval: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      processedInput: false,
      previousInput: '',
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.rawLocation !== this.props.rawLocation) {
      this.updateInputLocation(newProps.rawLocation);
    }
  }

  getGeolocation() {
    this.props.setWaiting(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const google = window.google;
      const { ga, mixpanel } = window;
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
      if (ga) {
        ga('send', 'event', 'button', 'submit', 'found address by location');
      }
      if (mixpanel) {
        mixpanel.track('found address by location');
      }
      this.props.setWaiting(false);
      this.geoBtn.blur();
    });
  }

  getAddressLocation(event) {
    event.preventDefault();
    this.props.setWaiting(true);
    this.mapInput.blur();
    const address = this.mapInput.value;
    const google = window.google;
    const { ga, mixpanel } = window;
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
        this.props.setWaiting(false);
      });
    }
    if (ga) {
      ga('send', 'event', 'input', 'submit', 'found address by text input');
    }
    if (mixpanel) {
      mixpanel.track('found address by text input');
    }
  }

  updateInputLocation(newAddress) {
    this.mapInput.value = newAddress.string;
    this.setState({
      processedInput: true,
    });
  }

  clearInput() {
    const { processedInput } = this.state;
    const { ga, mixpanel } = window;
    if (processedInput) {
      this.setState({
        previousInput: this.mapInput.value,
        processedInput: false,
      });
      this.mapInput.value = '';
    }
    if (ga) {
      ga('send', 'event', 'input', 'focus', 'address bar');
    }
    if (mixpanel) {
      mixpanel.track('focused address input');
    }
  }

  fillInput() {
    const { previousInput } = this.state;
    const { ga, mixpanel } = window;
    if (this.mapInput.value === '') {
      this.mapInput.value = previousInput;
      this.setState({
        processedInput: true,
      });
      if (ga) {
        ga('send', 'event', 'input', 'refocus', 'address bar');
      }
      if (mixpanel) {
        mixpanel.track('refocused address input');
      }
    }
  }

  handleDirections() {
    const { ga, mixpanel } = window;
    if (ga) {
      ga('send', 'event', 'link', 'click', 'directions to shelter');
    }
    if (mixpanel) {
      mixpanel.track('clicked directions to shelter');
    }
  }

  render() {
    const {
      center,
      containedIn,
      inZone,
      nearbyShelters,
      rawLocation,
    } = this.props;
    const iosApp = window.navigator.standalone;
    const ios = window.navigator.userAgent.match(/iPhone|iPad|iPod/g);
    const outputMessage = inZone
    ? `In evac zone ${containedIn} - nearby shelters`
    : 'Not in an evac zone';
    return (
      <div className={iosApp ? style.inAppMode : style.webMode} aria-level='1'>
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
                  onFocus={this.clearInput.bind(this)}
                  onBlur={this.fillInput.bind(this)}
                  tabIndex='1'
                />
              </form>
              {(window && 'geolocation' in window.navigator) && (
                <button
                  aria-label='Find by location'
                  className={style.geolocate}
                  onClick={this.getGeolocation.bind(this)}
                  ref={(c) => { this.geoBtn = c; }}
                  tabIndex='1'
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
            {inZone && (
              <div className={style.shelters}>
                {nearbyShelters.map((shelter, index) => {
                  const coords = shelter.the_geom.coordinates;
                  return (
                    <div
                      className={style.shelter}
                      key={index}
                    >
                      <div className={style.shelterInfo}>
                        <b className={style.streetAddress}>
                          {shelter.bldg_add}
                        </b>
                        {/* eslint-disable max-len */}
                        <i className={style.district}>{shelter.city}, {shelter.state} {parseInt(shelter.zip_code, 10)}</i>
                        <span className={style.distance} aria-label='distance'>
                          {shelter.distance.toFixed(2)} <abbr title='miles'>mi</abbr>
                        </span>
                        {/* eslint-enable max-len */}
                      </div>
                      {/* eslint-disable max-len */}
                      <a
                        aria-label={`get directions to shelter at ${shelter.address} ${shelter.city}, ${shelter.state}`}
                        className={style.directions}
                        href={ios
                          ? `http://maps.apple.com/?daddr=${coords[1]},${coords[0]}&saddr=${center.lat},${center.long}`
                          : `https://maps.google.com/?daddr=${coords[1]},${coords[0]}&saddr=${center.lat},${center.long}`
                        }
                        onClick={this.handleDirections.bind(this)}
                        rel='noopener noreferrer'
                        target='_blank'
                        tabIndex='1'
                      />
                      {/* eslint-enable max-len */}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    center: state.mapStatus.center,
    containedIn: state.mapStatus.containedIn,
    inZone: state.mapStatus.inZone,
    rawLocation: state.mapStatus.rawLocation,
    waitingEval: state.mapStatus.waitingEval,
    nearbyShelters: state.mapStatus.nearbyShelters,
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
    setWaiting: (bool) => {
      dispatch(setWaiting(bool));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputForm);
