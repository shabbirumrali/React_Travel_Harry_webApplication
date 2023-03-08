import axios from 'axios'

export const getPlacesData = async (type, sw, ne) => {
    const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng
        },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_GETPLACES_API_KEY,
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    })
    return data;
}

export const getWeatherData = async (city) => {
    try {
        console.log("checking city value",city)
        const { data } = await axios.get('https://weatherapi-com.p.rapidapi.com/forecast.json', {
            params: {q: `${city}`, days: '3'},
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_WEATHER_API_KEY,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        })
        return data
    }
    catch(err) {
        console.log("this is weather api error", err)
    }
}

