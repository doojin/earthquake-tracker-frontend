import React from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import EarthquakeMarker from './EarthquakeMarker';
import './EarthquakeMap.css';
import PropTypes from 'prop-types';

EarthquakeMap.propTypes = {
  earthquakes: PropTypes.array.isRequired,
  apiKey: PropTypes.string.isRequired
};

EarthquakeMap.defaultProps = {
  earthquakes: []
};

const createEarthquakeMarkers = earthquakes => {
  return earthquakes.map(earthquake =>
    <EarthquakeMarker key={ earthquake.id } earthquake={ earthquake } />
  );
};

export default function EarthquakeMap(props) {
  const markers = createEarthquakeMarkers(props.earthquakes);

  return (
    <LoadScript googleMapsApiKey={ props.apiKey }>
      <GoogleMap mapContainerClassName="EarthquakeMapContainer" center={{ lat: 30, lng: -80 }} zoom={ 4 }>
        { markers }
      </GoogleMap>
    </LoadScript>
  );
};
