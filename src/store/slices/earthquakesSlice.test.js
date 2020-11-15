import earthquakesReducer, { selectAllEarthquakes, fetchEarthquakes } from './earthquakesSlice';

describe('earthquakes slice', () => {
  describe('selectAllEarthquakes', () => {
    let state = {
      earthquakes: [
        'earthquake1',
        'earthquake2'
      ]
    };

    test('returns array of earthquakes', () => {
      expect(selectAllEarthquakes(state)).toEqual(['earthquake1', 'earthquake2']);
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
