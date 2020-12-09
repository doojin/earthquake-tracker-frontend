import React from 'react';
import {prettyDOM, render, screen} from '@testing-library/react';
import EarthquakeMap from './EarthquakeMap';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

// noinspection JSUnusedGlobalSymbols
jest.mock('@react-google-maps/api', () => ({
    LoadScript: (props) => (
      <div>
        { props.children }
        language: { props.language }
      </div>
    ),
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
  let store;
  let earthquakes;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        earthquakes: () => ({
          items: [],
          active: null
        }),
        language: () => ({
          lang: 'en'
        })
      }
    });

    earthquakes = [
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
  });

  test('renders Google map with markers', async () => {
    render(
      <Provider store={store}>
        <EarthquakeMap apiKey="test" earthquakes={ earthquakes } />
      </Provider>
    );

    const markers = screen.queryAllByText(/marker/);
    expect(markers.length).toEqual(2);

    expect(markers[0]).toHaveTextContent('lat: 1, lng: 2');
    expect(markers[1]).toHaveTextContent('lat: 3, lng: 4');

    expect(screen.queryByText('language: en')).toBeInTheDocument();
  });
});
