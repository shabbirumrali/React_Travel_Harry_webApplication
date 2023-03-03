import axios from 'axios'

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (sw, ne) => {
    const {data: {data}} = await axios.get(URL, {
        params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng
        },
        headers: {
            'X-RapidAPI-Key': '7070e854dfmsha33f4dcfafa5a04p16eae9jsnc5befb3a6e7e',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    })
    return data;
   
}

