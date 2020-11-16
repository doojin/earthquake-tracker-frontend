import React from 'react';
import { render, screen } from '@testing-library/react';
import EarthquakeDescription from './EarthquakeDescription';
import { subDays } from 'date-fns';

describe('EarthquakeDescription', () => {

  beforeEach(() => {
    const yesterdayTimestamp = subDays(Date.now(), 1).getTime();

    render(<EarthquakeDescription timestamp={ yesterdayTimestamp }
                                  latitude={ 20 }
                                  longitude={ -20.1234567 }
                                  magnitude={ 1.55 }
                                  title="Very Big Earthquake" />);
  });

  test('renders earthquake title', () => {
    const title = screen.queryByRole('cell', { name: /very big earthquake/i });
    expect(title).toBeInTheDocument();
  });

  test('renders relative earthquake date', () => {
    const dateLabel = screen.queryByRole('cell', { name: 'when:' });
    expect(dateLabel).toBeInTheDocument();

    const dateValue = dateLabel.nextSibling;
    expect(dateValue).toHaveTextContent('1 day ago');
  });

  test('renders earthquake magnitude', () => {
    const magnitudeLabel = screen.queryByRole('cell', { name: 'magnitude:' });
    expect(magnitudeLabel).toBeInTheDocument();

    const magnitudeValue = magnitudeLabel.nextSibling;
    expect(magnitudeValue).toHaveTextContent('1.6');
  });

  test('renders earthquake coordinates', () => {
    const coordinatesLabel = screen.queryByRole('cell', { name: 'lat, long:' });
    expect(coordinatesLabel).toBeInTheDocument();

    const coordinatesValue = coordinatesLabel.nextSibling;
    expect(coordinatesValue).toHaveTextContent('20.00, -20.12');
  });
});
