const service=require("../services/infrastructureService");

exports.create=async(req,res)=>{
    try{

        const result=await service.create(req.body);

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

exports.getAll=async(req,res)=>{
    try{

        const result=await service.getAll();

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

exports.getById=async(req,res)=>{
    try{

        const result=await service.getById(req.params.id);

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

exports.update=async(req,res)=>{
    try{

        const result=await service.update(
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

exports.delete=async(req,res)=>{
    try{

        await service.delete(req.params.id);

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