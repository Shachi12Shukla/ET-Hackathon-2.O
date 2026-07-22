const Enforcement = require("../models/Enforcement");

exports.createViolation = async(data)=>{
    return await Enforcement.create(data);
};

exports.getAllViolations = async()=>{
    return await Enforcement.find().sort({createdAt:-1});
};

exports.getViolationById = async(id)=>{
    return await Enforcement.findById(id);
};

exports.updateViolation = async(id,data)=>{
    return await Enforcement.findByIdAndUpdate(
        id,
        data,
        {new:true}
    );
};

exports.deleteViolation = async(id)=>{
    return await Enforcement.findByIdAndDelete(id);
};