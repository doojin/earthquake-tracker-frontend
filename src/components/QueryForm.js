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
      .min(100, t('limit.error.minimal', {amount: 100}))
      .max(1000, t('limit.error.maximum', {amount: 1000})),
    minMagnitude: Yup
      .number()
      .typeError(t('min.magnitude.error.invalid.number'))
      .min(0, t('magnitude.error.minimal', {amount: 0}))
      .max(10, t('magnitude.error.maximal', {amount: 10}))
      .when('maxMagnitude', (maxMagnitude, schema) => {
        return !isNaN(maxMagnitude) ?
          schema.max(maxMagnitude, t('min.magnitude.error.min.greater.than.max')) :
          schema;
      }),
      maxMagnitude: Yup
        .number()
        .typeError(t('max.magnitude.error.invalid.number'))
        .min(0, t('magnitude.error.minimal', {amount: 0}))
        .max(10, t('magnitude.error.maximal', {amount: 10})),
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
        .min(-100, t('depth.error.minimum', {amount: -100}))
        .max(1000, t('depth.error.maximum', {amount: 1000}))
        .when('maxDepth', (maxDepth, schema) => {
          return maxDepth ?
            schema.max(maxDepth, t('min.depth.error.greater.than.max')) :
            schema;
        }),
      maxDepth: Yup
        .number()
        .typeError(t('max.depth.error.invalid.number'))
        .min(-100, t('depth.error.minimum', {amount: -100}))
        .max(1000, t('depth.error.maximum', {amount: 1000})),
      latitude: Yup
        .number()
        .typeError(t('latitude.error.invalid.number'))
        .min(-90, t('latitude.error.minimum', {amount: -90}))
        .max(90, t('latitude.error.maximum', {amount: 90}))
        .test(null, t('location.fields.bind'), function (latitude) {
          const {longitude, radius} = this.parent;
          return latitude !== undefined || (longitude === undefined && radius === undefined);
        }),
      longitude: Yup
        .number()
        .typeError(t('longitude.error.invalid.number'))
        .min(-180, t('longitude.error.minimum', {amount: -180}))
        .max(180, t('longitude.error.maximum', {amount: 180}))
        .test(null, t('location.fields.bind'), function (longitude) {
          const {latitude, radius} = this.parent;
          return longitude !== undefined || (latitude === undefined && radius === undefined);
        }),
      radius: Yup
        .number()
        .typeError(t('radius.error.invalid.number'))
        .min(0, t('radius.error.minimum', {amount: 0}))
        .max(20_000, t('radius.error.maximum', {amount: 20_000}))
        .test(null, t('location.fields.bind'), function (radius) {
          const {latitude, longitude} = this.parent;
          return radius !== undefined || (latitude === undefined && longitude === undefined);
        })
  });

  return (
    <Formik initialValues={query}
            initialTouched={{ latitude: true, longitude: true, radius: true }}
            validationSchema={schema}
            onSubmit={values => dispatch(updateQuery(values))}>
      {
        formik => (
          <Form className="QueryForm">

            <SliderField name="limit"
                         formik={formik}
                         label={t('limit')}
                         min={100}
                         max={1000}
                         step={50}/>

            <RangeSliderField minValueName="minMagnitude"
                              maxValueName="maxMagnitude"
                              formik={formik}
                              label={t('magnitude')}
                              min={0}
                              max={10}
                              step={0.5}/>

            <DateTimeField name="startDateTime"
                           formik={formik}
                           label={t('start.date.time')}/>

            <DateTimeField name="endDateTime"
                           formik={formik}
                           label={t('end.date.time')}/>

            <RangeSliderField minValueName="minDepth"
                              maxValueName="maxDepth"
                              formik={formik}
                              label={t('depth.km')}
                              min={-100}
                              max={1000}
                              step={50}/>

            <SliderField name="latitude"
                         formik={formik}
                         label={t('latitude')}
                         min={-90}
                         max={90}
                         step={1}/>

            <SliderField name="longitude"
                         formik={formik}
                         label={t('longitude')}
                         min={-180}
                         max={180}
                         step={1}/>

            <SliderField name="radius"
                         formik={formik}
                         label={t('radius.km')}
                         min={0}
                         max={20_000}
                         step={1}/>

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
