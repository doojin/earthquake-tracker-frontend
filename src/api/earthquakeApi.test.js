import fetchMock from 'fetch-mock';
import {getEarthquakes} from './earthquakesApi';

describe('earthquakes api', () => {
  beforeEach(() => {
    fetchMock.get('*', {
      data: ['earthquake1']
    });
  });

  afterEach(() => {
    fetchMock.reset();
  });

  describe('getEarthquakes', () => {
    test('returns correct result', async () => {
      const earthquakes = await getEarthquakes({});
      expect(earthquakes).toEqual(['earthquake1']);
    });

    describe('empty query passed', () => {
      beforeEach(async () => {
        await getEarthquakes({});
      });

      test('executes correct request', async () => {
        expect(fetchMock.calls().length).toEqual(1);

        const [url] = fetchMock.calls()[0];
        expect(url).toEqual('/earthquakes');
      });
    });

    describe('multiple query parameters passed', () => {
      beforeEach(async () => {
        await getEarthquakes({
          limit: 'testLimit',
          minMagnitude: 'testMinMagnitude',
          maxMagnitude: 'testMaxMagnitude',
          startDateTime: new Date(1991, 2, 21, 21, 40, 13).getTime(),
          endDateTime: new Date(1991, 2, 21, 21, 40, 14).getTime(),
          minDepth: 'testMinDepth',
          maxDepth: 'testMaxDepth',
          latitude: 'testLatitude',
          longitude: 'testLongitude',
          radius: 'testRadius'
        });
      });

      test('executes correct request', () => {
        expect(fetchMock.calls().length).toEqual(1);

        const [url] = fetchMock.calls()[0];
        expect(url).toEqual('/earthquakes?limit=testLimit&minMagnitude=testMinMagnitude&maxMagnitude=testMaxMagnitude&startTime=1991-03-21T21%3A40%3A13%2B00%3A00&endTime=1991-03-21T21%3A40%3A14%2B00%3A00&minDepth=testMinDepth&maxDepth=testMaxDepth&latitude=testLatitude&longitude=testLongitude&radius=testRadius');
      });
    });
  });

  describe('fetch request returns non-200 status code', () => {
    beforeEach(() => {
      fetchMock.get('*', {status: 500}, {overwriteRoutes: true});
    });

    test('error is thrown', async () => {
      await expect(getEarthquakes({})).rejects.toThrow('Failed to fetch earthquake data');
    });
  });
});
