import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

RelativeDate.propTypes = {
  timestamp: PropTypes.number.isRequired
};

export default function RelativeDate({ timestamp }) {
  return (
    <span>
      { formatDistanceToNow(timestamp) } ago
    </span>
  );
};
