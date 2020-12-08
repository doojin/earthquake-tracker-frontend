import React from 'react';
import {render, screen, fireEvent, within, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QueryForm from './QueryForm';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import moment from 'moment';

describe('query form', () => {
  let store;
  let originalDate;

  beforeEach(() => {
    originalDate = Date.now();
    store = configureStore({
      reducer: {
        query: () => ({
          limit: 0,
          minMagnitude: 0,
          maxMagnitude: 0,
          startDateTime: originalDate,
          endDateTime: originalDate,
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
    let limitField;
    let minMagnitudeField;
    let maxMagnitudeField;
    let startDateTimeField;
    let removeStartDateTimeButton;
    let endDateTimeField;
    let removeEndDateTimeButton;
    let minDepthField;
    let maxDepthField;

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

      limitField = screen.queryByRole('spinbutton', { name: 'Limit:' });

      [minMagnitudeField, maxMagnitudeField] =
        within(screen.queryByText('Magnitude:').parentElement).queryAllByRole('spinbutton');

      startDateTimeField = within(screen.queryByText('Start date/time:').parentElement)
        .queryByRole('textbox');

      removeStartDateTimeButton = within(screen.queryByText('Start date/time:').parentElement)
        .queryByRole('img', { name: 'close-circle' });

      endDateTimeField = within(screen.queryByText('End date/time:').parentElement)
        .queryByRole('textbox');

      removeEndDateTimeButton = within(screen.queryByText('End date/time:').parentElement)
        .queryByRole('img', { name: 'close-circle' });

      [minDepthField, maxDepthField] =
        within(screen.queryByText('Depth (km):').parentElement).queryAllByRole('spinbutton');
    });

    describe('limit field', () => {
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

    describe('startDateTime', () => {
      describe('entering not a valid date', () => {
        test('input value changes to valid date', async () => {
          userEvent.clear(startDateTimeField);
          await userEvent.type(startDateTimeField, 'notDate{enter}', {delay: 1});

          expect(startDateTimeField).toHaveValue(moment(originalDate).format('yy-MM-DD HH:mm:ss'));
        });
      });

      describe('removing date value', () => {
        test('error is shown', async () => {
          userEvent.click(removeStartDateTimeButton);
          await waitFor(() =>
            expect(screen.queryByText('Valid date should be selected')).toBeInTheDocument());
        });
      });

      describe('setting start date greater than end date', () => {
        test('error is shown', async () => {
          userEvent.clear(startDateTimeField);
          await userEvent.type(startDateTimeField, '1991-03-21 21:40:00{enter}', {delay: 1});

          userEvent.clear(endDateTimeField);
          await userEvent.type(endDateTimeField, '1991-03-20 21:40:00{enter}', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('Start date can\'t be greater than end date')).toBeInTheDocument());
        });
      });
    });

    // noinspection DuplicatedCode
    describe('endDateTime', () => {
      describe('entering not a valid date', () => {
        test('input value changes to valid date', async () => {
          userEvent.clear(endDateTimeField);
          await userEvent.type(endDateTimeField, 'notDate{enter}', {delay: 1});

          expect(endDateTimeField).toHaveValue(moment(originalDate).format('yy-MM-DD HH:mm:ss'));
        });
      });

      describe('removing date value', () => {
        test('error is shown', async () => {
          userEvent.click(removeEndDateTimeButton);
          await waitFor(() =>
            expect(screen.queryByText('Valid date should be selected')).toBeInTheDocument());
        });
      });
    });

    describe('minimal depth field', () => {
      describe('entering not a number', () => {
        test('error is shown', async () => {
          userEvent.clear(minDepthField);
          await userEvent.type(minDepthField, 'notNumber', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('Minimal depth should be a valid number')).toBeInTheDocument());
        });
      });

      describe('entering value smaller than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(minDepthField);
          await userEvent.type(minDepthField, '-101', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('Minimal depth is -100km')).toBeInTheDocument());
        });
      });

      describe('entering value greater than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(minDepthField);
          await userEvent.type(minDepthField, '1001', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('Maximal depth is 1000km')).toBeInTheDocument());
        });
      });

      describe('entering minimal depth greater than maximal depth', () => {
        test('error is shown', async () => {
          userEvent.clear(minDepthField);
          await userEvent.type(minDepthField, '200', {delay: 1});

          userEvent.clear(maxDepthField);
          await userEvent.type(maxDepthField, '199', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('Minimal depth can\'t be greater than maximal depth')).toBeInTheDocument());
        });
      });
    });

    describe('maximal depth field', () => {
      describe('entering not a number', () => {
        test('error is shown', async () => {
          userEvent.clear(maxDepthField);
          await userEvent.type(maxDepthField, 'notNumber', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('Maximal depth should be a valid number')).toBeInTheDocument());
        });
      });

      describe('entering value smaller than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(maxDepthField);
          await userEvent.type(maxDepthField, '-101', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('Minimal depth is -100km')).toBeInTheDocument());
        });
      });

      describe('entering value greater than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(maxDepthField);
          await userEvent.type(maxDepthField, '1001', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('Maximal depth is 1000km')).toBeInTheDocument());
        });
      });
    });
  });
});
