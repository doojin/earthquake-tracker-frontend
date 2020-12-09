import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {getLocale} from '../store/slices/languageSlice';
import {useSelector} from 'react-redux';

RelativeDate.propTypes = {
  timestamp: PropTypes.number.isRequired
};

export default function RelativeDate({ timestamp }) {
  const {t} = useTranslation('translation');
  const locale = useSelector(getLocale);

  return (
    <span>
      {formatDistanceToNow(timestamp, {locale})} {t('ago')}
    </span>
  );
};
