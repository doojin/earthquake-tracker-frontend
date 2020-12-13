import React from 'react';
import EarthquakesArea from './EarthquakesArea';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {render, screen, waitFor} from '@testing-library/react';

jest.mock('@react-google-maps/api', () => ({
  Circle: () => 'component:Circle'
}));

describe('EarthquakesArea', () => {
  let store;

  describe('latitude, longitude and radius fields are set', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: () => ({
          query: {
            latitude: 0,
            longitude: 0,
            radius: 0
          }
        })
      });
    });

    test('circle is displayed', async () => {
      render(
        <Provider store={store}>
          <EarthquakesArea/>
        </Provider>
      );

      await waitFor(() =>
        expect(screen.queryByText('component:Circle')).toBeInTheDocument());
    });
  });

  describe('latitude not set', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: () => ({
          query: {
            longitude: 0,
            radius: 0
          }
        })
      });
    });

    test('circle not displayed', async () => {
      render(
        <Provider store={store}>
          <EarthquakesArea/>
        </Provider>
      );

      await waitFor(() =>
        expect(screen.queryByText('component:Circle')).not.toBeInTheDocument());
    });
  });

  describe('longitude not set', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: () => ({
          query: {
            latitude: 0,
            radius: 0
          }
        })
      });
    });

    test('circle not displayed', async () => {
      render(
        <Provider store={store}>
          <EarthquakesArea/>
        </Provider>
      );

      await waitFor(() =>
        expect(screen.queryByText('component:Circle')).not.toBeInTheDocument());
    });
  });

  describe('radius not set', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: () => ({
          query: {
            latitude: 0,
            longitude: 0
          }
        })
      });
    });

    test('circle not displayed', async () => {
      render(
        <Provider store={store}>
          <EarthquakesArea/>
        </Provider>
      );

      await waitFor(() =>
        expect(screen.queryByText('component:Circle')).not.toBeInTheDocument());
    });
  });
});
