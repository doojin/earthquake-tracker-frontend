import React from 'react';
import { render, screen } from '@testing-library/react';
import QueryForm from './QueryForm';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

describe('query form', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        query: () => ({
          limit: 0,
          minMagnitude: 0,
          maxMagnitude: 0,
          startDateTime: Date.now(),
          endDateTime: Date.now(),
          minDepth: 0,
          maxDepth: 0
        })
      }
    });
  });

  test('render form fields', () => {
    render(
      <Provider store={store}>
        <QueryForm/>
      </Provider>
    );

    expect(screen.queryByText('Limit:')).toBeInTheDocument();
    expect(screen.queryByRole('spinbutton', { name: 'Limit:' })).toBeInTheDocument();

    expect(screen.queryByText('Magnitude:')).toBeInTheDocument();
    expect(screen.queryByRole('spinbutton', { name: 'Magnitude:' })).toBeInTheDocument();

    expect(screen.queryByText('Start date/time:')).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'Start date/time:' })).toBeInTheDocument();

    expect(screen.queryByText('End date/time:')).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'End date/time:' })).toBeInTheDocument();

    expect(screen.queryByText('Depth (km):')).toBeInTheDocument();
    expect(screen.queryByRole('spinbutton', { name: 'Depth (km):' })).toBeInTheDocument();
  });
});
