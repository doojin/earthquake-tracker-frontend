import earthquakesReducer, { getAllEarthquakes, fetchEarthquakes } from './earthquakesSlice';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getEarthquakes } from '../../api/earthquakesApi';

jest.mock('../../api/earthquakesApi', () => ({
  getEarthquakes: jest.fn()
}));

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

    test('fetches earthquakes through earthquake api', async () => {
      const store = configureStore([thunk])({});
      const query = {};

      await store.dispatch(fetchEarthquakes(query));

      expect(getEarthquakes).toHaveBeenCalledTimes(1);
      expect(getEarthquakes).toHaveBeenCalledWith(query);
    });
  });
});
