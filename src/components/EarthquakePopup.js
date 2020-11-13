import React from 'react';
import PropTypes from 'prop-types';
import { InfoWindow } from '@react-google-maps/api';
import EarthquakeDescription from './EarthquakeDescription';

EarthquakePopup.propTypes = {
  earthquake: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  active: PropTypes.bool
};

EarthquakePopup.defaultProps = {
  active: false
};

export default function EarthquakePopup({ earthquake, active, onClose }) {
  const { latitude, longitude } = earthquake.position;

  const popup =
    <InfoWindow position={{ lat: latitude, lng: longitude }}
                onCloseClick={() => onClose && onClose()}>

      <EarthquakeDescription timestamp={ earthquake.timestamp }
                             title={ earthquake.title }
                             latitude={ latitude }
                             longitude={ longitude }
                             magnitude={ earthquake.magnitude } />
    </InfoWindow>;

  return active ? popup : null;
}
