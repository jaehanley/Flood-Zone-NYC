import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { inside, distance } from '@turf/turf';
import {
  setCenter,
  setInZone,
  setRawLocation,
  setNearby,
  setWaiting,
} from '../../actions/mapStatus';
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
    waitingEval: PropTypes.bool.isRequired,
    waitingMapLoad: PropTypes.bool.isRequired,
    setWaiting: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      dragging: false,
      programaticShift: false,
      sheltersOnMap: false,
      zonesOnMap: false,
      mapLoaded: false,
      displayMap: false,
    };
  }

  componentDidMount() {
    this.mountMaps();
  }

  componentWillReceiveProps(nextProps) {
    const { zones, center, shelters } = this.props;
    const nextZones = nextProps.zones;
    const nextCenter = nextProps.center;
    const nextShelters = nextProps.shelters;
    if (nextZones.locations !== zones.locations) {
      this.addZonesToMap(nextZones.locations);
    }
    if (shelters.locations !== nextShelters.locations) {
      this.addSheltersToMap(nextShelters.locations);
    }
    if (nextCenter !== center) {
      this.shiftCenter(nextCenter, true);
    }
  }

  /**
   * Sets the address associated with the current map center
   * @param {number} lat 
   * @param {number} lng 
   */
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

  /**
   * Adds shelters to the map
   * @typedef {{
   *  ec_name: string,
   * the_geom: {
   *  coordinates: [number, number]
   * }
   * }} shelter
   * @param {shelter[]} shelters 
   */
  addSheltersToMap(shelters) {
    const { zonesOnMap, mapLoaded } = this.state;
    const google = window.google;
    shelters.map(shelter => {
      const coords = shelter.the_geom.coordinates;
      const googCoords = new google.maps.LatLng(coords[1], coords[0]);
      const marker = new google.maps.Marker({
        position: googCoords,
        title: shelter.ec_name,
        icon: evacImg,
      });
      marker.setMap(this.mapView);
    });
    this.setState({
      sheltersOnMap: true,
      displayMap: zonesOnMap && mapLoaded
    });
    if (zonesOnMap && mapLoaded) {
      this.props.setWaiting(false);
    }
  }

  addZonesToMap(zones) {
    const { sheltersOnMap, mapLoaded } = this.state;
    zones.forEach(zone => {
      this.mapView.data.addGeoJson({
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {
            hurricane: zone.hurricane,
          },
          geometry: zone.the_geom,
        }]
      });
    });
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
        fill = '#68a8ed';
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
    this.setState({
      zonesOnMap: true,
      displayMap: sheltersOnMap && mapLoaded
    });
    if (sheltersOnMap && mapLoaded) {
      this.props.setWaiting(false);
    }
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
      const inZone = inside(point, {
        type: 'Feature',
        properties: {
          hurricane: zone.hurricane,
        },
        geometry: zone.the_geom,
      });
      if (inZone) {
        this.props.setInZone(
          true,
          zone.hurricane
        );
        this.determineDistance(latitude, longitude);
        return;
      }
    }
    this.props.setInZone(false);
  }

  /**
   * Mounts the Google Maps component
   */
  mountMaps() {
    const mapScriptDom = document.getElementById('mapScript');
    if (!mapScriptDom) {
      const mapScript = document.createElement('script');
      mapScript.async = true;
      mapScript.defer = true;
      // eslint-disable-next-line max-len
      mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.map_key}`;
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
      location.distance = distance(
        currentLocation,
        location.the_geom,
        'miles'
      );
      return location;
    });
    distanceArray.sort((a, b) => {
      return a.distance - b.distance;
    });
    distanceArray.splice(3);
    this.props.setNearby(distanceArray);
  }

  initMap() {
    const { center } = this.props;
    const { zonesOnMap, sheltersOnMap } = this.state;
    const { ga, mixpanel, google } = window;
    const startCenter = new google.maps.LatLng(
      center.lat,
      center.lng
    );

    this.setState({
      mapLoaded: true,
      displayMap: zonesOnMap && sheltersOnMap
    });
    if (zonesOnMap && sheltersOnMap) {
      this.props.setWaiting(false);
    }

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
          if (programaticShift) {
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
    const {
      dragging,
      displayMap,
    } = this.state;
    const {
      waitingEval,
    } = this.props;
    let online = true;
    const iosApp = window.navigator.standalone;
    if (window && window.onLine) {
      online = window.onLine;
    }

    return (
      <div className={style.mapContainer} aria-level='2'>
        {!online && (
          <div className={style.mapLoading}>
            <h2>Offline</h2>{
            // eslint-disable-next-line max-len
            }<p>Flood Zone NYC requires an internet connection. Please connect to the internet and try again.</p>
          </div>
        )}
        {(!displayMap && online) && (
          <div className={style.mapLoading}>
            <span className={style.mapLoadingText}>
              Loading&hellip;
            </span>
          </div>
        )}
        {online && (
          <div
            className={
              `${style.mapView} ${dragging
                ? style.active
                : ''
              } ${displayMap
                ? style.visible
                : ''
              }`
            }
            id='map'
            aria-level='2'
          />
        )}
        {(waitingEval && online) && (
          <div
            className={[
              style.loadingIndicator,
              iosApp ? style.inApp : undefined
            ].join(' ')}
          />
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
    waitingEval: state.mapStatus.waitingEval,
    waitingMapLoad: state.mapStatus.waitingMapLoad,
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
    setWaiting: (bool) => {
      dispatch(setWaiting(bool));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
