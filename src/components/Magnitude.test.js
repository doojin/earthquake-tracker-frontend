import React from 'react';
import { render, screen } from '@testing-library/react';
import Magnitude from './Magnitude';

describe('Magnitude', () => {
  describe('magnitude less than 3', () => {
    beforeEach(() =>
      render(<Magnitude magnitude={ 2.1 } />));

    test('renders safe magnitude level', () => {
      const magnitude = screen.queryByText('2.1');
      expect(magnitude).toHaveStyle('background-color: rgb(0, 145, 12)');
    });
  });

  describe('magnitude between 3 and 5', () => {
    beforeEach(() =>
      render(<Magnitude magnitude={ 4.1 } />));

    test('renders warning magnitude level', () => {
      const magnitude = screen.queryByText('4.1');
      expect(magnitude).toHaveStyle('background-color: rgb(150, 130, 0)');
    });
  });

  describe('magnitude bigger than 5', () => {
    beforeEach(() =>
      render(<Magnitude magnitude={ 6.1 } />));

    test('renders dangerous magnitude level', () => {
      const magnitude = screen.queryByText('6.1');
      expect(magnitude).toHaveStyle('background-color: rgb(157, 35, 35)');
    });
  });

  describe('toFixed property is provided', () => {
    beforeEach(() =>
      render(<Magnitude magnitude={ 6.1 } toFixed={ 3 } />));

    test('correctly formats magnitude value', () => {
      expect(screen.queryByText('6.100')).toBeInTheDocument();
    });
  });
});
