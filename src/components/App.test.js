import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import en from 'antd/lib/locale/en_US';
import App from './App';

jest.mock('./Container', () => {
  return props => (
    <div>
      <div>leftColumnSize:{props.leftColumn.size}</div>
      <div>rightColumnSize:{props.rightColumn.size}</div>
      <div>leftColumnChildren:{props.leftColumn.children}</div>
      <div>rightColumnChildren:{props.rightColumn.children}</div>
    </div>
  );
});

jest.mock('./DataLoadingIndicator', () => {
  return () => 'component:DataLoadingIndicator';
});

jest.mock('./SideMenu', () => {
  return () => 'component:SideMenu';
});

jest.mock('./EarthquakeView', () => {
  return () => 'component:EarthquakeView';
});

describe('App component', () => {
  beforeEach(() => {
    const store = configureStore({
      reducer: {
        earthquakes: () => ({
          items: []
        }),
        language: () => ({
          antdLocale: en
        })
      }
    });

    render(
      <Provider store={store}>
        <App/>
      </Provider>
    );
  });

  test('correctly renders component', () => {
    expect(screen.queryByText('leftColumnChildren:component:SideMenu')).toBeInTheDocument();
    expect(screen.queryByText('rightColumnChildren:component:EarthquakeView')).toBeInTheDocument();

    expect(screen.queryByText('leftColumnSize:6')).toBeInTheDocument();
    expect(screen.queryByText('rightColumnSize:18')).toBeInTheDocument();
  });
});
