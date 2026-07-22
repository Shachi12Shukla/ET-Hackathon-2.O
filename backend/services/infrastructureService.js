const Infrastructure=require("../models/Infrastructure");

exports.create=async(data)=>{
    return await Infrastructure.create(data);
};

exports.getAll=async()=>{
    return await Infrastructure.find();
};

exports.getById=async(id)=>{
    return await Infrastructure.findById(id);
};

exports.update=async(id,data)=>{
    return await Infrastructure.findByIdAndUpdate(
        id,
        data,
        {new:true}
    );
};

exports.delete=async(id)=>{
    return await Infrastructure.findByIdAndDelete(id);
};


exports.evaluateSuspensions = async (city, threshold = 250) => {

    const res = await axios.get(
        `http://localhost:8000/api/v1/forecast/${city}/wards`
    );

    const forecasts = res.data.forecastWards;

    const highRiskWards = forecasts
        .filter(w => w.aqi >= threshold)
        .map(w => String(w.ward_no));

    //  suspended permits -> active permits in safe wards
    await Infrastructure.updateMany(
        {
            ward: { $nin: highRiskWards },
            status: "Suspended (Recommended)"
        },
        {
            $set: {
                status: "Active"
            }
        }
    );

     // active permits -> suspended permits in high-risk wards
    await Infrastructure.updateMany(
        {
            ward: { $in: highRiskWards },
            status: "Active"
        },
        {
            $set: {
                status: "Suspended (Recommended)"

            }
        }
    );

    return await Infrastructure.find({
        status: "Suspended (Recommended)"
    });
};