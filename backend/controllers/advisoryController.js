const service = require("../services/advisoryService");

exports.generate = async(req,res)=>{

    try{

        const result =
            await service.createAdvisory(req.body);

        res.status(200).json({

            success:true,

            data:result

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};