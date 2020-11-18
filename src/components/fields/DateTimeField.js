import React from 'react';
import {DatePicker} from 'antd';
import PropTypes from 'prop-types';
import Field from './Field';
import moment from 'moment';

DateTimeField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  setFieldValue: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default function DateTimeField({name, value, setFieldValue, label}) {
  const onChange = value => {
    const timestamp = value !== null ? new Date(value).getTime() : null;
    setFieldValue(name, timestamp);
  };

  return (
    <Field name={name} label={label} labelBottomMargin={true}>

      <DatePicker id={name}
                  showTime={true}
                  size="large"
                  onChange={onChange}
                  value={value && moment(value)}
                  className="fullWidth"/>
    </Field>
  );
}
