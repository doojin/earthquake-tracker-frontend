import React, { useState } from 'react';
import { Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import EarthquakePopup from './EarthquakePopup';

EarthquakeMarker.propTypes = {
  earthquake: PropTypes.object.isRequired,
};

export default function EarthquakeMarker({ earthquake }) {
  const { latitude, longitude } = earthquake.position;
  const [active, setActive] = useState(false);

  return (
    <Marker position={{ lng: longitude, lat: latitude }}
            onClick={() => setActive(true)}>

      <EarthquakePopup earthquake={ earthquake }
                       active={ active }
                       onClose={() => setActive(false)} />
    </Marker>
  );
};
