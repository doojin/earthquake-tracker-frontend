import React from 'react';
import PropTypes from 'prop-types';

const magnitudeColors = [
  [4, '#ff002b'],
  [3, '#ff7b00'],
  [2, '#e0cd1d'],
  [1, '#aed417'],
  [0, '#1be386'],
];

const magnitudeSizeCoefficients = [
  [4, 1.2],
  [3, 1.1],
  [2, 1.0],
  [1, 0.9],
  [0, 0.8],
];

const magnitudeValueGetter = values => {
  return magnitude => {
    if (magnitude < 0) magnitude = 0;
    return values.find(([minMagnitude]) => magnitude >= minMagnitude)[1];
  };
};

const getMagnitudeColor = magnitudeValueGetter(magnitudeColors);
const getMagnitudeSizeCoefficient = magnitudeValueGetter(magnitudeSizeCoefficients);

EarthquakeMarker.propTypes = {
  size: PropTypes.number.isRequired,
  magnitude: PropTypes.number.isRequired
};

EarthquakeMarker.defaultProps = {
  size: 18,
  magnitude: 0
};

export default function EarthquakeMarker(props) {
  const sizeCoefficient = getMagnitudeSizeCoefficient(props.magnitude);
  const circleSize = props.size * sizeCoefficient;
  const svgSize = circleSize * 2;

  const circleCenter = svgSize / 2;
  const circleStrokeWidth = 2;

  const defaultCircleRadius = circleSize / 2 - circleStrokeWidth;
  const minCircleRadius = defaultCircleRadius * 0.75;
  const maxCircleRadius = defaultCircleRadius * 1.2;

  const circleFillColor = getMagnitudeColor(props.magnitude);

  return (
    <svg width={ svgSize }
         height={ svgSize }
         style={{ marginLeft: -svgSize / 2, marginTop: -svgSize / 2 }}>

      <circle cx={ circleCenter }
              cy={ circleCenter }
              r={ defaultCircleRadius }
              stroke="white"
              strokeWidth={ circleStrokeWidth }
              fill={ circleFillColor } >

        <animate attributeName="r"
                 values={ [minCircleRadius, maxCircleRadius, minCircleRadius].join(';') }
                 dur="1.5s"
                 repeatCount="indefinite" />

      </circle>
    </svg>
  );
}
