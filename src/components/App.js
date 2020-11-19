import React, { useEffect } from 'react';
import EarthquakeMap from './EarthquakeMap';
import Container from './Container';
import { getAllEarthquakes, fetchEarthquakes } from '../store/slices/earthquakesSlice';
import { getQuery } from '../store/slices/querySlice';
import { useSelector, useDispatch } from 'react-redux';
import QueryForm from './QueryForm';
import DataLoadingIndicator from './DataLoadingIndicator';
import 'antd/dist/antd.less';
import './App.less';

// TODO: once query form is implemented: add unit tests
function App() {
  // TODO: verify what to do with this key
  const API_KEY = 'AIzaSyDMVX2ME7QpqJWf6hGmGoNY7wqTHJFO9wo';

  const dispatch = useDispatch();
  const query = useSelector(getQuery);
  const earthquakes = useSelector(getAllEarthquakes);

  useEffect(() => dispatch(fetchEarthquakes(query)), [dispatch, query]);

  const earthquakeMap = (
    <EarthquakeMap earthquakes={ earthquakes }
                   apiKey={ API_KEY }
                   center={{ latitude: 30, longitude: -85 }}/>
  );

  return (
    <React.Fragment>
      <DataLoadingIndicator/>
      <Container leftColumn={{ size: 3, className: 'queryForm', children: <QueryForm/> }}
                 rightColumn={{ size: 9, className: 'earthquakeMap', children: earthquakeMap }}/>
    </React.Fragment>
  );
}

export default App;
