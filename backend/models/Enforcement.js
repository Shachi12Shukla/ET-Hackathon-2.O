const mongoose = require("mongoose");

const enforcementSchema = new mongoose.Schema(
{
    city:{
        type:String,
        required:true
    },

    ward:{
        type:String,
        required:true
    },

    location:{
        type:String,
        required:true
    },

    violationType:{
        type:String,
        enum:[
            "Construction Dust",
            "Industrial Emission",
            "Garbage Burning",
            "Vehicle Pollution",
            "Other"
        ],
        required:true
    },

    severity:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Low"
    },

    description:{
        type:String
    },

    status:{
        type:String,
        enum:["Pending","Investigating","Resolved"],
        default:"Pending"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Enforcement", enforcementSchema);