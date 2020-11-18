import {getQuery} from './querySlice';

describe('query slice', () => {
  describe('getQuery', () => {
    test('returns query object from state', () => {
      const state = {
        prop1: 1,
        query: 2,
        prop3: 3
      };

      expect(getQuery(state)).toEqual(2);
    });
  });
});
