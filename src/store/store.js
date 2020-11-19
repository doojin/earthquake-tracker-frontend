import { configureStore } from '@reduxjs/toolkit';
import earthquakesReducer from './slices/earthquakesSlice';
import queryReducer from './slices/querySlice';
import requestsReducer from './slices/requestsSlice';

export default configureStore({
  reducer: {
    earthquakes: earthquakesReducer,
    query: queryReducer,
    requests: requestsReducer
  }
});
