import React from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';

Magnitude.propTypes = {
  magnitude: PropTypes.number.isRequired
};

export default function Magnitude({ magnitude }) {
  let variant = 'success';

  if (magnitude > 3) {
    variant = 'warning';
  }

  if (magnitude > 5) {
    variant = 'danger';
  }

  return (
    <Badge pill variant={ variant }>
      { magnitude }
    </Badge>
  );
}
