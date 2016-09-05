import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import geolib from 'geolib';
import {
  setInZone,
  setRawLocation,
} from '../../actions/mapStatus';
import { getZones } from '../../actions/zones';
import { getShelters } from '../../actions/shelters';
import mapStyle from '../../utils/mapStyle.js';
import style from './style.css';

class Map extends Component {
  static propTypes = {
    rawLocation: PropTypes.object.isRequired,
    center: PropTypes.object.isRequired,
    shelters: PropTypes.object.isRequired,
    zones: PropTypes.object.isRequired,
    setInZone: PropTypes.func.isRequired,
    setRawLocation: PropTypes.func.isRequired,
    getZones: PropTypes.func.isRequired,
    getShelters: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      map: null
    };
  }

  componentDidMount() {
    this.mountMaps();
  }

  componentWillReceiveProps(nextProps) {
    const { shelters, zones, center } = this.props;
    const nextShelters = nextProps.shelters;
    const nextZones = nextProps.zones;
    const nextCenter = nextProps.center;
    if (nextShelters.locations !== shelters.locations) {
      this.addSheltersToMap(nextShelters.locations);
    }
    if (nextZones.locations !== zones.locations) {
      this.addZonesToMap(nextZones.locations);
    }
    if (nextCenter !== center) {
      this.shiftCenter(nextCenter);
    }
  }

  addSheltersToMap(shelters) {
    const google = window.google;
    for (let i = 0; i < shelters.length; i++) {
      const shelter = shelters[i];
      const coords = shelter.geometry.coordinates;
      const googCoords = new google.maps.LatLng(coords[0], coords[1]);
      const marker = new google.maps.Marker({
        position: googCoords,
        title: shelter.properties.ec_name,
      });
      marker.setMap(this.mapView);
    }
  }

  addZonesToMap(zones) {
    for (let i = 0; i < zones.length; i++) {
      const zone = zones[i];
      this.mapView.data.addGeoJson(zone);
    }
    this.mapView.data.setStyle((feature) => {
      const level = feature.getProperty('hurricane');
      let fill;
      if (level === '1') {
        fill = '#181D47';
      } else if (level === '2') {
        fill = '#003566';
      } else if (level === '3') {
        fill = '#296399';
      } else if (level === '4') {
        fill = '#6193C2';
      } else if (level === '5') {
        fill = '#75B2EB';
      } else if (level === '6') {
        fill = '#C2E1FF';
      }
      return ({
        visible: !(level === '0' || level === 'X'),
        strokeWeight: 1,
        strokeOpacity: 0.5,
        fillColor: fill,
        fillOpacity: 0.8,
      });
    });
  }

  shiftCenter(center) {
    const google = window.google;
    const googCords = new google.maps.LatLng(center.lat, center.long);
    this.mapView.panTo(googCords);
    this.zoneCheck(
      center.lat,
      center.long
    );
  }

  zoneCheck(latitude, longitude) {
    const { zones } = this.props;
    for (let i = 0; i < zones.locations.length; i++) {
      const zone = zones.locations[i];
      for (let j = 0; j < zone.geometry.coordinates.length; j++) {
        const poly = zone.geometry.coordinates[j];
        const polyFormatted = [];
        for (let k = 0; k < poly[0].length; k++) {
          const formattedCords = {
            latitude: poly[0][k][0],
            longitude: poly[0][k][1],
          };
          polyFormatted.push(formattedCords);
        }
        const isInside = geolib.isPointInside(
          {
            latitude,
            longitude,
          },
          polyFormatted
        );
        if (isInside) {
          this.props.setInZone(true, zone.properites.hurricane);
          return;
        }
      }
    }
    this.props.setInZone(false);
  }

  handleCenterChange() {
    const currentCenter = this.mapView.getCenter();
    this.centerMarker.setPosition(currentCenter);
  }

  mountMaps() {
    const mapScriptDom = document.getElementById('mapScript');
    if (!mapScriptDom) {
      const mapScript = document.createElement('script');
      mapScript.async = true;
      mapScript.defer = true;
      // eslint-disable-next-line max-len
      mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBV8YGyqSOPSK428_DvRl3c-9Afv_j46Jg';
      mapScript.onload = () => {
        this.initMap();
      };
      document.body.appendChild(mapScript);
    }
  }

  initMap() {
    const google = window.google;
    const { center } = this.props;
    const startCenter = new google.maps.LatLng(
      center.lat,
      center.lng
    );

    this.mapView = new google.maps.Map(
      document.getElementById('map'),
      {
        center: startCenter,
        zoom: window.innerWidth > 600 ? 14 : 12,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
        },
        panControl: false,
        mapTypeId: 'roadmap',
        styles: mapStyle,
      }
    );
    const mapView = this.mapView;
    this.props.getZones();
    this.props.getShelters();

    this.centerMarker = new google.maps.Marker({
      postition: startCenter,
      map: mapView,
    });

    // Google Maps View
    google.maps.event.addListener(mapView, 'center_changed', () => {
      this.handleCenterChange();
    });

    window.addEventListener('resize', () => {
      const mapCenter = mapView.getCenter();
      google.maps.event.trigger(mapView, 'resize');
      mapView.setCenter(mapCenter);
    });
  }

  render() {
    return (
      <div className={style.mapContainer}>
        <div
          className={style.mapView}
          id='map'
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rawLocation: state.mapStatus.rawLocation,
    center: state.mapStatus.center,
    shelters: state.shelters,
    zones: state.zones,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setInZone: (inZone, zone) => {
      dispatch(setInZone(inZone, zone));
    },
    setRawLocation: (string, type) => {
      dispatch(setRawLocation(string, type));
    },
    getZones: () => {
      dispatch(getZones());
    },
    getShelters: () => {
      dispatch(getShelters());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
