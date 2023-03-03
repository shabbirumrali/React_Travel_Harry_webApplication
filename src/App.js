import { useState, useEffect } from 'react'
import { getPlacesData } from './api';
import { Header, List, Map, PlaceDetails } from './components'
import { CssBaseline, Grid  } from '@mui/material'

// css file
import './App.css';

function App() {
  const [places, setPlaces] = useState([])
  const [childClick, setChildClick] = useState(null)
  
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})

  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude} }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getPlacesData(bounds.sw, bounds.ne)
    .then((data) => {
      setPlaces(data)
      setIsLoading(false)
    })
    .catch(err => console.log("this is an api error", err)) 

  }, [coordinates, bounds])

  return (
    <>
      <CssBaseline />
      <Header />
        <Grid container spacing={3} style={{width: '100%'}}>
          <Grid item xs={12} md={4}>
            <List
              places={places}
              childClick={childClick}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map
              places={places}
              setCoordinates={setCoordinates}
              coordinates={coordinates}
              setBounds={setBounds}
              setChildClick={setChildClick}
            />
          </Grid>
        </Grid>
    </>
  );
}

export default App;
