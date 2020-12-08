import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import {enUS} from 'date-fns/locale';
import {useTranslation} from 'react-i18next';

RelativeDate.propTypes = {
  timestamp: PropTypes.number.isRequired
};

export default function RelativeDate({ timestamp }) {
  const {t} = useTranslation('translation');
  
  return (
    <span>
      {
        formatDistanceToNow(timestamp, {
          locale: enUS
        })
      } {t('ago')}
    </span>
  );
};
