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