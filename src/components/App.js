import React, { useEffect } from 'react';
import EarthquakeMap from './EarthquakeMap';
import Container from './Container';
import { selectAllEarthquakes, fetchEarthquakes } from '../store/slices/earthquakesSlice';
import { useSelector, useDispatch } from 'react-redux';

// TODO: once query form is implemented: add unit tests
function App() {
  // TODO: verify what to do with this key
  const API_KEY = 'AIzaSyDMVX2ME7QpqJWf6hGmGoNY7wqTHJFO9wo';

  const dispatch = useDispatch();
  const earthquakes = useSelector(selectAllEarthquakes);

  useEffect(() => dispatch(fetchEarthquakes()), [dispatch]);

  const earthquakeMap = (
    <EarthquakeMap earthquakes={ earthquakes }
                   apiKey={ API_KEY }
                   center={{ latitude: 30, longitude: -85 }}/>
  );

  return (
    <Container leftColumn={{ size: 3, children: '' }}
               rightColumn={{ size: 9, children: earthquakeMap }}/>
  );
}

export default App;
