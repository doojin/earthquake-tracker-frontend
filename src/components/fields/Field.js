import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';
import './Field.css';

Field.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default function Field({ children, label, name }) {
  const inputLabel = label && (
    <Label htmlFor={name} text={label}  />
  );

  return (
    <div className="Field">
      { inputLabel }
      { children }
    </div>
  );
}
