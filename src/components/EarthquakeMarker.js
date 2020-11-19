import React, {useState} from 'react';
import {Marker} from '@react-google-maps/api';
import PropTypes from 'prop-types';
import EarthquakePopup from './EarthquakePopup';

EarthquakeMarker.propTypes = {
  earthquake: PropTypes.object.isRequired,
};

const getMarkerColor = earthquake => {
  if (earthquake.magnitude > 5) return 'red';
  if (earthquake.magnitude > 3) return 'yellow';
  return 'green';
};

export default function EarthquakeMarker({earthquake}) {
  const {latitude, longitude} = earthquake.position;
  const [active, setActive] = useState(false);

  const color = getMarkerColor(earthquake);
  const icon = `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;

  return (
    <Marker icon={icon}
            position={{lng: longitude, lat: latitude}}
            onClick={() => setActive(true)}>

      <EarthquakePopup earthquake={earthquake}
                       active={active}
                       onClose={() => setActive(false)}/>
    </Marker>
  );
};
