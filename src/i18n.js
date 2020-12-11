import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  'loading.data': {
    en: 'We\'re loading your data',
    ru: 'Загружаем ваши данные'
  },
  'magnitude': {
    en: 'Magnitude',
    ru: 'Магнитуда'
  },
  'depth': {
    en: 'Depth',
    ru: 'Глубина'
  },
  'km': {
    en: 'km',
    ru: 'км'
  },
  'latitude': {
    en: 'Latitude',
    ru: 'Широта'
  },
  'longitude': {
    en: 'Longitude',
    ru: 'Долгота'
  },
  'when': {
    en: 'When',
    ru: 'Когда'
  },
  'ago': {
    en: 'ago',
    ru: 'назад'
  },
  'limit.error.invalid.number': {
    en: 'Limit should be a valid number',
    ru: 'Лимит должен быть целым числом'
  },
  'limit.error.minimal': {
    en: 'Minimal limit is {{amount}}',
    ru: 'Миниально допустимый лимит: {{amount}}'
  },
  'limit.error.maximum': {
    en: 'Maximal limit is {{amount}}',
    ru: 'Максимально допустимый лимит: {{amount}}'
  },
  'min.magnitude.error.invalid.number': {
    en: 'Minimal magnitude should be a valid number',
    ru: 'Минимальная магнитуда должна быть числом'
  },
  'magnitude.error.minimal': {
    en: 'Minimal magnitude is {{amount}}',
    ru: 'Минимально допупстимая магнитуда: {{amount}}'
  },
  'magnitude.error.maximal': {
    en: 'Maximal magnitude is {{amount}}',
    ru: 'Максимально допупстимая магнитуда: {{amount}}'
  },
  'min.magnitude.error.min.greater.than.max': {
    en: 'Minimal magnitude can\'t be grater than maximal magnitude',
    ru: 'Минимальная магнитуда не может быть больше максимальной'
  },
  'max.magnitude.error.invalid.number': {
    en: 'Maximal magnitude should be a valid number',
    ru: 'Максимальная магнитуда должна быть числом'
  },
  'date.error.invalid.date': {
    en: 'Valid date should be selected',
    ru: 'Выбрана некорректная дата'
  },
  'start.date.error.start.greater.than.end': {
    en: 'Start date can\'t be greater than end date',
    ru: 'Начальная дата не может быть после конечной даты'
  },
  'min.depth.error.invalid.number': {
    en: 'Minimal depth should be a valid number',
    ru: 'Минимальная глубина должна быть числом'
  },
  'max.depth.error.invalid.number': {
    en: 'Maximal depth should be a valid number',
    ru: 'Максимальная глубина должна быть числом'
  },
  'min.depth.error.greater.than.max': {
    en: 'Minimal depth can\'t be greater than maximal depth',
    ru: 'Минимальная глубина не может быть больше маскимальной'
  },
  'depth.error.minimum': {
    en: 'Minimal depth is {{amount}} km',
    ru: 'Минимально допустимая глубина: {{amount}} км'
  },
  'depth.error.maximum': {
    en: 'Maximal depth is {{amount}} km',
    ru: 'Максимально допустимая глубина: {{amount}} км'
  },
  'limit': {
    en: 'Limit',
    ru: 'Лимит'
  },
  'start.date.time': {
    en: 'Start date/time',
    ru: 'Начальные дата/время'
  },
  'end.date.time': {
    en: 'End date/time',
    ru: 'Конечные дата/время'
  },
  'search.earthquakes': {
    en: 'Search Earthquakes',
    ru: 'Искать Землетрясения'
  },
  'select.date': {
    en: 'Select date',
    ru: 'Выберите дату'
  },
  'failed.to.load.earthquakes': {
    en: 'We failed to load data from our servers',
    ru: 'У нас не получилось загрузить данные с нашего сервера'
  },
  'earthquakes.map': {
    en: 'Earthquakes Map',
    ru: 'Карта Землетрясений'
  },
  'earthquakes.table': {
    en: 'Earthquakes Table',
    ru: 'Таблица Землетрясений'
  },
  'title': {
    en: 'Title',
    ru: 'Название'
  },
  'latitude.longitude': {
    en: 'Latitude / Longitude',
    ru: 'Широта / Долгота'
  },
  'radius.km': {
    en: 'Radius (km)',
    ru: 'Радиус (км)'
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: Object.entries(resources).reduce((result, [key, {en, ru}]) => {
      result.en.translation[key] = en;
      result.ru.translation[key] = ru;
      return result;
    }, {
      en: { translation: {} },
      ru: { translation: {} }
    }),
    keySeparator: true,
    lng: 'en'
  });

export default i18n;
