import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

  describe('form validation', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: {
          query: () => ({
            limit: 100,
            minMagnitude: 0,
            maxMagnitude: 0,
            startDateTime: Date.now(),
            endDateTime: Date.now(),
            minDepth: 0,
            maxDepth: 0
          })
        }
      });

      render(
        <Provider store={store}>
          <QueryForm/>
        </Provider>
      );
    });

    describe('limit field', () => {
      describe('entering not number', () => {
        test('error is shown', async () => {
          fireEvent.change(screen.queryByRole('spinbutton', { name: 'Limit:' }), {
            target: {
              value: 'notNumber'
            }
          });

          await waitFor(() =>
            expect(screen.queryByText('Limit should be a valid number')).toBeInTheDocument());
        });
      });

      describe('value is less than minimal allowed', () => {
        test('error is shown', async () => {
          fireEvent.change(screen.queryByRole('spinbutton', { name: 'Limit:' }), {
            target: {
              value: '0'
            }
          });

          await waitFor(() => expect(screen.queryByText('Minimal limit is 100')).toBeInTheDocument());
        });
      });

      describe('value is greater than maximal allowed', () => {
        test('error is shown', async () => {
          fireEvent.change(screen.queryByRole('spinbutton', { name: 'Limit:' }), {
            target: {
              value: '1001'
            }
          });

          await waitFor(() => expect(screen.queryByText('Maximal limit is 1000')).toBeInTheDocument());
        });
      });

      describe('user enters a valid number', () => {
        test('limit value is changed', async () => {
          fireEvent.change(screen.queryByRole('spinbutton', { name: 'Limit:' }), {
            target: {
              value: '101'
            }
          });

          fireEvent.blur(screen.queryByRole('spinbutton', { name: 'Limit:' }));

          await waitFor(() =>
            expect(screen.queryByRole('spinbutton', { name: 'Limit:' }))
              .toHaveValue('101'));
        });
      });
    });
  });
});
