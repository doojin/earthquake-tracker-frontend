import React from 'react';
import {renderForm} from '../../utils/test/formik';
import {screen, waitFor} from '@testing-library/react';
import DateTimeField from './DateTimeField';
import userEvent from '@testing-library/user-event';

describe('date time field', () => {
  test('renders date/time input', () => {
    renderForm({date: new Date(1991, 2, 21, 21, 40, 13)})(formik => (
      <DateTimeField name="date"
                     value={formik.values.date}
                     setFieldValue={formik.setFieldValue}/>
    ));

    expect(screen.queryByRole('textbox')).toHaveValue('1991-03-21 21:40:13');
  });

  test('date/time selection widget not shown by default', () => {
    renderForm({date: new Date(1991, 2, 21, 21, 40, 13)})(formik => (
      <DateTimeField name="date"
                     value={formik.values.date}
                     setFieldValue={formik.setFieldValue}/>
    ));

    expect(document.querySelector('.ant-picker-dropdown')).not.toBeInTheDocument();
  });

  describe('label property passed', () => {
    beforeEach(() => {
      renderForm({date: new Date(1991, 2, 21, 21, 40, 13)})(formik => (
        <DateTimeField name="date"
                       value={formik.values.date}
                       label="my date/time picker"
                       setFieldValue={formik.setFieldValue}/>
      ));
    });

    test('renders label', () => {
      expect(screen.queryByText('my date/time picker')).toBeInTheDocument();
    });

    test('clicking on label focuses input', async () => {
      userEvent.click(screen.queryByText('my date/time picker'));
      expect(screen.queryByRole('textbox')).toHaveFocus();
    });
  });

  describe('label property not passed', () => {
    beforeEach(() => {
      renderForm({date: new Date(1991, 2, 21, 21, 40, 13)})(formik => (
        <DateTimeField name="date"
                       value={formik.values.date}
                       setFieldValue={formik.setFieldValue}/>
      ));
    });

    test('not renders label', () => {
      expect(screen.queryByText('my date/time picker')).not.toBeInTheDocument();
    });
  });

  describe('user clicks date/time input', () => {
    beforeEach(() => {
      renderForm({date: new Date(1991, 2, 21, 21, 40, 13)})(formik => (
        <DateTimeField name="date"
                       value={formik.values.date}
                       setFieldValue={formik.setFieldValue}/>
      ));

      userEvent.click(screen.queryByRole('textbox'));
    });

    test('date/time selection widget is shown', async () => {
      expect(document.querySelector('.ant-picker-dropdown')).toBeInTheDocument();
    });
  });

  describe('user selects date and time', () => {
    beforeEach(() => {
      renderForm({date: new Date(1991, 2, 21, 21, 40, 13)})(formik => (
        <DateTimeField name="date"
                       value={formik.values.date}
                       setFieldValue={formik.setFieldValue}/>
      ));
    });

    test('date/time input value changes', async () => {
      // user opens date selection widget
      userEvent.click(screen.queryByRole('textbox'));
      // user selects another day
      userEvent.click(document.querySelector('td[title="1991-03-06"] > .ant-picker-cell-inner'));
      // user selects another hour
      userEvent.click(document.querySelector('.ant-picker-time-panel-cell:nth-child(15)'));
      // user clicks the "OK" button
      userEvent.click(document.querySelector('.ant-btn'));

      await waitFor(() => {
        expect(screen.queryByRole('textbox')).toHaveValue('1991-03-06 14:40:13');
      });
    });
  });
});
