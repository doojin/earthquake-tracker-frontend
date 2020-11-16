import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAllEarthquakes = state => state.earthquakes;

export const fetchEarthquakes = createAsyncThunk(
  'earthquakes/fetch',
  async () => {
    const response = await fetch('/earthquakes?limit=100');
    const json = await response.json();
    return json.data;
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
