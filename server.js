import "express-async-errors"
import express from 'express'
import morgan from "morgan"

// middleware
import notFoundMiddleware from './middleware/notFoundMiddleware.js'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'

// routes
import incidentRoutes from './routes/incidentRoutes.js'

import connectDB from "./db/connect.js"

// dotenv
import dotenv from 'dotenv'
dotenv.config()


export const app = express()

// express.json
app.use(express.json())

// morgan
app.use(morgan('tiny'))


// serving doc
app.use(express.static('./public'))


// routes
app.get('/', (req,res) => {
    res.send('Welcome')
})

// incident routes
app.use('/api/v1/incidents', incidentRoutes)


// not-found
app.use(notFoundMiddleware)

// error handler
app.use(errorHandlerMiddleware)



const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, (() => {
            console.log(`Listening on port ${port}`)
        }))
    } catch (error) {
        console.log(error)
    }
}

start()

