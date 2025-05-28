import { CustomerModel } from "../Model/customerModel.js"


//fetch the jobs
export const fectchJobs = async(req,res,next)=>{
    try{
      if(req.user.role!="driver"){
        return res.status(403).json({message:"only driver cans see job"})
      }
      const jobs = await CustomerModel.find({
        status:"pending"
      }).populate("name","email","phone");
      if(!jobs){
        return res.status(404).json({message:"no jobs are available"})
      }
      return res.status(200).json({message:"all the jobs",jobs})

    }
    catch(err){
        return res.status(500).json({error:"internal server errro"})
        next();
    }
}

//applied the jobs
export const applyJobs = async(req,res,next)=>{
try{
    if(req.user.role!="driver"){
        return res.status(403).json({message:"only driver cans apply job"})
      }
      const jobid = req.params.id || req.user.job_id
      const job = CustomerModel.findById(jobid)
      if(!job){
        return res.status(404).json({message:"no jobs are there for thi id"})
      }
      if(job.status!="pending"){
        return res.status(400).json({message:"this is not pending"})
      }

      const jobapplied = CustomerModel.findByIdAndUpdate(jobid,
        {$set:{status:"applied"}},
        {new:true}
        );
        return res.status(200).json({message:"job applied"})

}
catch{

}
}