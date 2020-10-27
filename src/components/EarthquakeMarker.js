import React from 'react';
import { Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';

EarthquakeMarker.propTypes = {
  earthquake: PropTypes.object.isRequired
};

export default function EarthquakeMarker(props) {
  const { longitude, latitude } = props.earthquake.position;

  return (
    <Marker position={{ lng: longitude, lat: latitude }} />
  );
};
