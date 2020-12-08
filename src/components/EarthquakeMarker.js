import React from 'react';
import {Marker} from '@react-google-maps/api';
import PropTypes from 'prop-types';
import EarthquakePopup from './EarthquakePopup';
import {useDispatch, useSelector} from 'react-redux';
import {
  setActiveEarthquake,
  getActiveEarthquakeId,
  removeActiveEarthquake
} from '../store/slices/earthquakesSlice';

EarthquakeMarker.propTypes = {
  earthquake: PropTypes.object.isRequired,
};

const getMarkerColor = earthquake => {
  if (earthquake.magnitude > 5) return 'red';
  if (earthquake.magnitude > 3) return 'yellow';
  return 'green';
};

export default function EarthquakeMarker({earthquake}) {
  const {latitude, longitude} = earthquake.position;
  const dispatch = useDispatch();
  const activeEarthquakeId = useSelector(getActiveEarthquakeId);

  const color = getMarkerColor(earthquake);
  const icon = `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;

  const active = earthquake.id === activeEarthquakeId;

  return (
    <Marker icon={icon}
            position={{lng: longitude, lat: latitude}}
            onClick={() => dispatch(setActiveEarthquake(earthquake.id))}>

      <EarthquakePopup earthquake={earthquake}
                       active={active}
                       onClose={() => dispatch(removeActiveEarthquake())}/>
    </Marker>
  );
};
