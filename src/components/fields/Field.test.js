import React, {useEffect} from 'react';
import {screen, waitFor} from '@testing-library/react';
import {renderForm} from '../../utils/test/formik';
import Field from './Field';

describe('Field', () => {
  describe('label property exists', () => {
    beforeEach(() => {
      renderForm({})(formik => (
        <Field name="my-field" label="My Field" formik={formik}>
          <input type="text" id="my-field"/>
        </Field>
      ));
    });

    test('renders label', () => {
      expect(screen.queryByText('My Field')).toBeInTheDocument();
    });

    test('binds label to input', () => {
      expect(screen.queryByRole('textbox', { name: 'My Field' })).toBeInTheDocument();
    });
  });

  describe('label property not exists', () => {
    let container;

    beforeEach(() => {
      container = renderForm({})(formik => (
        <Field name="my-field" formik={formik}>
          <input type="text" id="my-field"/>
        </Field>
      ));
    });

    test('not renders label', () => {
      expect(container.querySelector('label')).not.toBeInTheDocument();
    });
  });

  test('renders input child', () => {
    renderForm({})(formik => (
      <Field name="my-field" formik={formik}>
        <input type="text" id="my-field"/>
      </Field>
    ));

    expect(screen.queryByRole('textbox')).toBeInTheDocument();
  });

  describe('primary error not empty', () => {
    let FieldComponent;

    beforeEach(() => {
      FieldComponent = ({formik}) => {
          useEffect(() => {
            formik.setErrors({ 'my-field': 'test primary error' });
            formik.setTouched({ 'my-field': true });
            // eslint-disable-next-line
          }, []);

        return (
          <Field formik={formik} name="my-field">
            <input type="text" id="my-field"/>
          </Field>
        );
      };
    });

    test('error message is displayed', async () => {
      renderForm({})(formik => <FieldComponent formik={formik}/>);
      await waitFor(() => expect(screen.queryByText('test primary error')).toBeInTheDocument());
    });
  });

  describe('secondary error not empty', () => {
    let FieldComponent;

    beforeEach(() => {
      FieldComponent = ({formik}) => {
        useEffect(() => {
          formik.setErrors({ 'my-field2': 'test secondary error' });
          formik.setTouched({ 'my-field2': true });
          // eslint-disable-next-line
        }, []);

        return (
          <Field formik={formik} name="my-field1" secondaryName="my-field2">
            <input type="text" id="my-field1"/>
            <input type="text" id="my-field2"/>
          </Field>
        );
      };
    });

    test('error message is displayed', async () => {
      renderForm({})(formik => <FieldComponent formik={formik}/>);
      await waitFor(() => expect(screen.queryByText('test secondary error')).toBeInTheDocument());
    });
  });
});
