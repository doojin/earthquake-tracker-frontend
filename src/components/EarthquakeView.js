import React from 'react';
import {useSelector} from 'react-redux';
import EarthquakeMap from './EarthquakeMap';
import {getAllEarthquakes} from '../store/slices/earthquakesSlice';
import {Tabs} from 'antd';
import {useTranslation} from 'react-i18next';
import './EarthquakeView.less';

export default function EarthquakeView() {
  const earthquakes = useSelector(getAllEarthquakes);
  const {t} = useTranslation('translation');

  return (
    <Tabs className="EarthquakeView">
      <Tabs.TabPane tab={t('earthquakes.map')} className="EarthquakeMapTab" key="earthquakeMap">
        <EarthquakeMap earthquakes={earthquakes} center={{latitude: 30, longitude: -85}}/>
      </Tabs.TabPane>
      <Tabs.TabPane tab={t('earthquakes.table')} key="earthquakeTable">
        table
      </Tabs.TabPane>
    </Tabs>
  );
}
