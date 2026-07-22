const mongoose = require("mongoose");

const advisorySchema = new mongoose.Schema(
{
    city: {
        type: String,
        required: true
    },

    ward: {
        type: String,
        required: true
    },

    aqi: {
        type: Number,
        required: true
    },

    riskLevel: {
        type: String
    },

    advisory: {
        type: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Advisory", advisorySchema);