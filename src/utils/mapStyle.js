export default [
  {
    featureType: 'landscape',
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 65
      },
      {
        visibility: 'on'
      }
    ],
  },
  {
    featureType: 'road.highway',
    stylers: [
      {
        saturation: -100
      },
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 30
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 40
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        lightness: -10
      },
      {
        saturation: -100
      }
    ]
  },

  // Turn off various labels
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      }
    ]
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels',
    stylers: [
      {
        saturation: -100
      },
      {
        visibility: 'on'
      }
    ]
  },
];
