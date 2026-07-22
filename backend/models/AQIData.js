const mongoose = require("mongoose");

const AQIDataSchema = new mongoose.Schema({

    city: {
        type: String,
        required: true
    },

    ward: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    PM25: Number,

    PM10: Number,

    NO: Number,

    NO2: Number,

    NOx: Number,

    NH3: Number,

    CO: Number,

    SO2: Number,

    O3: Number,

    AQI: Number,

    AQIBucket: String,

    temperature: Number,

    humidity: Number,

    windSpeed: Number,

    windDirection: Number,

    rainfall: Number

}, {
    timestamps: true
});

module.exports = mongoose.model("AQIData", AQIDataSchema);