import React from 'react';
import EarthquakeMarker from './EarthquakeMarker';
import { render, screen } from '@testing-library/react';

jest.mock('@react-google-maps/api', () => ({
  Marker: (props) => (
    <div>
      marker,
      lng: { props.position.lng },
      lat: { props.position.lat }
    </div>
  )
}));

describe('EarthquakeMarker', () => {
  test('renders Google Map marker', () => {
    const earthquake = { position: { longitude: 1, latitude: 2 } };
    render(<EarthquakeMarker earthquake={ earthquake } />);

    const marker = screen.queryByText(/marker/);

    expect(marker).toHaveTextContent('lng: 1, lat: 2');
  });
});
