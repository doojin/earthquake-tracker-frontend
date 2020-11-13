import React from 'react';
import { render, screen } from '@testing-library/react';
import EarthquakePopup from './EarthquakePopup';

jest.mock('@react-google-maps/api', () => ({
  InfoWindow: () => <div>earthquake info</div>
}));

describe('EarthquakePopup', () => {

  const earthquake = {
    position: {
      latitude: 0,
      longitude: 0
    },
    magnitude: 0,
    timestamp: 0,
    title: ''
  };

  describe('popup is active', () => {

    beforeEach(() => {
      render(<EarthquakePopup active={ true } earthquake={ earthquake } />);
    });

    test('shows earthquake info', () => {
      const earthquakeInfo = screen.queryByText('earthquake info');
      expect(earthquakeInfo).toBeInTheDocument();
    });

  });

  describe('popup is inactive', () => {

    beforeEach(() => {
      render(<EarthquakePopup active={ false } earthquake={ earthquake } />);
    });

    test('hides earthquake info', () => {
      const earthquakeInfo = screen.queryByText('earthquake info');
      expect(earthquakeInfo).not.toBeInTheDocument();
    });

  });
});
