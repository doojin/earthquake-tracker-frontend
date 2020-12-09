import {createSlice} from '@reduxjs/toolkit';

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

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
