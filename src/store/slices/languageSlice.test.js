import languageReducer, {
  getLanguage,
  getLocale,
  setLanguage
} from './languageSlice';

jest.mock('date-fns/locale', () => ({
  enUS: 'enUSLocale',
  ru: 'ruLocale'
}));

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

  describe('getLocale', () => {
    test('gets current system date locale', () => {
      const state = {
        language: {
          locale: 'enLocale'
        }
      };

      expect(getLocale(state)).toEqual('enLocale');
    });
  });

  describe('setLanguage', () => {
    test('changes system language', () => {
      const state = {};

      const updatedState = languageReducer(state, setLanguage('ru'));

      expect(updatedState.lang).toEqual('ru');
    });

    test('changes date locale', () => {
      const state = {};

      const updatedState = languageReducer(state, setLanguage('ru'));

      expect(updatedState.locale).toEqual('ruLocale');
    });
  });
});
