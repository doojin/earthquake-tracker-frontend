import React from 'react';
import PropTypes from 'prop-types';
import './Label.css';

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  bottomMargin: PropTypes.bool
};

export default function Label({ htmlFor, text, bottomMargin }) {
  const defaultClassNames = ['Label'];
  const bottomMarginClassNames = bottomMargin ? ['bottomMargin'] : [];
  const className = [
    ...defaultClassNames,
    ...bottomMarginClassNames].join(' ');

  return (
    <label htmlFor={htmlFor} className={className}>
      { text }
    </label>
  );
}
