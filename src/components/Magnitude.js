import React from 'react';
import {Badge} from 'antd';
import PropTypes from 'prop-types';

Magnitude.propTypes = {
  magnitude: PropTypes.number.isRequired,
  toFixed: PropTypes.number
};

export default function Magnitude({ magnitude, toFixed }) {
  let background = '#00910c';

  if (magnitude > 3) {
    background = '#968200';
  }

  if (magnitude > 5) {
    background = 'rgb(157, 35, 35)';
  }

  if (toFixed) {
    magnitude = magnitude.toFixed(toFixed);
  }

  return <Badge count={magnitude} style={{backgroundColor: background}}/>;
}
