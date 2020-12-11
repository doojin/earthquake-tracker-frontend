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
import ToastContainer from './ToastContainer';
import 'react-toastify/dist/ReactToastify.css';
import EarthquakeView from './EarthquakeView';

function App() {
  const dispatch = useDispatch();
  const query = useSelector(getQuery);
  const antdLocale = useSelector(getAntdLocale);

  useEffect(() => dispatch(fetchEarthquakes(query)), [dispatch, query]);

  return (
    <ConfigProvider locale={antdLocale}>
      <DataLoadingIndicator/>
      <ToastContainer/>
      <Container leftColumn={{ size: 6, className: 'queryForm', children: <SideMenu/> }}
                 rightColumn={{ size: 18, className: 'earthquakeMap', children: <EarthquakeView/> }}/>
    </ConfigProvider>
  );
}

export default App;
