import React from 'react';
import './EarthquakeDescription.less';
import PropTypes from 'prop-types';
import RelativeDate from './RelativeDate';
import Magnitude from './Magnitude';
import {useTranslation} from 'react-i18next';

TitleRow.propTypes = {
  title: PropTypes.string.isRequired
};

function TitleRow({title}) {
  return (
    <tr>
      <td colSpan="2" className="EarthquakeTitle">{title}</td>
    </tr>
  );
}

function SeparatorRow() {
  return (
    <tr>
      <td colSpan="2" className="EarthquakeDataSeparator"/>
    </tr>
  );
}

DataRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.node
};

function DataRow({label, value}) {
  return (
    <tr className="EarthquakeDataRow">
      <td>{label}</td>
      <td className="EarthquakeDataValue">{value}</td>
    </tr>
  );
}

DateRow.propTypes = {
  timestamp: PropTypes.number.isRequired
};

function DateRow({timestamp}) {
  const {t} = useTranslation('translation');
  const label = `${t('when')}:`;
  const date = <RelativeDate timestamp={timestamp}/>;
  return (<DataRow label={label} value={date}/>);
}

MagnitudeRow.propTypes = {
  magnitude: PropTypes.number.isRequired
};

function MagnitudeRow({magnitude}) {
  const {t} = useTranslation('translation');
  const label = `${t('magnitude')}:`;
  const magnitudeComponent = <Magnitude magnitude={magnitude}/>;
  return (<DataRow label={label} value={magnitudeComponent}/>);
}

DepthRow.propTypes = {
  depth: PropTypes.number.isRequired
};

function DepthRow({depth}) {
  const {t} = useTranslation('translation');
  const label = `${t('depth')}:`;
  const km = `${t('km')}`;
  return (<DataRow label={label} value={`${depth.toFixed(2)} ${km}`}/>);
}

CoordinatesRow.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
};

function CoordinatesRow({latitude, longitude}) {
  const coordinates = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
  const {t} = useTranslation('translation');
  const lat = t('latitude');
  const long = t('longitude');
  const label = `${lat}, ${long}:`;
  return (<DataRow label={label} value={coordinates}/>);
}

EarthquakeDescription.propTypes = {
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  magnitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
};

export default function EarthquakeDescription({title, timestamp, depth, magnitude, latitude, longitude}) {
  return (
    <table className="EarthquakeDescription">
      <tbody>
      <TitleRow title={title}/>
      <SeparatorRow/>
      <DateRow timestamp={timestamp}/>
      <MagnitudeRow magnitude={parseFloat(magnitude.toFixed(1))}/>
      <DepthRow depth={depth}/>
      <CoordinatesRow latitude={latitude} longitude={longitude}/>
      </tbody>
    </table>
  );
}
