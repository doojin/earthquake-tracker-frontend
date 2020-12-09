import languageReducer, {
  getLanguage,
  setLanguage
} from './languageSlice';

describe('language slice', () => {
  describe('getLanguage', () => {
    test('gets current system language', () => {
      const state = {
        language: {
          lang: 'en'
        }
      };

      expect(getLanguage(state)).toEqual('en');
    });
  });

  describe('setLanguage', () => {
    const state = {
      lang: 'en'
    };

    const updatedState = languageReducer(state, setLanguage('ru'));

    expect(updatedState).toEqual({
      lang: 'ru'
    });
  });
});
