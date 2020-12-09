import languageReducer, {
  getLanguage,
  setLanguage
} from './languageSlice';

describe('language slice', () => {
  describe('getLanguage', () => {
    test('gets current system language', () => {
      const state = {
        language: 'en'
      };

      expect(getLanguage(state)).toEqual('en');
    });
  });

  describe('setLanguage', () => {
    const state = 'en';

    const updatedState = languageReducer(state, setLanguage('ru'));

    expect(updatedState).toEqual('ru');
  });
});
