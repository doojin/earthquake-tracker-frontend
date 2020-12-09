import React from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import EarthquakeMarker from './EarthquakeMarker';
import './EarthquakeMap.less';
import {removeActiveEarthquake} from '../store/slices/earthquakesSlice';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage} from '../store/slices/languageSlice';

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

export default function EarthquakeMap({ earthquakes, apiKey }) {
  const markers = createEarthquakeMarkers(earthquakes);
  const dispatch = useDispatch();
  const language = useSelector(getLanguage);

  return (
    <LoadScript googleMapsApiKey={ apiKey } language={ language }>
      <GoogleMap mapContainerClassName="EarthquakeMapContainer"
                 center={{ lat: 30, lng: -80 }}
                 zoom={ 3 }
                 options={{ streetViewControl: false, mapTypeControl: false }}
                 onClick={() => dispatch(removeActiveEarthquake())}>
        { markers }
      </GoogleMap>
    </LoadScript>
  );
};
