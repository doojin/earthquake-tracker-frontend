import {createSlice} from '@reduxjs/toolkit';
import {enUS as en, ru} from 'date-fns/locale';

const locales = { en, ru };

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    lang: 'en',
    locale: en
  },
  reducers: {
    setLanguage(state, action) {
      state.lang = action.payload;
      state.locale = locales[action.payload];
    }
  }
});

export const getLanguage = state => state.language.lang;
export const getLocale = state => state.language.locale;

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
