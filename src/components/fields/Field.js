import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';
import FieldError from './FieldError';
import {ErrorMessage} from 'formik';
import './Field.less';

Field.propTypes = {
  label: PropTypes.string,
  labelBottomMargin: PropTypes.bool,
  name: PropTypes.string.isRequired,
  secondaryName: PropTypes.string,
  formik: PropTypes.object.isRequired
};

Field.defaultProps = {
  labelBottomMargin: false
};

export default function Field({children, name, secondaryName, formik, label, labelBottomMargin}) {
  const inputLabel = label && (
    <Label htmlFor={name}
           text={label}
           bottomMargin={labelBottomMargin}/>
  );

  const classNames = ['Field'];
  if ((formik.errors[name] && formik.touched[name]) ||
    (secondaryName && formik.errors[secondaryName] && formik.touched[secondaryName])) {
    classNames.push('Error');
  }

  const primaryError = <ErrorMessage component={FieldError} name={name}/>;

  const secondaryError = secondaryName ?
    <ErrorMessage component={FieldError} name={secondaryName}/> :
    null;

  return (
    <div className={classNames.join(' ')}>
      {inputLabel}
      {children}
      {primaryError}
      {secondaryError}
    </div>
  );
}
