import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EarthquakeMap from './EarthquakeMap';

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

  return (
    <Container fluid style={{ height: '100%' }}>
      <Row style={{ height: '100%' }}>
        <Col xs={ 3 } />
        <Col xs={ 9 }>
          <EarthquakeMap earthquakes={ earthquakes }
                         apiKey={ API_KEY }
                         center={{ latitude: 30, longitude: -85 }}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
