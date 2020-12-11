import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';

const querySlice = createSlice({
  name: 'query',
  initialState: {
    limit: 200,
    minMagnitude: 0.0,
    maxMagnitude: 10.0,
    startDateTime: moment().subtract(1, 'days').toDate().getTime(),
    endDateTime: Date.now(),
    minDepth: -100,
    maxDepth: 1000,
    latitude: undefined,
    longitude: undefined,
    radius: undefined
  },
  reducers: {
    updateQuery(state, action) {
      return action.payload;
    }
  }
});

export const getQuery = state => state.query;

export const {updateQuery} = querySlice.actions;

export default querySlice.reducer;
