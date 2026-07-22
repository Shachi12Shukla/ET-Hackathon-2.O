const mongoose = require("mongoose");

const infrastructureSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    type:{
        type:String,
        enum:[
            "Hospital",
            "School",
            "Fire Station",
            "Shelter",
            "Police Station",
            "Government Office"
        ],
        required:true
    },

    city:{
        type:String,
        required:true
    },

    ward:{
        type:String,
        required:true
    },

    latitude:{
        type:Number,
        required:true
    },

    longitude:{
        type:Number,
        required:true
    },

    address:{
        type:String
    },

    capacity:{
        type:Number
    }
},
{
    timestamps:true
});

module.exports = mongoose.model(
    "Infrastructure",
    infrastructureSchema
);