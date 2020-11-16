import earthquakesReducer, { getAllEarthquakes, fetchEarthquakes } from './earthquakesSlice';

describe('earthquakes slice', () => {
  describe('getAllEarthquakes', () => {
    let state = {
      earthquakes: [
        'earthquake1',
        'earthquake2'
      ]
    };

    test('returns array of earthquakes', () => {
      expect(getAllEarthquakes(state)).toEqual(['earthquake1', 'earthquake2']);
    });
  });

  describe('fetchEarthquakes', () => {
    test('updates earthquakes', () => {
      const action = fetchEarthquakes.fulfilled(['earthquake1', 'earthquake2']);

      const updatedState = earthquakesReducer([], action);

      expect(updatedState).toEqual(['earthquake1', 'earthquake2']);
    });
  });
});
