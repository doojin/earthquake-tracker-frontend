import {createSlice} from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    lang: 'en'
  },
  reducers: {
    setLanguage(state, action) {
      state.lang = action.payload;
    }
  }
});

export const getLanguage = state => state.language.lang;

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
