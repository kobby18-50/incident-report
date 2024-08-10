import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema({
    client_id : {
        type : Number,
        unique : [true, 'This id has already been used try a different one'],
        required : [true, 'Client Id is required']
    },

    incident_desc : {
        type : String,
        required : [true, 'Incident Description is required'],
        minlength : [10, 'Minimum length of incident description is 10 characters']
    },

    city : {
        type : String,
        required : [true, 'City is required'],
    },

    country : {
        type : String,
        required : [true, 'Country is required']
    },

    wheatherReport : Object
})

export default mongoose.model('Incident', IncidentSchema)