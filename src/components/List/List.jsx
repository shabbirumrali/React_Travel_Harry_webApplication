import { useState, createRef, useEffect } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import PlaceDetails from '../PlaceDetails/PlaceDetails'

// CSS file
import './List.css'


const List = ({ places, childClick, isLoading, type, setType, rating, setRating }) => {

  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    const refs = Array(places.length).fill().map((_, i) => elRefs[i] || createRef())
    setElRefs(refs)
  }, [places])

  return (
    <div className="container">
      <Typography variant='h5'>Restaurents, Hotels & Attractions around you</Typography>
      { isLoading ? (
        <div className="loading">
          <CircularProgress size='5rem' />
        </div>
      ) : (
        <>
          <FormControl className='form-control'>
            <InputLabel>Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
            </Select>
          </FormControl>

          <FormControl className='form-control'>
            <InputLabel>Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="0">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} className='list'>
            {places?.map((place, i) => (
                <Grid my={2} className='card-container' item key={i} xs={12}>
                  <PlaceDetails 
                    className="card_slabs" 
                    selected={Number(childClick) === i}
                    refProp={elRefs[i]}
                    place={place} 
                    isLoading={isLoading}
                  />
                </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  )
}

export default List