import React from 'react';
import LanguageSwitch from './LanguageSwitch';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18n from '../i18n';

jest.mock('../i18n');

describe('language switch', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        language: () => 'en'
      }
    });

    jest.spyOn(store, 'dispatch');
  });

  test('selected value is current system language', () => {
    render(
      <Provider store={store}>
        <LanguageSwitch/>
      </Provider>
    );

    expect(screen.queryByText('English')).toBeInTheDocument();
  });

  test('renders all available system language options', async () => {
    render(
      <Provider store={store}>
        <LanguageSwitch/>
      </Provider>
    );

    userEvent.click(screen.queryByText('English'));

    await waitFor(() => {
      expect(screen.queryAllByRole('option')).toHaveLength(2);
      expect(screen.queryAllByRole('option')[0]).toHaveTextContent('en');
      expect(screen.queryAllByRole('option')[1]).toHaveTextContent('ru');
    });
  });

  describe('user selects another language', () => {
    test('correct action is dispatched', async () => {
      render(
        <Provider store={store}>
          <LanguageSwitch/>
        </Provider>
      );

      userEvent.click(screen.queryByText('English')); // opening select box
      userEvent.click(screen.queryByTitle('Русский')); // selecting option

      await waitFor(() => {
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith({
          type: 'language/setLanguage',
          payload: 'ru'
        });
      });
    });

    test('system language is changed', async () => {
      render(
        <Provider store={store}>
          <LanguageSwitch/>
        </Provider>
      );

      userEvent.click(screen.queryByText('English')); // opening select box
      userEvent.click(screen.queryByTitle('Русский')); // selecting option

      await waitFor(() => {
        expect(i18n.changeLanguage).toHaveBeenCalledTimes(1);
        expect(i18n.changeLanguage).toHaveBeenCalledWith('en');
      });
    });
  });
});
