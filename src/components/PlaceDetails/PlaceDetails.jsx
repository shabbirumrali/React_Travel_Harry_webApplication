import React from 'react'
import { Button, Box, Typography, Card, CardMedia, CardContent, CardActions, Chip, Rating } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

import Restaurent from '../../assets/restaurent.jpg'
// CSS file
import './PlaceDetails.css'

const PlaceDetails = ({ place, refProp, selected }) => {

  if(selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  
  return (
    <Card elevation={6} className="">
        <CardMedia
          style={{ height: 350 }}
          image={place.photo ? place.photo.images.large.url : `${Restaurent}`}
          title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5'>{place.name}</Typography>
          <Box display='flex' justifyContent="space-between">
            <Rating size='small' value={Number(place.rating)} readOnly />
            <Typography gutterBottom variant='subtitle2'>out of {place.num_reviews} reviews</Typography>
          </Box>
          <Box display='flex' justifyContent="space-between">
            <Typography variant='subtitle1'>Price</Typography>
            <Typography gutterBottom variant='subtitle2'>{place.price_level}</Typography>
          </Box>
          <Box display='flex' justifyContent="space-between">
            <Typography variant='subtitle1'>Ranking</Typography>
            <Typography gutterBottom variant='subtitle2'>{place.ranking}</Typography>
          </Box>

            {place?.cuisine?.map(c=> (
              <Chip key={c.name} size='small' label={c.name} className='chip' />
            ))}
            {place?.address && (
              <Typography gutterBottom variant='body2' color="textSecondary" className='subtitle'>
                <LocationOnOutlinedIcon /> {place.address}
              </Typography>
            )}
            {place?.phone && (
              <Typography gutterBottom variant='body2' color="textSecondary" className='spacing'>
                <LocalPhoneOutlinedIcon /> {place.phone}
              </Typography>
            )}
            <CardActions>
              <Button variant='contained' size='small' color='secondary' onClick={() => window.open(place.web_url, '_blank')}>Trip Advisor</Button>
              <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>Website</Button>
            </CardActions>
        </CardContent>
    </Card>
  )
}

export default PlaceDetails