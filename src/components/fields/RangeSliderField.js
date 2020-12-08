import React from 'react';
import PropTypes from 'prop-types';
import {InputNumber, Slider} from 'antd';
import Field from './Field';
import {normalizeValue} from '../../utils/form';

RangeSliderField.propTypes = {
  label: PropTypes.string,
  minValueName: PropTypes.string.isRequired,
  maxValueName: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired
};

export default function RangeSliderField({
    label,
    minValueName,
    maxValueName,
    formik,
    min,
    max,
    step
  }) {
  return (
    <Field label={label} name={minValueName} secondaryName={maxValueName} formik={formik}>

      <Slider min={min}
              max={max}
              step={step}
              range
              value={[formik.values[minValueName], formik.values[maxValueName]]}
              onChange={([min, max]) => {
                formik.setFieldValue(minValueName, normalizeValue(min));
                formik.setFieldValue(maxValueName, normalizeValue(max));
                formik.setFieldTouched(minValueName, true);
                formik.setFieldTouched(maxValueName, true);
              }}/>

      <InputNumber id={minValueName}
                   min={min}
                   max={max}
                   step={step}
                   value={formik.values[minValueName]}
                   onChange={value => {
                     formik.setFieldValue(minValueName, normalizeValue(value));
                     formik.setFieldTouched(minValueName, true);
                   }}/>

      <div className="floatRight">
        <InputNumber min={min}
                     max={max}
                     step={step}
                     value={formik.values[maxValueName]}
                     onChange={value => {
                       formik.setFieldValue(maxValueName, normalizeValue(value));
                       formik.setFieldTouched(maxValueName, true);
                     }}/>
      </div>
    </Field>
  );
}
