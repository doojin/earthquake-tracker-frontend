import {createSlice} from '@reduxjs/toolkit';
import {enUS as en, ru} from 'date-fns/locale';
import enAntdLocale from 'antd/lib/locale/en_US';
import ruAntdLocale from 'antd/lib/locale/ru_RU';

const locales = { en, ru };

const antdLocales = {
  en: enAntdLocale,
  ru: ruAntdLocale
};

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    lang: 'en',
    locale: en,
    antdLocale: enAntdLocale
  },
  reducers: {
    setLanguage(state, action) {
      state.lang = action.payload;
      state.locale = locales[action.payload];
      state.antdLocale = antdLocales[action.payload];
    }
  }
});

export const getLanguage = state => state.language.lang;
export const getLocale = state => state.language.locale;
export const getAntdLocale = state => state.language.antdLocale;

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
