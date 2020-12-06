import React from 'react';
import PropTypes from 'prop-types';
import {InputNumber, Slider} from 'antd';
import Field from './Field';

SliderField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired
};

export default function SliderField({ label, name, formik, min, max, step }) {
  return (
    <Field label={label} name={name} formik={formik}>

      <Slider min={min}
              max={max}
              step={step}
              value={formik.values[name]}
              onChange={value => {
                formik.setFieldValue(name, value);
                formik.setFieldTouched(name, true);
              }}/>

      <InputNumber id={name}
                   min={min}
                   max={max}
                   step={step}
                   value={formik.values[name]}
                   onChange={value => {
                     formik.setFieldValue(name, value);
                     formik.setFieldTouched(name, true);
                   }}/>
    </Field>
  );
}
