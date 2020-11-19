import React from 'react';
import {Formik, Form} from 'formik';
import {Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {getQuery, updateQuery} from '../store/slices/querySlice';

import SliderField from './fields/SliderField';
import RangeSliderField from './fields/RangeSliderField';
import DateTimeField from './fields/DateTimeField';

import './QueryForm.css';

export default function QueryForm() {
  const query = useSelector(getQuery);
  const dispatch = useDispatch();

  return (
    <Formik initialValues={query}
            onSubmit={values => dispatch(updateQuery(values))}>
      {
        props => (
          <Form className="QueryForm">

            <SliderField name="limit"
                         value={props.values.limit}
                         setFieldValue={props.setFieldValue}
                         label="Limit:"
                         min={100}
                         max={1000}
                         step={50}/>

            <RangeSliderField minValueName="minMagnitude"
                              maxValueName="maxMagnitude"
                              minValue={props.values.minMagnitude}
                              maxValue={props.values.maxMagnitude}
                              setFieldValue={props.setFieldValue}
                              label="Magnitude:"
                              min={0}
                              max={10}
                              step={0.5}/>

            <DateTimeField name="startDateTime"
                           value={props.values.startDateTime}
                           setFieldValue={props.setFieldValue}
                           label="Start date/time:"/>

            <DateTimeField name="endDateTime"
                           value={props.values.endDateTime}
                           setFieldValue={props.setFieldValue}
                           label="End date/time:"/>

            <RangeSliderField minValueName="minDepth"
                              maxValueName="maxDepth"
                              minValue={props.values.minDepth}
                              maxValue={props.values.maxDepth}
                              setFieldValue={props.setFieldValue}
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
              <Button onClick={props.handleSubmit}>
                Search Earthquakes
              </Button>
            </div>

          </Form>
        )
      }
    </Formik>
  );
}
