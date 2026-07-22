const Advisory = require("../models/Advisory");
const groqService = require("./groqServices");

exports.createAdvisory = async(body)=>{

    const city = body.city;
    const ward = body.ward;
    const aqi = body.aqi;

    const aiResponse =
        await groqService.generateAdvisory(
            city,
            ward,
            aqi
        );

    const saved =
        await Advisory.create({

            city,

            ward,

            aqi,

            riskLevel: aiResponse.riskLevel,

            advisory: JSON.stringify(aiResponse)

        });

    return {

        advisory: aiResponse,

        saved

    };
};