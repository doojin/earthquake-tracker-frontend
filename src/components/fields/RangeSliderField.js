import React from 'react';
import PropTypes from 'prop-types';
import {InputNumber, Slider} from 'antd';
import Field from './Field';

RangeSliderField.propTypes = {
  label: PropTypes.string,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  minValueName: PropTypes.string.isRequired,
  maxValueName: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired
};

export default function RangeSliderField({
    label,
    minValue,
    maxValue,
    minValueName,
    maxValueName,
    setFieldValue,
    min,
    max,
    step
  }) {
  return (
    <Field label={label} name={minValueName}>

      <Slider min={min}
              max={max}
              step={step}
              range
              value={[minValue, maxValue]}
              onChange={([min, max]) => {
                setFieldValue(minValueName, min);
                setFieldValue(maxValueName, max);
              }}/>

      <InputNumber id={minValueName}
                   min={min}
                   max={max}
                   step={step}
                   value={minValue}
                   onChange={value => setFieldValue(minValueName, value)}/>

      <div className="floatRight">
        <InputNumber min={min}
                     max={max}
                     step={step}
                     value={maxValue}
                     onChange={value => setFieldValue(maxValueName, value)}/>
      </div>
    </Field>
  );
}
