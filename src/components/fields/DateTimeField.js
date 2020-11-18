import React from 'react';
import {DatePicker} from 'antd';
import PropTypes from 'prop-types';
import Field from './Field';
import moment from 'moment';

DateTimeField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date),
  setFieldValue: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default function DateTimeField({name, value, setFieldValue, label}) {
  return (
    <Field name={name} label={label} labelBottomMargin={true}>

      <DatePicker id={name}
                  showTime={true}
                  size="large"
                  onChange={value => setFieldValue(name, value && value.toDate())}
                  value={value && moment(value)}
                  className="fullWidth"/>
    </Field>
  );
}
