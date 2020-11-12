import React, { useEffect, useState } from 'react';
import EarthquakeMap from './EarthquakeMap';
import Container from './Container';

function App() {
  const API_KEY = 'AIzaSyDMVX2ME7QpqJWf6hGmGoNY7wqTHJFO9wo';

  const [earthquakes, setEarthquakes] = useState([]);
  const effectDependency = JSON.stringify(earthquakes);

  useEffect(() => {
    (async () => {
      const response = await fetch('/earthquakes?limit=100');
      const data = await response.json();
      setEarthquakes(data.data);
    })();
  }, [effectDependency]);

  const earthquakeMap = (
    <EarthquakeMap earthquakes={ earthquakes }
                   apiKey={ API_KEY }
                   center={{ latitude: 30, longitude: -85 }}/>
  );

  return (
    <Container leftColumn={{ size: 3, children: '' }}
               rightColumn={{ size: 9, children: earthquakeMap }}/>
  );
}

export default App;
