import { useState, useEffect } from 'react'
import { getPlacesData, getWeatherData } from './api';
import { Header, List, Map, PlaceDetails } from './components'
import { CssBaseline, Grid  } from '@mui/material'

// css file
import './App.css';

function App() {
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [childClick, setChildClick] = useState(null)
  
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')
  const [weatherData, setWeatherData] = useState([])

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude} }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
      const filteredPlaces = places.filter((place) => place.rating > rating)
      setFilteredPlaces(filteredPlaces)
  }, [rating])

  useEffect(() => {
    if(bounds.sw && bounds.ne) {
      setIsLoading(true)

      getWeatherData('london')
      .then((data) => {
        setWeatherData(data)
        console.log("weather Info ", data)
      })

      getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => {
        setPlaces(data?.filter(place => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setIsLoading(false)
        console.log("Data from api", data)
      })
      .catch(err => console.log("this is an api error", err))
      }
  }, [type, bounds])

  console.log(places)
  console.log(filteredPlaces)

  return (
    <>
      <CssBaseline />
      <Header 
        setCoordinates={setCoordinates}
      />
        <Grid container spacing={3} style={{width: '100%'}}>
          <Grid item xs={12} md={4}>
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
              childClick={childClick}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map
              places={filteredPlaces.length ? filteredPlaces : places}
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
