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
  initialState: 'en',
  reducers: {
    setLanguage(state, action) {
      return action.payload;
    }
  }
});

export const getLanguage = state => state.language;
export const getDateLocale = state => dateLocales[state.language];
export const getAntdLocale = state => antdLocales[state.language];

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
