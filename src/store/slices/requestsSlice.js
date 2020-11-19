import {createSlice} from '@reduxjs/toolkit';
import {fetchEarthquakes} from './earthquakesSlice';

const requestsSlice = createSlice({
  name: 'requests',
  initialState: {
    activeRequests: 0
  },
  reducers: {},
  extraReducers: {
    [fetchEarthquakes.pending]: state => {
      state.activeRequests++;
    },
    [fetchEarthquakes.rejected]: state => {
      state.activeRequests--;
    },
    [fetchEarthquakes.fulfilled]: state => {
      state.activeRequests--;
    }
  }
});

export const hasActiveRequests = state => state.activeRequests > 0;

export default requestsSlice.reducer;
