import React from 'react';
import PropTypes from 'prop-types';
import {InputNumber, Slider} from 'antd';
import Field from './Field';

SliderField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired
};

export default function SliderField({ label, value, name, setFieldValue, min, max, step }) {
  return (
    <Field label={label} name={name}>

      <Slider min={min}
              max={max}
              step={step}
              value={value}
              onChange={value => setFieldValue(name, value)}/>

      <InputNumber id={name}
                   min={min}
                   max={max}
                   step={step}
                   value={value}
                   onChange={value => setFieldValue(name, value)}/>
    </Field>
  );
}
