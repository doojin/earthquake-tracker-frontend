import React from 'react';
import { render, screen } from '@testing-library/react';
import { subDays } from 'date-fns';
import RelativeDate from './RelativeDate';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

describe('RelativeDate', () => {
  let store;

  describe('english date locale', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: {
          language: () => 'en'
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

      const formattedDate = screen.queryByText('2 days ago');
      expect(formattedDate).toBeInTheDocument();
    });
  });

  describe('russian date locale', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: {
          language: () => 'ru'
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
