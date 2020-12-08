import React from 'react';
import {fireEvent, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderForm } from '../../utils/test/formik';
import SliderField from './SliderField';

describe('slider field', () => {
  test('renders slider with default value', () => {
    renderForm({slider: 5})(formik => (
      <SliderField name="slider"
                   formik={formik}
                   min={0}
                   max={10}
                   step={1} />
    ));

    expect(screen.queryByRole('slider')).toBeInTheDocument();
    expect(screen.queryByRole('slider')).toHaveStyle({ left: '50%' });
  });


  test('renders number input with default value', () => {
    renderForm({slider: 5})(formik => (
      <SliderField name="slider"
                   formik={formik}
                   min={0}
                   max={10}
                   step={1} />
    ));

    expect(screen.queryByRole('spinbutton')).toBeInTheDocument();
    expect(screen.queryByRole('spinbutton')).toHaveValue('5');
  });

  describe('label property passed', () => {
    beforeEach(() => {
      renderForm({slider: 5})(formik => (
        <SliderField name="slider"
                     label="my slider"
                     formik={formik}
                     min={0}
                     max={10}
                     step={1} />
      ));
    });


    test('renders label', () => {
      expect(screen.queryByText('my slider')).toBeInTheDocument();
    });

    test('on label click focuses input', () => {
      userEvent.click(screen.queryByText('my slider'));
      expect(screen.queryByRole('spinbutton')).toHaveFocus();
    });
  });

  describe('label property not passed', () => {
    let container;

    beforeEach(() => {
      container = renderForm({slider: 5})(formik => (
        <SliderField name="slider"
                     formik={formik}
                     min={0}
                     max={10}
                     step={1} />
      ));
    });

    test('not renders label', () => {
      expect(container.querySelector('label')).not.toBeInTheDocument();
    });
  });

  describe('user moves slider', () => {
    beforeEach(() => {
      renderForm({slider: 1})(formik => (
        <SliderField name="slider"
                     formik={formik}
                     min={0}
                     max={10}
                     step={1} />
      ));
    });

    test('slider moves', async () => {
      expect(screen.queryByRole('slider')).toHaveStyle({ left: '10%' });

      userEvent.click(screen.queryByRole('slider'));

      await waitFor(() => expect(screen.queryByRole('slider')).toHaveStyle({ left: '0%' }));
    });

    test('input value changes', async () => {
      expect(screen.getByRole('spinbutton')).toHaveValue('1');

      userEvent.click(screen.queryByRole('slider'));

      await waitFor(() => expect(screen.getByRole('spinbutton')).toHaveValue('0'));
    });
  });

  describe('user changes input value', () => {
    test('slider moves', async () => {
      renderForm({slider: 1})(formik => (
        <SliderField name="slider"
                     formik={formik}
                     min={0}
                     max={10}
                     step={1} />
      ));

      fireEvent.change(screen.getByRole('spinbutton'), {
        target: {
          value: '8'
        }
      });

      await waitFor(() => expect(screen.getByRole('slider')).toHaveStyle({ left: '80%' }));
    });
  });
});
