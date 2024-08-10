import axios from "axios";

const getWeatherData = async (country) => {

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.API_KEY}`)
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}

export default getWeatherData