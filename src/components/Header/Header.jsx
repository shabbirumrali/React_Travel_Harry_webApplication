import { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

// CSS file
import './styles.css'
import { Padding } from '@mui/icons-material';

const Header = ({ setCoordinates }) => {
  const [autocomplete, setAutocomplete] = useState(null)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lat()
    setCoordinates({lat, lng})
  }

  return (
      <AppBar position="static">
        <Toolbar className="navigation">
          <Typography className="navigation_logo" variant="h5">
            Travel Harry
          </Typography>
          <Box display="flex" className="navigation_content">
            <Typography variant="h6" className="navigation_text">Explore new places</Typography>
            <Autocomplete 
              onLoad={(autoC) => setAutocomplete(autoC)}
              onPlaceChanged={onPlaceChanged}
            >
              <div className="navigation_search_box">
                <InputBase placeholder="Search..." />
                <div className="navigation_search_icon">
                  <SearchRoundedIcon />
                </div>
              </div>
            </Autocomplete>
          </Box>
        </Toolbar>
      </AppBar>
  )
}

export default Header