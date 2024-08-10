import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/bad-request.js'
import Incident from '../models/Incident.js'
import getWeatherData from '../utils/getWeatherData.js'
import _ from 'lodash'

const createIncidentReport = async (req,res) => {
    const {client_id, incident_desc, city, country} = req.body

    if(!client_id || !incident_desc || !city || !country){
        throw new BadRequestError('Some values were not provided')
    }

    // checking for weather data
    const wheatherReport = await getWeatherData(country)
    if(!wheatherReport){
       throw new BadRequestError('Something went wrong try again later')
    }

     // fetch weather
     const incident = await Incident.create({...req.body, wheatherReport})
     res.status(StatusCodes.CREATED).json({incident})
}

const getAllReports = async (req,res) => {
    const incidents = await Incident.find({}).sort('-updatedAt')
    res.status(StatusCodes.OK).json({incidents, count : incidents.length})
}

const filterReports = async (req,res) => {
    const {country, humidity, temperature, city} = req.query

    let query = {}

    if(country) query.country = country
    if(city) query.city = city
    if(humidity) query['wheatherReport.main.humidity'] = { $lte : parseFloat(humidity)}
    // if(temperature) query['weather_report.main.temp'] = { $lte : parseFloat(temperature)}


    query = _.pickBy(query, _.identity)

    const filteredReports = await Incident.find(query)

    res.status(StatusCodes.OK).json({incident : filteredReports, count : filteredReports.length})

}

export { createIncidentReport, getAllReports, filterReports}