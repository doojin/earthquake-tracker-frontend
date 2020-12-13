import React from 'react';
import {LoadScript, GoogleMap} from '@react-google-maps/api';
import EarthquakeMarker from './EarthquakeMarker';
import './EarthquakeMap.less';
import {removeActiveEarthquake} from '../store/slices/earthquakesSlice';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage} from '../store/slices/languageSlice';
import EarthquakeArea from './EarthquakesArea';

const API_KEY = 'AIzaSyDMVX2ME7QpqJWf6hGmGoNY7wqTHJFO9wo';

EarthquakeMap.propTypes = {
  earthquakes: PropTypes.array.isRequired
};

EarthquakeMap.defaultProps = {
  earthquakes: []
};

const createEarthquakeMarkers = earthquakes => {
  return earthquakes.map(earthquake =>
    <EarthquakeMarker key={ earthquake.id } earthquake={ earthquake } />
  );
};

export default function EarthquakeMap({ earthquakes }) {
  const markers = createEarthquakeMarkers(earthquakes);
  const dispatch = useDispatch();
  const language = useSelector(getLanguage);

  return (
    <LoadScript googleMapsApiKey={ API_KEY } language={ language }>
      <GoogleMap mapContainerClassName="EarthquakeMapContainer"
                 center={{ lat: 30, lng: -80 }}
                 zoom={ 3 }
                 options={{ streetViewControl: false, mapTypeControl: false }}
                 onClick={() => dispatch(removeActiveEarthquake())}>
        <EarthquakeArea />
        { markers }
      </GoogleMap>
    </LoadScript>
  );
};
