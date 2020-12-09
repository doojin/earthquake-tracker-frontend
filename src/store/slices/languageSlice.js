import {createSlice} from '@reduxjs/toolkit';
import {enUS as enDateLocale, ru as ruDateLocale} from 'date-fns/locale';
import enAntdLocale from 'antd/lib/locale/en_US';
import ruAntdLocale from 'antd/lib/locale/ru_RU';

const dateLocales = {
  en: enDateLocale,
  ru: ruDateLocale
};

const antdLocales = {
  en: enAntdLocale,
  ru: ruAntdLocale
};

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    lang: 'en',
    dateLocale: enDateLocale,
    antdLocale: enAntdLocale
  },
  reducers: {
    setLanguage(state, action) {
      state.lang = action.payload;
      state.dateLocale = dateLocales[action.payload];
      state.antdLocale = antdLocales[action.payload];
    }
  }
});

export const getLanguage = state => state.language.lang;
export const getDateLocale = state => state.language.dateLocale;
export const getAntdLocale = state => state.language.antdLocale;

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
