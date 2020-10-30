import React from 'react';
import { render, screen } from '@testing-library/react';
import EarthquakeMap from './EarthquakeMap';

// noinspection JSUnusedGlobalSymbols
jest.mock('@react-google-maps/api', () => ({
    LoadScript: (props) => <div>{ props.children }</div>,
    GoogleMap: (props) => <div>{ props.children }</div>,
    Marker: (props) => (
      <div>
        marker,
        lat: { props.position.lat },
        lng: { props.position.lng }
      </div>
    )
}));

describe('EarthquakeMap', () => {
  test('renders Google map with markers', async () => {
    const earthquakes = [
      {
        id: 'earthquake1',
        position: {
          latitude: 1,
          longitude: 2
        }
      },
      {
        id: 'earthquake2',
        position: {
          latitude: 3,
          longitude: 4
        }
      }
    ];

    render(<EarthquakeMap apiKey="test" earthquakes={ earthquakes } />);

    const markers = screen.queryAllByText(/marker/);
    expect(markers.length).toEqual(2);

    expect(markers[0]).toHaveTextContent('lat: 1, lng: 2');
    expect(markers[1]).toHaveTextContent('lat: 3, lng: 4');
  });
});
