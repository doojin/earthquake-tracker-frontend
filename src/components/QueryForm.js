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
import { useTranslation } from 'react-i18next';

export default function QueryForm() {
  const {t} = useTranslation('translation');
  const query = useSelector(getQuery);
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    limit: Yup
      .number()
      .typeError(t('limit.error.invalid.number'))
      .min(100, `${t('limit.error.minimal')} 100`)
      .max(1000, `${t('limit.error.maximum')} 1000`),
    minMagnitude: Yup
      .number()
      .typeError(t('min.magnitude.error.invalid.number'))
      .min(0, `${t('magnitude.error.minimal')} 0`)
      .max(10, `${t('magnitude.error.maximal')} 10`)
      .when('maxMagnitude', (maxMagnitude, schema) => {
        return !isNaN(maxMagnitude) ?
          schema.max(maxMagnitude, t('min.magnitude.error.min.greater.than.max')) :
          schema;
      }),
      maxMagnitude: Yup
        .number()
        .typeError(t('max.magnitude.error.invalid.number'))
        .min(0, `${t('magnitude.error.minimal')} 0`)
        .max(10, `${t('magnitude.error.maximal')} 10`),
      startDateTime: Yup
        .number()
        .typeError(t('date.error.invalid.date'))
        .when('endDateTime', (endDateTime, schema) => {
          return !isNaN(endDateTime) ?
            schema.max(endDateTime, t('start.date.error.start.greater.than.end')) :
            schema;
        }),
      endDateTime: Yup
        .number()
        .typeError(t('date.error.invalid.date')),
      minDepth: Yup
        .number()
        .typeError(t('min.depth.error.invalid.number'))
        .min(-100, `${t('depth.error.minimum')} -100 ${t('km')}`)
        .max(1000, `${t('depth.error.maximum')} 1000 ${t('km')}`)
        .when('maxDepth', (maxDepth, schema) => {
          return maxDepth ?
            schema.max(maxDepth, t('min.depth.error.greater.than.max')) :
            schema;
        }),
      maxDepth: Yup
        .number()
        .typeError(t('max.depth.error.invalid.number'))
        .min(-100, `${t('depth.error.minimum')} -100 ${t('km')}`)
        .max(1000, `${t('depth.error.maximum')} 1000 ${t('km')}`)
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
                         label={`${t('limit')}:`}
                         min={100}
                         max={1000}
                         step={50}/>

            <RangeSliderField minValueName="minMagnitude"
                              maxValueName="maxMagnitude"
                              formik={formik}
                              label={`${t('magnitude')}:`}
                              min={0}
                              max={10}
                              step={0.5}/>

            <DateTimeField name="startDateTime"
                           formik={formik}
                           label={`${t('start.date.time')}:`}/>

            <DateTimeField name="endDateTime"
                           formik={formik}
                           label={`${t('end.date.time')}:`}/>

            <RangeSliderField minValueName="minDepth"
                              maxValueName="maxDepth"
                              formik={formik}
                              label={`${t('depth')} (${t('km')}):`}
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

            <div className="SearchButton">
              <Button onClick={formik.handleSubmit}>
                {t('search.earthquakes')}
              </Button>
            </div>

          </Form>
        )
      }
    </Formik>
  );
}
