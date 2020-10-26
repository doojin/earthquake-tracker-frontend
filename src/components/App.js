import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GoogleMap from 'google-map-react';
import './App.css';

function EarthquakeMarker(props) {
  let color

  if (props.magnitude > 4) {
    color = 'red'
  } else if (props.magnitude > 3) {
    color = 'orange'
  } else if (props.magnitude > 2) {
    color = 'yellow'
  } else {
    color = 'green'
  }

  const size = '7px'

  return (
    <div style={{ width: size, height: size, backgroundColor: color }} />
  )
}

function App() {
  const API_KEY = 'AIzaSyDMVX2ME7QpqJWf6hGmGoNY7wqTHJFO9wo';

  const [earthquakes, setEarthquakes] = useState([])
  const effectDependency = JSON.stringify(earthquakes)

  useEffect(() => {
    (async () => {
      const response = await fetch('/earthquakes?limit=300')
      const data = await response.json()
      setEarthquakes(data.data)
    })()
  }, [effectDependency])

  return (
    <Container fluid style={{ height: '100%' }}>
      <Row style={{ height: '100%' }}>
        <Col xs={ 3 } />
        <Col xs={ 9 }>
          <div style={{ height: '100%', width: '100%' }}>
            <GoogleMap defaultCenter={{ lat: 51.95, lng: 30.33 }}
                       defaultZoom={ 1 }
                       bootstrapURLKeys={{ key: API_KEY }}>

              {
                earthquakes.map(earthquake => {
                  const { longitude, latitude } = earthquake.position
                  const key = `${longitude}_${latitude}_${earthquake.timestamp}_${earthquake.title}`
                  return <EarthquakeMarker key={ key }
                                           lng={ longitude }
                                           lat={ latitude }
                                           timestamp={ earthquake.timestamp }
                                           magnitude={ earthquake.magnitude }
                                           title={ earthquake.title } />
                })
              }
            </GoogleMap>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
