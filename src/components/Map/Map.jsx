import GoogleMapReact from 'google-map-react'
import {Rating, Paper, Typography, useMediaQuery } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import Restaurent from '../../assets/restaurent.jpg'
import mapStyles from './mapStyles'

// CSS styles
import './Map.css'

const Map = ({ coordinates, setBounds, setCoordinates, places, setChildClick, weatherData }) => {
  const isDekstop = useMediaQuery('(min-width: 600px)')
  
  return (
    <div className="mapContainer">
      <GoogleMapReact 
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={ coordinates }
        center={ coordinates }
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
        onChildClick={child => setChildClick(child)}
      >
        {places?.map((place, i) => (
          <div key={i} lat={Number(place.latitude)} lng={Number(place.longitude)} className="marker-container">
            {
              !isDekstop ? (
                <LocationOnOutlinedIcon color="primary" fontSize='large' />
              ):(
                <Paper elevation={3} className='paper'>
                  <Typography className='typography' variant='subtitle2' gutterBottom>{place.name}</Typography>
                  <img className="pointer" alt={place.name} src={place.photo ? place.photo.images.large.url : `${Restaurent}`} />
                  <Rating size='small' value={Number(place.rating)} readOnly />
                </Paper>
              )
            }
          </div>
        ))}
        <div className="weather_detail">
          <img src={weatherData.current.condition.icon} />
        </div>
      </GoogleMapReact>
    </div>
  )
}

export default Map