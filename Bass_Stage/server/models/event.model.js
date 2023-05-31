const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "title is required"],
        minlength: [3, "title must be at least 3 chars long"],
    },

    description: {
        type: String,
        required: [true, "description is required"],
        minlength: [3, "description must be at least 3 chars long"],
        maxlength: [100, "description must be under 100 chars long"],
    },

    startDate: {
        type: Date,
        required: [true, "start date is required"],
    },

    endDate: {
        type: Date,
        required: [true, "end date is required"],
    },

    venueName: {
        type: String,
        required: [true, "venue name is required"],
    },

    country: {
        type: String,
        required: [true, "country is required"],
    },

    lineup: {
        type: String,
        required: false, 
    },

    favoritePerformance: {
        type: String,
        required: false, 
    },

    rating: {
        type: Number,
        required: false, 
    },

    notes: {
        type: String,
        required: false, 
    },
    top10:{
        type: Boolean,
        required: false,
    }

}, {timestamps: true })

module.exports = mongoose.model('Event', EventSchema)
