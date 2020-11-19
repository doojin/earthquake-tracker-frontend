import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEarthquakes } from '../../api/earthquakesApi';

export const getAllEarthquakes = state => state.earthquakes;

export const fetchEarthquakes = createAsyncThunk(
  'earthquakes/fetch',
  async (query) => {
    return await getEarthquakes(query);
  }
);

const earthquakesSlice = createSlice({
  name: 'earthquakes',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchEarthquakes.fulfilled]: (state, action) => {
      return action.payload;
    }
  }
});

export default earthquakesSlice.reducer;
