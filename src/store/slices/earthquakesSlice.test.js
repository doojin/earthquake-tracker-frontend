import earthquakesReducer, {
  getAllEarthquakes,
  fetchEarthquakes,
  getActiveEarthquakeId,
  setActiveEarthquake,
  removeActiveEarthquake
} from './earthquakesSlice';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {getEarthquakes} from '../../api/earthquakesApi';
import {toast} from 'react-toastify';

jest.mock('../../api/earthquakesApi', () => ({
  getEarthquakes: jest.fn()
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn()
  }
}));

describe('earthquakes slice', () => {
  describe('getAllEarthquakes', () => {
    let state = {
      earthquakes: {
        items: [
          'earthquake1',
          'earthquake2'
        ]
      }
    };

    test('returns array of earthquakes', () => {
      expect(getAllEarthquakes(state)).toEqual(['earthquake1', 'earthquake2']);
    });
  });

  describe('getActiveEarthquakeId', () => {
    let state;

    beforeEach(() => {
      state = {
        earthquakes: {
          active: 'testEarthquakeId'
        }
      };
    });

    test('returns active earthquake id', () => {
      expect(getActiveEarthquakeId(state)).toEqual('testEarthquakeId');
    });
  });

  describe('setActiveEarthquake', () => {
    let state;

    beforeEach(() => {
      state = {
        active: 'earthquake1'
      };
    });

    test('updates active earthquake id', () => {
      const updatedState = earthquakesReducer(state, setActiveEarthquake('earthquake2'));

      expect(updatedState).toEqual({
        active: 'earthquake2'
      });
    });
  });

  describe('removeActiveEarthquake', () => {
    let state;

    beforeEach(() => {
      state = {
        active: 'earthquake1'
      };
    });

    test('removes active earthquake id', () => {
      const updatedState = earthquakesReducer(state, removeActiveEarthquake());

      expect(updatedState).toEqual({
        active: null
      });
    });
  });

  describe('fetchEarthquakes', () => {
    test('updates earthquakes', () => {
      const action = fetchEarthquakes.fulfilled(['earthquake1', 'earthquake2']);

      const updatedState = earthquakesReducer({
        items: [],
        active: null
      }, action);

      expect(updatedState).toEqual({
        items: ['earthquake1', 'earthquake2'],
        active: null
      });
    });

    test('fetches earthquakes through earthquake api', async () => {
      const store = configureStore([thunk])({
        items: [],
        active: null
      });

      const query = {};

      await store.dispatch(fetchEarthquakes(query));

      expect(getEarthquakes).toHaveBeenCalledTimes(1);
      expect(getEarthquakes).toHaveBeenCalledWith(query);
    });

    test('cleans earthquakes when started fetching', () => {
      expect(earthquakesReducer({
        items: ['earthquake'],
        active: null
      }, fetchEarthquakes.pending())).toEqual({
        items: [],
        active: null
      });
    });

    test('cleans active earthquake when started fetching', () => {
      expect(earthquakesReducer({
        items: [],
        active: 'notNull'
      }, fetchEarthquakes.pending())).toEqual({
        items: [],
        active: null
      });
    });

    test('cleans active earthquake when finished fetching', () => {
      expect(earthquakesReducer({
        items: [],
        active: 'notNull'
      }, fetchEarthquakes.fulfilled([]))).toEqual({
        items: [],
        active: null
      });
    });

    test('shows error notification when failed fetching', () => {
      earthquakesReducer({}, fetchEarthquakes.rejected());

      expect(toast.error).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith('failed.to.load.earthquakes');
    });
  });
});
