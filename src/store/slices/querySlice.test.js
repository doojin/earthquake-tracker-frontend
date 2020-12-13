import queryReducer, {getLocation, getQuery, updateQuery} from './querySlice';

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

  describe('getLocation', () => {
    test('returns location values', () => {
      const state = {
        query: {
          latitude: 1,
          longitude: 2,
          radius: 3
        }
      };

      const location = getLocation(state);

      expect(location).toEqual({
        latitude: 1,
        longitude: 2,
        radius: 3
      });
    });
  });

  describe('updateQuery', () => {
    test('updates query', () => {
      const updatedState = queryReducer(
        {queryProp: 1},
        updateQuery({queryProp: 2})
      );

      expect(updatedState).toEqual({queryProp: 2});
    });
  });
});
