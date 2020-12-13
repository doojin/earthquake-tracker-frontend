import React from 'react';
import {useSelector} from 'react-redux';
import {Circle} from '@react-google-maps/api';
import {getLocation} from '../store/slices/querySlice';

const circleOptions = {
  strokeColor: '#fff',
  strokeWeight: 1,
  strokeOpacity: 0.5,
  fillColor: '#fff',
  fillOpacity: 0.4
};

export default function EarthquakeArea() {
  const {latitude, longitude, radius} = useSelector(getLocation);

  return latitude !== undefined && longitude !== undefined && radius !== undefined ?
    <Circle center={{lat: latitude, lng: longitude}}
            radius={radius * 1000}
            options={circleOptions}/> :
    null;
}
