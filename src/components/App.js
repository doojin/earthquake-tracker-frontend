import React, { useEffect } from 'react';
import EarthquakeMap from './EarthquakeMap';
import Container from './Container';
import { getAllEarthquakes, fetchEarthquakes } from '../store/slices/earthquakesSlice';
import { getQuery } from '../store/slices/querySlice';
import { useSelector, useDispatch } from 'react-redux';
import DataLoadingIndicator from './DataLoadingIndicator';
import 'antd/dist/antd.less';
import './App.less';
import SideMenu from './SideMenu';
import {ConfigProvider} from 'antd';
import {getAntdLocale} from '../store/slices/languageSlice';

function App() {
  const API_KEY = 'AIzaSyDMVX2ME7QpqJWf6hGmGoNY7wqTHJFO9wo';

  const dispatch = useDispatch();
  const query = useSelector(getQuery);
  const antdLocale = useSelector(getAntdLocale);
  const earthquakes = useSelector(getAllEarthquakes);

  useEffect(() => dispatch(fetchEarthquakes(query)), [dispatch, query]);

  const earthquakeMap = (
    <EarthquakeMap earthquakes={ earthquakes }
                   apiKey={ API_KEY }
                   center={{ latitude: 30, longitude: -85 }}/>
  );

  return (
    <ConfigProvider locale={antdLocale}>
      test
      <DataLoadingIndicator/>
      <Container leftColumn={{ size: 6, className: 'queryForm', children: <SideMenu/> }}
                 rightColumn={{ size: 18, className: 'earthquakeMap', children: earthquakeMap }}/>
    </ConfigProvider>
  );
}

export default App;
