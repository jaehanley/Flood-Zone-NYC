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
    setCenter: PropTypes.func.isRequired,
    setRawLocation: PropTypes.func.isRequired,
    rawLocation: PropTypes.object.isRequired,
    inZone: PropTypes.bool.isRequired,
    containedIn: PropTypes.string.isRequired,
  }

  getGeolocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const long = pos.coords.longitude;
      this.props.setCenter(lat, long);
      this.props.setRawLocation(
        `${lat}, ${long}`,
        'coords'
      );
    });
  }

  setRawString(event) {
    event.preventDefault();
    const val = event.target.value;
  }

  render() {
    const {
      rawLocation,
      inZone,
      containedIn,
    } = this.props;
    const iosApp = window.navigator.standalone;
    return (
      <div className={iosApp ? style.inAppMode : style.webMode}>
        <div className={style.searchContainer}>
          <div className={style.topView}>
            <div className={style.inputContainer}>
              <form>
                <input
                  aria-label='Search by address'
                  placeholder='Search by address'
                  type='text'
                  value={rawLocation.string || ''}
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
            <div className={style.locationStatus}>
              <span>
                {inZone
                  ? `In evac zone ${containedIn}`
                  : 'Not in an evac zone'
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rawLocation: state.mapStatus.rawLocation,
    inZone: state.mapStatus.inZone,
    containedIn: state.mapStatus.containedIn,
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
