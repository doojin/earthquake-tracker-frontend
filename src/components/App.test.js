import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import App from './App';

jest.mock('./Container', () => props => (
  <div>
    <div>leftColumnSize:{props.leftColumn.size}</div>
    <div>rightColumnSize:{props.rightColumn.size}</div>
    <div>leftColumnChildren:{props.leftColumn.children}</div>
    <div>rightColumnChildren:{props.rightColumn.children}</div>
  </div>
));

jest.mock('./DataLoadingIndicator', () => () => 'component:DataLoadingIndicator');
jest.mock('./QueryForm', () => () => 'component:QueryForm');
jest.mock('./EarthquakeMap', () => () => 'component:EarthquakeMap');

describe('App component', () => {
  beforeEach(() => {
    const store = configureStore({
      reducer: () => ({})
    });

    render(
      <Provider store={store}>
        <App/>
      </Provider>
    );
  });

  test('correctly renders component', () => {
    expect(screen.queryByText('leftColumnChildren:component:QueryForm')).toBeInTheDocument();
    expect(screen.queryByText('rightColumnChildren:component:EarthquakeMap')).toBeInTheDocument();

    expect(screen.queryByText('leftColumnSize:6')).toBeInTheDocument();
    expect(screen.queryByText('rightColumnSize:18')).toBeInTheDocument();
  });
});
