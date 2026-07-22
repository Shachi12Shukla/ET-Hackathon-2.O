const service = require("../services/enforcementService");

exports.create = async(req,res)=>{
    try{
        const result = await service.createViolation(req.body);

        res.status(201).json({
            success:true,
            data:result
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }
};

exports.getAll = async(req,res)=>{
    try{

        const result = await service.getAllViolations();

        res.json({
            success:true,
            data:result
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }
};

exports.getById = async(req,res)=>{
    try{

        const result = await service.getViolationById(req.params.id);

        res.json({
            success:true,
            data:result
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }
};

exports.update = async(req,res)=>{
    try{

        const result = await service.updateViolation(
            req.params.id,
            req.body
        );

        res.json({
            success:true,
            data:result
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }
};

exports.delete = async(req,res)=>{
    try{

        await service.deleteViolation(req.params.id);

        res.json({
            success:true,
            message:"Deleted Successfully"
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }
};