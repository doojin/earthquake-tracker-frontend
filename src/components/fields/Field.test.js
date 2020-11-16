import React from 'react';
import {render, screen} from '@testing-library/react';
import Field from './Field';

describe('Field', () => {
  describe('label property exists', () => {
    beforeEach(() => {
      render(
        <Field name="my-field" label="My Field">
          <input type="text" id="my-field"/>
        </Field>
      );
    });

    test('renders label', () => {
      expect(screen.queryByText('My Field')).toBeInTheDocument();
    });

    test('binds label to input', () => {
      expect(screen.queryByRole('textbox', { name: 'My Field' })).toBeInTheDocument();
    });
  });

  describe('label property not exists', () => {
    let renderResult;

    beforeEach(() => {
      renderResult = render(
        <Field name="my-field">
          <input type="text" id="my-field"/>
        </Field>
      );
    });

    test('not renders label', () => {
      expect(renderResult.container.querySelector('label')).not.toBeInTheDocument();
    });
  });

  test('renders input child', () => {
    render(
      <Field name="my-field">
        <input type="text" id="my-field"/>
      </Field>
    );

    expect(screen.queryByRole('textbox')).toBeInTheDocument();
  });
});
