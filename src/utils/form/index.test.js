import {normalizeValue} from '.';

describe('form utils', () => {
  describe('normalizeValue', () => {
    describe('value is null', () => {
      test('returns undefined', () => {
        expect(normalizeValue(null)).toBeUndefined();
      });
    });

    describe('value is not null', () => {
      test('returns value itself', () => {
        expect(normalizeValue('x')).toEqual('x');
      });
    });
  });
});
