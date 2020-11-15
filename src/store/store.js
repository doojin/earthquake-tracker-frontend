import { configureStore } from '@reduxjs/toolkit';
import earthquakesReducer from './slices/earthquakesSlice';

export default configureStore({
  reducer: {
    earthquakes: earthquakesReducer
  }
});
