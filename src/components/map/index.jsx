import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { inside, distance } from '@turf/turf';
import {
  setCenter,
  setInZone,
  setRawLocation,
  setNearby,
} from '../../actions/mapStatus';
import AdSlot from '../adSlot';
import { getZones } from '../../actions/zones';
import { getShelters } from '../../actions/shelters';
import mapStyle from '../../utils/mapStyle.js';
import style from './style.css';
import evacImg from '../../assets/img/shelter.svg';

class Map extends Component {
  static propTypes = {
    rawLocation: PropTypes.object.isRequired,
    center: PropTypes.object.isRequired,
    shelters: PropTypes.object.isRequired,
    zones: PropTypes.object.isRequired,
    setCenter: PropTypes.func.isRequired,
    setInZone: PropTypes.func.isRequired,
    setRawLocation: PropTypes.func.isRequired,
    setNearby: PropTypes.func.isRequired,
    getZones: PropTypes.func.isRequired,
    getShelters: PropTypes.func.isRequired,
    firstfound: PropTypes.bool.isRequired,
    hideAd: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      dragging: false,
      programaticShift: false,
    };
  }

  componentDidMount() {
    this.mountMaps();
  }

  componentWillReceiveProps(nextProps) {
    const { zones, center } = this.props;
    const nextZones = nextProps.zones;
    const nextCenter = nextProps.center;
    if (nextZones.locations !== zones.locations) {
      this.addZonesToMap(nextZones.locations);
    }
    if (nextCenter !== center) {
      this.shiftCenter(nextCenter, true);
    }
  }

  componentDidUpdate(prevProps) {
    const { shelters } = this.props;
    const prevShelters = prevProps.shelters;
    if (shelters.locations !== prevShelters.locations) {
      this.addSheltersToMap(shelters.locations);
    }
  }

  setMapAddress(lat, lng) {
    const google = window.google;
    if (google) {
      // eslint-disable-next-line new-parens
      const geocoder = new google.maps.Geocoder;
      geocoder.geocode(
        { location: { lat, lng } },
        (results, status) => {
          if (status === 'OK' && results[1]) {
            this.props.setRawLocation(
              results[1].formatted_address,
              'address'
            );
          } else {
            this.props.setRawLocation(
              `${lat}, ${lng}`,
              'coords'
            );
          }
        }
      );
    }
  }

  addSheltersToMap(shelters) {
    const google = window.google;
    for (let i = 0; i < shelters.length; i++) {
      const shelter = shelters[i];
      const coords = shelter.geometry.coordinates;
      const googCoords = new google.maps.LatLng(coords[1], coords[0]);
      const marker = new google.maps.Marker({
        position: googCoords,
        title: shelter.properties.ec_name,
        icon: evacImg,
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
        fill = '#2F002E';
      } else if (level === '2') {
        fill = '#09355B';
      } else if (level === '3') {
        fill = '#1D9D8F';
      } else if (level === '4') {
        fill = '#7768D7';
      } else if (level === '5') {
        fill = '#8EBDF0';
      } else if (level === '6') {
        fill = '#C9FFF9';
      }
      return ({
        visible: !(level === '0' || level === 'X' || level === '7'),
        strokeWeight: 1,
        strokeOpacity: 0.5,
        fillColor: fill,
        fillOpacity: 0.8,
      });
    });
  }

  shiftCenter(center, programaticShift = false) {
    this.setState({
      programaticShift
    });
    const google = window.google;
    const googCords = new google.maps.LatLng(center.lat, center.long);
    this.mapView.panTo(googCords);
  }

  zoneCheck(latitude, longitude) {
    const { zones } = this.props;
    const point = {
      type: 'Feature',
      properties: {
        'marker-color': '#f00'
      },
      geometry: {
        type: 'Point',
        coordinates: [
          longitude,
          latitude,
        ]
      }
    };
    for (let i = 0; i < zones.locations.length; i++) {
      const zone = zones.locations[i];
      const inZone = inside(point, zone);
      if (inZone) {
        this.props.setInZone(
          true,
          zone.properties.hurricane
        );
        this.determineDistance(latitude, longitude);
        return;
      }
    }
    this.props.setInZone(false);
  }

  mountMaps() {
    const mapScriptDom = document.getElementById('mapScript');
    if (!mapScriptDom) {
      const mapScript = document.createElement('script');
      mapScript.async = true;
      mapScript.defer = true;
      // eslint-disable-next-line max-len
      mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NODE_ENV === 'production' ? 'AIzaSyBV8YGyqSOPSK428_DvRl3c-9Afv_j46Jg' : 'AIzaSyDyX2shnNNuGz00rDCLioNsXOYA1RFMV4M'}`;
      mapScript.onload = () => {
        this.initMap();
      };
      document.body.appendChild(mapScript);
    }
  }

  determineDistance(lat, lng) {
    const { shelters } = this.props;
    const currentLocation = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    };
    const distanceArray = shelters.locations.map((location) => {
      location.properties.distance = distance(
        currentLocation,
        location,
        'miles'
      );
      return location;
    });
    distanceArray.sort((a, b) => {
      return a.properties.distance - b.properties.distance;
    });
    distanceArray.splice(3);
    this.props.setNearby(distanceArray);
  }

  initMap() {
    const { center } = this.props;
    const { ga, mixpanel, google } = window;
    const startCenter = new google.maps.LatLng(
      center.lat,
      center.lng
    );

    this.mapView = new google.maps.Map(
      document.getElementById('map'),
      {
        center: startCenter,
        zoom: 14,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        panControl: false,
        mapTypeId: 'roadmap',
        styles: mapStyle,
      }
    );
    const mapView = this.mapView;
    this.props.getZones();
    this.props.getShelters();

    this.setMapAddress(
      center.lat,
      center.lng,
    );

    // Google Maps View Events
    let centerTimeout;
    let prevCenter = {
      lat: center.lat,
      lng: center.lng,
    };
    google.maps.event.addListener(mapView, 'center_changed', () => {
      clearTimeout(centerTimeout);
      centerTimeout = setTimeout(() => {
        const { programaticShift } = this.state;
        const lat = this.mapView.getCenter().lat();
        const lng = this.mapView.getCenter().lng();
        if (prevCenter !== { lat, lng }) {
          prevCenter = { lat, lng };
          if (!programaticShift) {
            this.setMapAddress(lat, lng);
          } else {
            this.setState({
              programaticShift: false,
            });
          }
          this.props.setCenter(lat, lng);
          this.zoneCheck(lat, lng);
        }
      }, 600);
    });

    google.maps.event.addListener(mapView, 'dragstart', () => {
      this.setState({
        dragging: true,
      });
    });

    google.maps.event.addListener(mapView, 'dragend', () => {
      this.setState({
        dragging: false,
        programaticShift: false,
      });
      if (ga) {
        ga('send', 'event', 'map', 'drag');
      }
      if (mixpanel) {
        mixpanel.track('user dragged map');
      }
    });

    window.addEventListener('resize', () => {
      const mapCenter = mapView.getCenter();
      google.maps.event.trigger(mapView, 'resize');
      mapView.setCenter(mapCenter);
    });
  }

  render() {
    const { dragging } = this.state;
    const { firstfound, hideAd } = this.props;
    return (
      <div className={style.mapContainer} aria-level='2'>
        <div
          className={`${style.mapView} ${dragging ? style.active : ''}`}
          id='map'
          aria-level='2'
        />
        {(firstfound && !hideAd) && (
          <AdSlot />
        )}
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
    firstfound: state.mapStatus.firstfound,
    hideAd: state.mapStatus.hideAd,
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
    setNearby: (shelters) => {
      dispatch(setNearby(shelters));
    },
    setCenter: (lat, long) => {
      dispatch(setCenter(lat, long));
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
