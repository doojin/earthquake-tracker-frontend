import languageReducer, {
  getAntdLocale,
  getLanguage,
  getDateLocale,
  setLanguage
} from './languageSlice';

jest.mock('date-fns/locale', () => ({
  enUS: 'enDateLocale',
  ru: 'ruDateLocale'
}));

jest.mock('antd/lib/locale/en_US', () => 'enAntdLocale');
jest.mock('antd/lib/locale/ru_RU', () => 'ruAntdLocale');

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

  describe('getDateLocale', () => {
    test('gets current system date locale', () => {
      const state = {
        language: {
          dateLocale: 'enDateLocale'
        }
      };

      expect(getDateLocale(state)).toEqual('enDateLocale');
    });
  });

  describe('getAntdLocale', () => {
    test('gets current system antd locale', () => {
      const state = {
        language: {
          antdLocale: 'enLocale'
        }
      };

      expect(getAntdLocale(state)).toEqual('enLocale');
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

      expect(updatedState.dateLocale).toEqual('ruDateLocale');
    });

    test('changes antd locale', () => {
      const state = {};

      const updatedState = languageReducer(state, setLanguage('ru'));

      expect(updatedState.antdLocale).toEqual('ruAntdLocale');
    });
  });
});
