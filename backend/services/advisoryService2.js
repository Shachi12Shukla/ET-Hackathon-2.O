const Advisory = require("../models/Advisory");
const groqService = require("./groqService2");

exports.createAdvisory = async(body)=>{

    const { city, ward, aqi, pollutants = [], facilities = [] } = body;


    const aiResponse =
        await groqService.generateAdvisory(
            city,
            ward,
            aqi,
            pollutants,
            facilitites
        );

    const saved =
        await Advisory.create({

            city,

            ward,

            aqi,

            riskLevel: aiResponse.riskLevel?.en || "Moderate", // default to english

            advisory: JSON.stringify(aiResponse)

        });

    return {

        advisory: aiResponse,

        saved

    };
};