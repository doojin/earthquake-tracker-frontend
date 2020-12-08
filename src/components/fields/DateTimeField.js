import React from 'react';
import {DatePicker} from 'antd';
import PropTypes from 'prop-types';
import Field from './Field';
import moment from 'moment';
import {normalizeValue} from '../../utils/form';
import { useTranslation } from 'react-i18next';

DateTimeField.propTypes = {
  name: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  label: PropTypes.string
};

export default function DateTimeField({name, formik, label}) {
  const {t} = useTranslation('translation');

  const onChange = value => {
    const timestamp = normalizeValue(value) !== undefined ? 
      new Date(value).getTime() : 
      undefined;
      
    formik.setFieldValue(name, timestamp);
    formik.setFieldTouched(name);
  };

  return (
    <Field name={name} label={label} formik={formik} labelBottomMargin={true}>

      <DatePicker id={name}
                  showTime={true}
                  size="large"
                  placeholder={t('select.date')}
                  onChange={onChange}
                  value={formik.values[name] && moment(formik.values[name])}
                  className="fullWidth"/>
    </Field>
  );
}
