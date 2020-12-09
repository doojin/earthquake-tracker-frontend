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

    expect(screen.queryByText('limit:')).toBeInTheDocument();
    expect(screen.queryByRole('spinbutton', { name: 'limit:' })).toBeInTheDocument();

    expect(screen.queryByText('magnitude:')).toBeInTheDocument();
    expect(screen.queryByRole('spinbutton', { name: 'magnitude:' })).toBeInTheDocument();

    expect(screen.queryByText('start.date.time:')).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'start.date.time:' })).toBeInTheDocument();

    expect(screen.queryByText('end.date.time:')).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'end.date.time:' })).toBeInTheDocument();

    expect(screen.queryByText('depth (km):')).toBeInTheDocument();
    expect(screen.queryByRole('spinbutton', { name: 'depth (km):' })).toBeInTheDocument();
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

      limitField = screen.queryByRole('spinbutton', { name: 'limit:' });

      [minMagnitudeField, maxMagnitudeField] =
        within(screen.queryByText('magnitude:').parentElement).queryAllByRole('spinbutton');

      startDateTimeField = within(screen.queryByText('start.date.time:').parentElement)
        .queryByRole('textbox');

      removeStartDateTimeButton = within(screen.queryByText('start.date.time:').parentElement)
        .queryByRole('img', { name: 'close-circle' });

      endDateTimeField = within(screen.queryByText('end.date.time:').parentElement)
        .queryByRole('textbox');

      removeEndDateTimeButton = within(screen.queryByText('end.date.time:').parentElement)
        .queryByRole('img', { name: 'close-circle' });

      [minDepthField, maxDepthField] =
        within(screen.queryByText('depth (km):').parentElement).queryAllByRole('spinbutton');
    });

    describe('limit field', () => {
      describe('entering not number', () => {
        test('error is shown', async () => {
          userEvent.clear(limitField);
          await userEvent.type(limitField, 'notNumber', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('limit.error.invalid.number')).toBeInTheDocument());
        });
      });

      describe('value is less than minimal allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(limitField);
          await userEvent.type(limitField, '0', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('limit.error.minimal')).toBeInTheDocument());
        });
      });

      describe('value is greater than maximal allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(limitField);
          await userEvent.type(limitField, '1001', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('limit.error.maximum')).toBeInTheDocument());
        });
      });

      describe('user enters a valid number', () => {
        test('limit value is changed', async () => {
          userEvent.clear(limitField);
          await userEvent.type(limitField, '101', {delay: 1});
          fireEvent.blur(limitField);

          await waitFor(() => expect(limitField).toHaveValue('101'));
        });
      });
    });

    describe('minimal magnitude field', () => {
      describe('entering not a number to minimal magnitude', () => {
        test('error is shown', async () => {
          userEvent.clear(minMagnitudeField);
          await userEvent.type(minMagnitudeField, 'notNumber', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('min.magnitude.error.invalid.number')).toBeInTheDocument());
        });
      });

      describe('entering minimal magnitude value less than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(minMagnitudeField);
          await userEvent.type(minMagnitudeField, '-1', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('magnitude.error.minimal 0')).toBeInTheDocument());
        });
      });

      describe('entering minimal magnitude value greater than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(minMagnitudeField);
          await userEvent.type(minMagnitudeField, '11', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('min.magnitude.error.min.greater.than.max'))
              .toBeInTheDocument());
        });
      });

      describe('entering minimal magnitude value greater than maximal magnitude value', () => {
        test('error is shown', async () => {
          userEvent.clear(minMagnitudeField);
          await userEvent.type(minMagnitudeField, '6', {delay: 1});

          userEvent.clear(maxMagnitudeField);
          await userEvent.type(maxMagnitudeField, '5', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('min.magnitude.error.min.greater.than.max'))
              .toBeInTheDocument());
        });
      });
    });

    describe('maximal magnitude field', () => {
      describe('entering not a number to maximal magnitude', () => {
        test('error is shown', async () => {
          userEvent.clear(maxMagnitudeField);
          await userEvent.type(maxMagnitudeField, 'notNumber', {delay: 1});
          expect(screen.queryByText('max.magnitude.error.invalid.number')).toBeInTheDocument();
        });
      });

      describe('entering maximal magnitude value less than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(maxMagnitudeField);
          await userEvent.type(maxMagnitudeField, '-1', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('magnitude.error.minimal 0')).toBeInTheDocument());
        });
      });

      describe('entering maximal magnitude value greater than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(maxMagnitudeField);
          await userEvent.type(maxMagnitudeField, '11', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('magnitude.error.maximal 10')).toBeInTheDocument());
        });
      });
    });

    describe('startDateTime', () => {
      describe('entering not a valid date', () => {
        test('input value changes to valid date', async () => {
          userEvent.clear(startDateTimeField);
          await userEvent.type(startDateTimeField, 'notDate{enter}', {delay: 1});

          await waitFor(() =>
            expect(startDateTimeField).toHaveValue(moment(originalDate).format('yy-MM-DD HH:mm:ss')));
        });
      });

      describe('removing date value', () => {
        test('error is shown', async () => {
          userEvent.click(removeStartDateTimeButton);

          await waitFor(() =>
            expect(screen.queryByText('Valid date should be selected')).not.toBeInTheDocument());
        });
      });

      describe('setting start date greater than end date', () => {
        test('error is shown', async () => {
          userEvent.clear(startDateTimeField);
          await userEvent.type(startDateTimeField, '1991-03-21 21:40:00{enter}', {delay: 1});

          userEvent.clear(endDateTimeField);
          await userEvent.type(endDateTimeField, '1991-03-20 21:40:00{enter}', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('start.date.error.start.greater.than.end')).toBeInTheDocument());
        });
      });
    });

    // noinspection DuplicatedCode
    describe('endDateTime', () => {
      describe('entering not a valid date', () => {
        test('input value changes to valid date', async () => {
          userEvent.clear(endDateTimeField);
          await userEvent.type(endDateTimeField, 'notDate{enter}', {delay: 1});

          await waitFor(() =>
            expect(endDateTimeField).toHaveValue(moment(originalDate).format('yy-MM-DD HH:mm:ss')));
        });
      });

      describe('removing date value', () => {
        test('error is shown', async () => {
          userEvent.click(removeEndDateTimeButton);

          await waitFor(() =>
            expect(screen.queryByText('date.error.invalid.date')).not.toBeInTheDocument());
        });
      });
    });

    describe('minimal depth field', () => {
      describe('entering not a number', () => {
        test('error is shown', async () => {
          userEvent.clear(minDepthField);
          await userEvent.type(minDepthField, 'notNumber', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('min.depth.error.invalid.number')).toBeInTheDocument());
        });
      });

      describe('entering value smaller than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(minDepthField);
          await userEvent.type(minDepthField, '-101', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('depth.error.minimum -100 km')).toBeInTheDocument());
        });
      });

      describe('entering value greater than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(minDepthField);
          await userEvent.type(minDepthField, '1001', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('depth.error.maximum 1000 km')).toBeInTheDocument());
        });
      });

      describe('entering minimal depth greater than maximal depth', () => {
        test('error is shown', async () => {
          userEvent.clear(minDepthField);
          await userEvent.type(minDepthField, '200', {delay: 1});

          userEvent.clear(maxDepthField);
          await userEvent.type(maxDepthField, '199', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('min.depth.error.greater.than.max')).toBeInTheDocument());
        });
      });
    });

    describe('maximal depth field', () => {
      describe('entering not a number', () => {
        test('error is shown', async () => {
          userEvent.clear(maxDepthField);
          await userEvent.type(maxDepthField, 'notNumber', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('max.depth.error.invalid.number')).toBeInTheDocument());
        });
      });

      describe('entering value smaller than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(maxDepthField);
          await userEvent.type(maxDepthField, '-101', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('depth.error.minimum -100 km')).toBeInTheDocument());
        });
      });

      describe('entering value greater than allowed', () => {
        test('error is shown', async () => {
          userEvent.clear(maxDepthField);
          await userEvent.type(maxDepthField, '1001', {delay: 1});

          await waitFor(() =>
            expect(screen.queryByText('depth.error.maximum 1000 km')).toBeInTheDocument());
        });
      });
    });
  });
});
