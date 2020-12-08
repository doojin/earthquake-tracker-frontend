import React from 'react';
import {renderForm} from '../../utils/test/formik';
import RangeSliderField from './RangeSliderField';
import {fireEvent, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('range slider field', () => {
  test('renders slider with default values', () => {
    renderForm({minValue: 1, maxValue: 2})(formik => (
      <RangeSliderField minValueName="minValue"
                        maxValueName="maxValue"
                        formik={formik}
                        min={0}
                        max={10}
                        step={1} />
    ));

    expect(screen.queryAllByRole('slider')).toHaveLength(2);
    expect(screen.queryAllByRole('slider')[0]).toHaveStyle({ left: '10%' });
    expect(screen.queryAllByRole('slider')[1]).toHaveStyle({ left: '20%' });
  });

  test('renders number inputs with default values', () => {
    renderForm({minValue: 1, maxValue: 2})(formik => (
      <RangeSliderField minValueName="minValue"
                        maxValueName="maxValue"
                        formik={formik}
                        min={0}
                        max={10}
                        step={1} />
    ));

    expect(screen.queryAllByRole('spinbutton')).toHaveLength(2);
    expect(screen.queryAllByRole('spinbutton')[0]).toHaveValue('1');
    expect(screen.queryAllByRole('spinbutton')[1]).toHaveValue('2');
  });

  describe('label property passed', () => {
    beforeEach(() => {
      renderForm({minValue: 1, maxValue: 2})(formik => (
        <RangeSliderField minValueName="minValue"
                          maxValueName="maxValue"
                          formik={formik}
                          min={0}
                          max={10}
                          step={1}
                          label="my range slider"/>
      ));
    });

    test('renders label', () => {
      expect(screen.queryByText('my range slider')).toBeInTheDocument();
    });

    test('on label click focuses min value input', () => {
      userEvent.click(screen.queryByText('my range slider'));
      expect(screen.queryAllByRole('spinbutton')[0]).toHaveFocus();
    });
  });

  describe('label property not passed', () => {
    let container;

    beforeEach(() => {
      container = renderForm({minValue: 1, maxValue: 2})(formik => (
        <RangeSliderField minValueName="minValue"
                          maxValueName="maxValue"
                          formik={formik}
                          min={0}
                          max={10}
                          step={1}/>
      ));
    });

    test('not renders label', () => {
      expect(container.querySelector('label')).not.toBeInTheDocument();
    });
  });

  describe('user moves slider', () => {
    beforeEach(() => {
      renderForm({minValue: 1, maxValue: 2})(formik => (
        <RangeSliderField minValueName="minValue"
                          maxValueName="maxValue"
                          formik={formik}
                          min={0}
                          max={10}
                          step={1}/>
      ));
    });

    test('slider moves', async () => {
      expect(screen.queryAllByRole('slider')[0]).toHaveStyle({ left: '10%' });
      expect(screen.queryAllByRole('slider')[1]).toHaveStyle({ left: '20%' });

      userEvent.click(screen.queryAllByRole('slider')[0]);

      await waitFor(() => {
        expect(screen.queryAllByRole('slider')[0]).toHaveStyle({ left: '0%' });
        expect(screen.queryAllByRole('slider')[1]).toHaveStyle({ left: '20%' });
      });
    });

    test('input value changes', async () => {
      expect(screen.queryAllByRole('spinbutton')[0]).toHaveValue('1');
      expect(screen.queryAllByRole('spinbutton')[1]).toHaveValue('2');

      userEvent.click(screen.queryAllByRole('slider')[0]);

      await waitFor(() => {
        expect(screen.queryAllByRole('spinbutton')[0]).toHaveValue('0');
        expect(screen.queryAllByRole('spinbutton')[1]).toHaveValue('2');
      });
    });
  });

  describe('user changes input value', () => {
    beforeEach(() => {
      renderForm({minValue: 1, maxValue: 2})(formik => (
        <RangeSliderField minValueName="minValue"
                          maxValueName="maxValue"
                          formik={formik}
                          min={0}
                          max={10}
                          step={1}/>
      ));
    });

    test('slider moves', async () => {
      fireEvent.change(screen.queryAllByRole('spinbutton')[0], {
        target: {
          value: '7'
        }
      });

      fireEvent.change(screen.queryAllByRole('spinbutton')[1], {
        target: {
          value: '8'
        }
      });

      await waitFor(() => {
        expect(screen.queryAllByRole('slider')[0]).toHaveStyle({ left: '70%' });
        expect(screen.queryAllByRole('slider')[1]).toHaveStyle({ left: '80%' });
      });
    });
  });
});
