import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEarthquakes } from '../../api/earthquakesApi';

export const getAllEarthquakes = state => state.earthquakes.items;
export const getActiveEarthquakeId = state => state.earthquakes.active;

export const fetchEarthquakes = createAsyncThunk(
  'earthquakes/fetch',
  async (query) => {
    return await getEarthquakes(query);
  }
);

const earthquakesSlice = createSlice({
  name: 'earthquakes',
  initialState: {
    items: [],
    active: null
  },
  reducers: {
    setActiveEarthquake(state, action) {
      state.active = action.payload;
    },
    removeActiveEarthquake(state) {
      state.active = null;
    }
  },
  extraReducers: {
    [fetchEarthquakes.pending]: state => {
      state.items = [];
      state.active = null;
    },
    [fetchEarthquakes.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.active = null;
    }
  }
});

export const {
  setActiveEarthquake,
  removeActiveEarthquake
} = earthquakesSlice.actions;

export default earthquakesSlice.reducer;
