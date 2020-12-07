import React from 'react';
import {render, screen, fireEvent, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
            maxMagnitude: 10,
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
      let limitField;

      beforeEach(() => {
          limitField = screen.queryByRole('spinbutton', { name: 'Limit:' });
      });

      describe('entering not number', () => {
        test('error is shown', async () => {
          userEvent.clear(limitField);
          await userEvent.type(limitField, 'notNumber', {delay: 1});
          expect(screen.queryByText('Limit should be a valid number')).toBeInTheDocument();
        });
      });

      describe('value is less than minimal allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(limitField);
          await userEvent.type(limitField, '0', {delay: 1});
          expect(screen.queryByText('Minimal limit is 100')).toBeInTheDocument();
        });
      });

      describe('value is greater than maximal allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(limitField);
          await userEvent.type(limitField, '1001', {delay: 1});
          expect(screen.queryByText('Maximal limit is 1000')).toBeInTheDocument();
        });
      });

      describe('user enters a valid number', () => {
        test('limit value is changed', async () => {
          userEvent.clear(limitField);
          await userEvent.type(limitField, '101', {delay: 1});
          fireEvent.blur(limitField);

          expect(limitField).toHaveValue('101');
        });
      });
    });

    describe('minimal magnitude field', () => {
      let minMagnitudeField;
      let maxMagnitudeField;

      beforeEach(() => {
        [minMagnitudeField, maxMagnitudeField] = within(screen.queryByText('Magnitude:').parentElement)
          .queryAllByRole('spinbutton');
      });

      describe('entering not a number to minimal magnitude', () => {
        test('error is shown', async () => {
          userEvent.clear(minMagnitudeField);
          await userEvent.type(minMagnitudeField, 'notNumber', {delay: 1});

          expect(screen.queryByText('Minimal magnitude should be a valid number')).toBeInTheDocument();
        });
      });

      describe('entering minimal magnitude value less than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(minMagnitudeField);
          await userEvent.type(minMagnitudeField, '-1', {delay: 1});

          expect(screen.queryByText('Minimal magnitude is 0')).toBeInTheDocument();
        });
      });

      describe('entering minimal magnitude value greater than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(minMagnitudeField);
          await userEvent.type(minMagnitudeField, '11', {delay: 1});

          expect(screen.queryByText('Minimal magnitude can\'t be grater than maximal magnitude'))
            .toBeInTheDocument();
        });
      });

      describe('entering minimal magnitude value greater than maximal magnitude value', () => {
        test('error is shown', async () => {
          userEvent.clear(minMagnitudeField);
          await userEvent.type(minMagnitudeField, '6', {delay: 1});

          userEvent.clear(maxMagnitudeField);
          await userEvent.type(maxMagnitudeField, '5', {delay: 1});

          expect(screen.queryByText('Minimal magnitude can\'t be grater than maximal magnitude'))
            .toBeInTheDocument();
        });
      });
    });

    describe('maximal magnitude field', () => {
      let maxMagnitudeField;

      beforeEach(() => {
        [, maxMagnitudeField] = within(screen.queryByText('Magnitude:').parentElement)
          .queryAllByRole('spinbutton');
      });

      describe('entering not a number to maximal magnitude', () => {
        test('error is shown', async () => {
          userEvent.clear(maxMagnitudeField);
          await userEvent.type(maxMagnitudeField, 'notNumber', {delay: 1});
          expect(screen.queryByText('Maximal magnitude should be a valid number')).toBeInTheDocument();
        });
      });

      describe('entering maximal magnitude value less than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(maxMagnitudeField);
          await userEvent.type(maxMagnitudeField, '-1', {delay: 1});
          expect(screen.queryByText('Minimal magnitude is 0')).toBeInTheDocument();
        });
      });

      describe('entering maximal magnitude value greater than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(maxMagnitudeField);
          await userEvent.type(maxMagnitudeField, '11', {delay: 1});
          expect(screen.queryByText('Maximal magnitude is 10')).toBeInTheDocument();
        });
      });
    });
  });
});
