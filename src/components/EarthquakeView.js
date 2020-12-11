import React from 'react';
import {useSelector} from 'react-redux';
import EarthquakeMap from './EarthquakeMap';
import {getAllEarthquakes} from '../store/slices/earthquakesSlice';

export default function EarthquakeView() {
  const earthquakes = useSelector(getAllEarthquakes);
  return <EarthquakeMap earthquakes={ earthquakes } center={{ latitude: 30, longitude: -85 }}/>;
}
