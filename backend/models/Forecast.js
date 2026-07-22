const mongoose=require("mongoose");

const ForecastSchema=new mongoose.Schema({

    city:String,

    ward:String,

    predictionDate:Date,

    predictedPM25:Number,

    predictedPM10:Number

},{timestamps:true});

module.exports=mongoose.model("Forecast",ForecastSchema);