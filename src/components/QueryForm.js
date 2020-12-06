import React from 'react';
import {Formik, Form} from 'formik';
import {Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {getQuery, updateQuery} from '../store/slices/querySlice';
import * as Yup from 'yup';

import SliderField from './fields/SliderField';
import RangeSliderField from './fields/RangeSliderField';
import DateTimeField from './fields/DateTimeField';

import './QueryForm.less';

export default function QueryForm() {
  const query = useSelector(getQuery);
  const dispatch = useDispatch();
  const schema = Yup.object().shape({
    limit: Yup
      .number()
      .typeError('Limit should be a valid number')
      .min(100, 'Minimal limit is 100')
      .max(1000, 'Maximal limit is 1000'),
    minMagnitude: Yup
      .number()
      .typeError('Minimal magnitude should be a valid number')
      .min(0, 'Minimal magnitude is 0')
      .max(5, 'Maximal magnitude is 10')
      .when('maxMagnitude', (maxMagnitude, schema) => {
        return !isNaN(maxMagnitude) ?
          schema.max(maxMagnitude, 'Minimal magnitude can\'t be grater than maximal magnitude') :
          schema;
      }),
      maxMagnitude: Yup
        .number()
        .typeError('Maximal magnitude should be a valid number')
        .min(0, 'Minimal magnitude is 0')
        .max(10, 'Maximal magnitude is 10'),
      startDateTime: Yup
        .number()
        .typeError('Valid date should be selected')
        .when('endDateTime', (endDateTime, schema) => {
          return !isNaN(endDateTime) ?
            schema.max(endDateTime, 'Start date can\'t be greater than end date') :
            schema;
        }),
      endDateTime: Yup
        .number()
        .typeError('Valid date should be selected'),
      minDepth: Yup
        .number()
        .typeError('Minimal depth should be a valid number')
        .min(-100, 'Minimal depth is -100km')
        .max(1000, 'Maximal depth is 1000km')
        .when('maxDepth', (maxDepth, schema) => {
          return maxDepth ?
            schema.max(maxDepth, 'Minimal depth can\'t be greater than maximal depth') :
            schema;
        }),
      maxDepth: Yup
        .number()
        .typeError('Maximal depth should be a valid number')
        .min(-100, 'Minimal depth is -100km')
        .max(1000, 'Maximal depth is 1000km')
  });

  return (
    <Formik initialValues={query}
            validationSchema={schema}
            onSubmit={values => dispatch(updateQuery(values))}>
      {
        formik => (
          <Form className="QueryForm">

            <SliderField name="limit"
                         formik={formik}
                         label="Limit:"
                         min={100}
                         max={1000}
                         step={50}/>

            <RangeSliderField minValueName="minMagnitude"
                              maxValueName="maxMagnitude"
                              formik={formik}
                              label="Magnitude:"
                              min={0}
                              max={10}
                              step={0.5}/>

            <DateTimeField name="startDateTime"
                           formik={formik}
                           label="Start date/time:"/>

            <DateTimeField name="endDateTime"
                           formik={formik}
                           label="End date/time:"/>

            <RangeSliderField minValueName="minDepth"
                              maxValueName="maxDepth"
                              formik={formik}
                              label="Depth (km):"
                              min={-100}
                              max={1000}
                              step={50}/>

            {/*<div className="field">*/}
            {/*  <Switch id="enableLocation"*/}
            {/*          checked={props.values.enableLocation}*/}
            {/*          onChange={value => props.setFieldValue('enableLocation', value)}*/}
            {/*          checkedChildren="Disable Location"*/}
            {/*          unCheckedChildren="Enable Location">*/}
            {/*  </Switch>*/}
            {/*</div>*/}

            <div className="field text-center">
              <Button onClick={formik.handleSubmit}>
                Search Earthquakes
              </Button>
            </div>

          </Form>
        )
      }
    </Formik>
  );
}
