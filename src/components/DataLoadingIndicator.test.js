import React from 'react';
import DataLoadingIndicator from './DataLoadingIndicator';
import {configureStore} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';

describe('data loading indicator', () => {
  let store;

  describe('active requests in progress', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: {
          requests: () => ({
            activeRequests: 1
          })
        }
      });
    });

    test('loading indicator is shown', () => {
      render(
        <Provider store={store}>
          <DataLoadingIndicator/>
        </Provider>
      );

      expect(screen.queryByText('loading.data')).toBeInTheDocument();
    });
  });

  describe('no active requests in progress', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: {
          requests: () => ({
            activeRequests: 0
          })
        }
      });
    });

    test('loading indicator is hidden', () => {
      render(
        <Provider store={store}>
          <DataLoadingIndicator/>
        </Provider>
      );

      expect(screen.queryByText('loading.data')).not.toBeInTheDocument();
    });
  });
});
