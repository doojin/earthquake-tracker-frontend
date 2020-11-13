import React from 'react';
import { render, screen } from '@testing-library/react';
import Magnitude from './Magnitude';

describe('Magnitude', () => {
  describe('magnitude less than 3', () => {
    beforeEach(() =>
      render(<Magnitude magnitude={ 2 } />));

    test('renders safe magnitude level', () => {
      const magnitude = screen.queryByText('2');
      expect(magnitude).toHaveClass('badge-success');
    });
  });

  describe('magnitude between 3 and 5', () => {
    beforeEach(() =>
      render(<Magnitude magnitude={ 4 } />));

    test('renders warning magnitude level', () => {
      const magnitude = screen.queryByText('4');
      expect(magnitude).toHaveClass('badge-warning');
    });
  });

  describe('magnitude bigger than 5', () => {
    beforeEach(() =>
      render(<Magnitude magnitude={ 6 } />));

    test('renders dangerous magnitude level', () => {
      const magnitude = screen.queryByText('6');
      expect(magnitude).toHaveClass('badge-danger');
    });
  });
});
