import requestsReducer, {hasActiveRequests} from './requestsSlice';
import {fetchEarthquakes} from './earthquakesSlice';

describe('requests slice', () => {
  describe('extra reducers', () => {
    describe('earthquakes fetch started', () => {
      test('increments count of active requests', () => {
        expect(
          requestsReducer({activeRequests: 5}, fetchEarthquakes.pending())
        ).toEqual({
          activeRequests: 6
        });
      });
    });

    describe('earthquakes fetch failed', () => {
      test('decrements count of active requests', () => {
        expect(
          requestsReducer({activeRequests: 5}, fetchEarthquakes.rejected())
        ).toEqual({
          activeRequests: 4
        });
      });
    });

    describe('earthquakes fetch succeeded', () => {
      test('decrements count of active requests', () => {
        expect(
          requestsReducer({activeRequests: 5}, fetchEarthquakes.fulfilled())
        ).toEqual({
          activeRequests: 4
        });
      });
    });
  });

  describe('hasActiveRequests', () => {
    let state;

    describe('active requests exist', () => {
      beforeEach(() => {
        state = {
          requests: {
            activeRequests: 1
          }
        };
      });

      test('returns true', () => {
        expect(hasActiveRequests(state)).toBe(true);
      });
    });

    describe('active requests not exist', () => {
      beforeEach(() => {
        state = {
          requests: {
            activeRequests: 0
          }
        };
      });

      test('returns false', () => {
        expect(hasActiveRequests(state)).toBe(false);
      });
    });
  });
});
