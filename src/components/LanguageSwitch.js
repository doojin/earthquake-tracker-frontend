import React, {useEffect} from 'react';
import {Select} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage, setLanguage} from '../store/slices/languageSlice';
import i18n from '../i18n';

const options = {
  en: 'English',
  ru: 'Русский'
};

export default function LanguageSwitch() {
  const dispatch = useDispatch();
  const language = useSelector(getLanguage);

  useEffect(() => {
    (async () => await i18n.changeLanguage(language))();
  }, [language]);

  const onSelectChange = language => dispatch(setLanguage(language));

  return (
    <Select value={language} onChange={onSelectChange}>
      {
        Object.entries(options).map(([key, displayValue]) =>
          <Select.Option value={key} key={key}>
            {displayValue}
          </Select.Option>
        )
      }
    </Select>
  );
}


