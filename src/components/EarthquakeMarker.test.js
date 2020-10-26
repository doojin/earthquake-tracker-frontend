import React from 'react';
import { render } from '@testing-library/react';
import EarthquakeMarker from './EarthquakeMarker';

describe('EarthquakeMarker', () => {
  test('renders svg with a circle', () => {
    const { container } = render(<EarthquakeMarker />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    const circle = svg.querySelector('circle');
    expect(circle).toBeInTheDocument();
  });

  test('renders svg of correct size', () => {
    const { container } = render(<EarthquakeMarker magnitude={ 4 } size={ 20 } />);
    const svg = container.querySelector('svg');

    // 1.2 is a marker size coefficient for earthquakes with magnitudes >= 4
    expect(svg.getAttribute('width')).toEqual((20 * 2 * 1.2).toString());
  });

  test('renders svg with correct margins', () => {
    const { container } = render(<EarthquakeMarker magnitude={ 4 } size={ 20 } />);
    const svg = container.querySelector('svg');

    // 1.2 is a marker size coefficient for earthquakes with magnitudes >= 4
    expect(svg.style.marginLeft).toEqual(`${-20 * 1.2}px`);
    expect(svg.style.marginTop).toEqual(`${-20 * 1.2}px`);
  });

  test('renders circle with correct center coordinates', () => {
    const { container } = render(<EarthquakeMarker magnitude={ 4 } size={ 20 } />);
    const circle = container.querySelector('svg > circle');

    expect(circle.getAttribute('cx')).toEqual('24');
    expect(circle.getAttribute('cy')).toEqual('24');
  });

  test('renders circle with correct radius', () => {
    const { container } = render(<EarthquakeMarker magnitude={ 4 } size={ 20 } />);
    const circle = container.querySelector('svg > circle');

    // 1.2 is a marker size coefficient for earthquakes with magnitudes >= 4
    // 2 is a stroke width
    expect(circle.getAttribute('r')).toEqual((20 * 1.2 / 2 - 2).toString());
  });

  test('fills circle with correct color', () => {
    const { container } = render(<EarthquakeMarker magnitude={ 4 } size={ 20 } />);
    const circle = container.querySelector('svg > circle');

    // red marker color for earthquakes with magnitudes >= 4
    expect(circle.getAttribute('fill')).toEqual('#ff002b');
  });

  test('animates circle with correct radius changes', () => {
    const { container } = render(<EarthquakeMarker magnitude={ 4 } size={ 20 } />);
    const animation = container.querySelector('svg > circle > animate');

    // 7.5 -> minimal animation radius = default radius * 0.75
    // 12 -> maximal animation radius = default radius * 1.2
    expect(animation.getAttribute('values')).toEqual('7.5;12;7.5');
  });
});
