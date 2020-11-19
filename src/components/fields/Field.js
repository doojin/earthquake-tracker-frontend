import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';
import './Field.less';

Field.propTypes = {
  label: PropTypes.string,
  labelBottomMargin: PropTypes.bool,
  name: PropTypes.string.isRequired
};

Field.defaultProps = {
  labelBottomMargin: false
};

export default function Field({ children, name, label, labelBottomMargin }) {
  const inputLabel = label && (
    <Label htmlFor={name}
           text={label}
           bottomMargin={labelBottomMargin}/>
  );

  return (
    <div className="Field">
      { inputLabel }
      { children }
    </div>
  );
}
