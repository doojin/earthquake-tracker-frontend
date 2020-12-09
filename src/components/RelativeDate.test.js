import React from 'react';
import { render, screen } from '@testing-library/react';
import { subDays } from 'date-fns';
import RelativeDate from './RelativeDate';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {enUS, ru} from 'date-fns/locale';

describe('RelativeDate', () => {
  let store;

  describe('english locale', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: {
          language: () => ({
            locale: enUS
          })
        }
      });

      test('formats date correctly', () => {
        const timestamp = subDays(Date.now(), 2).getTime();

        render(
          <Provider store={store}>
            <RelativeDate timestamp={ timestamp } />
          </Provider>
        );

        const formattedDate = screen.queryByText('2 days ago');
        expect(formattedDate).toBeInTheDocument();
      });
    });
  });

  describe('russian locale', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: {
          language: () => ({
            locale: ru
          })
        }
      });
    });

    test('formats date correctly', () => {
      const timestamp = subDays(Date.now(), 2).getTime();

      render(
        <Provider store={store}>
          <RelativeDate timestamp={ timestamp } />
        </Provider>
      );

      const formattedDate = screen.queryByText('2 дня', {exact: false});
      expect(formattedDate).toBeInTheDocument();
    });
  });
});
