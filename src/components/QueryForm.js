import React from 'react';
import moment from 'moment';
import {Formik, Form} from 'formik';
import {Button} from 'antd';

import SliderField from './fields/SliderField';
import RangeSliderField from './fields/RangeSliderField';
import DateTimeField from './fields/DateTimeField';

import './QueryForm.css';

export default function QueryForm() {
  const initialValues = {
    limit: 200,
    minMagnitude: 0.0,
    maxMagnitude: 10.0,
    startDateTime: moment().subtract(1, 'days').toDate(),
    endDateTime: new Date(),
    minDepth: -100,
    maxDepth: 1000,
    // enableLocation: false,
    // minLatitude: -90,
    // maxLatitude: 90,
    // minLongitude: -180,
    // maxLongitude: 180,
    // radius: 20_000
  };

  const onSubmit = values => console.log(values);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
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

            <div className="field">
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
