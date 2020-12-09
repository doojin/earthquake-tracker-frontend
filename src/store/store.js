import { configureStore } from '@reduxjs/toolkit';
import earthquakesReducer from './slices/earthquakesSlice';
import queryReducer from './slices/querySlice';
import requestsReducer from './slices/requestsSlice';
import languageSlice from './slices/languageSlice';

export default configureStore({
  reducer: {
    earthquakes: earthquakesReducer,
    query: queryReducer,
    requests: requestsReducer,
    language: languageSlice
  }
});
