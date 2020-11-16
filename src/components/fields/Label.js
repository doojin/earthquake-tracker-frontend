import React from 'react';
import PropTypes from 'prop-types';
import './Label.css';

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default function Label({ htmlFor, text }) {
  return (
    <label htmlFor={htmlFor} className="Label">
      { text }
    </label>
  );
}
