import { configureStore } from '@reduxjs/toolkit';
import earthquakesReducer from './slices/earthquakesSlice';
import queryReducer from './slices/querySlice';

export default configureStore({
  reducer: {
    earthquakes: earthquakesReducer,
    query: queryReducer
  }
});
