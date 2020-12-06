import React from 'react';
import FieldError from './FieldError';
import {render, screen} from '@testing-library/react';

describe('Field error', () => {
  beforeEach(() => {
    render(
      <FieldError>
        test error
      </FieldError>
    );
  });

  test('displays error message', () => {
    expect(screen.queryByText('test error')).toBeInTheDocument();
  });
});
