import React from 'react';
import EarthquakeMarker from './EarthquakeMarker';
import {render, screen} from '@testing-library/react';

jest.mock('@react-google-maps/api', () => ({
  Marker: (props) => (
    <div>
      marker,
      lng: {props.position.lng},
      lat: {props.position.lat},
      icon: {props.icon}
    </div>
  )
}));

describe('EarthquakeMarker', () => {
  test('renders Google Map marker', () => {
    const earthquake = {position: {longitude: 1, latitude: 2}};
    render(<EarthquakeMarker earthquake={earthquake}/>);

    const marker = screen.queryByText(/marker/);

    expect(marker).toHaveTextContent('lng: 1, lat: 2');
  });

  describe('earthquake with magnitude > 5', () => {
    test('renders green marker', () => {
      const earthquake = {
        magnitude: 6,
        position: {
          latitude: 1,
          longitude: 2
        }
      };

      render(<EarthquakeMarker earthquake={earthquake}/>);

      expect(screen.queryByText(/marker/))
        .toHaveTextContent('icon: http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    });
  });

  describe('earthquake with magnitude > 3 and < 5', () => {
    test('renders yellow marker', () => {
      const earthquake = {
        magnitude: 4,
        position: {
          latitude: 1,
          longitude: 2
        }
      };

      render(<EarthquakeMarker earthquake={earthquake}/>);

      expect(screen.queryByText(/marker/))
        .toHaveTextContent('icon: http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
    });
  });

  describe('earthquake with magnitude < 3', () => {
    test('renders green marker', () => {
      const earthquake = {
        magnitude: 1,
        position: {
          latitude: 1,
          longitude: 2
        }
      };

      render(<EarthquakeMarker earthquake={earthquake}/>);

      expect(screen.queryByText(/marker/))
        .toHaveTextContent('icon: http://maps.google.com/mapfiles/ms/icons/green-dot.png');
    });
  });
});
