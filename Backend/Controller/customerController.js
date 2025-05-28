import { CustomerModel } from "../Model/customerModel.js";
import { validationResult } from "express-validator";
import { createJob } from "../service/customerService.js";
import { UserModel } from "../Model/userModel.js";

//  Create a new job (only by customers)
export const createJobs = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        if (req.user.role !== "customer") {
            return res.status(403).json({ message: "Only customers can create a job" });
        }

        const { title, amount, pickup, dropoff, status } = req.body;
        const customerId = req.user._id || req.user.customerId;

        if (!title || !amount || !pickup || !dropoff || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const jobDetails = await createJob({ title, amount, pickup, dropoff, customerId, status });

        if (!jobDetails) {
            return res.status(500).json({ message: "Job creation failed" });
        }

        return res.status(201).json({ message: "Job created successfully", job: jobDetails });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

//  Update an existing job
export const updateJobs = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        const { jobid } = req.params;
        const { title, amount, pickup, dropoff, status } = req.body;

        if (!title || !amount || !pickup || !dropoff || !status || !jobid) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedJob = await CustomerModel.findByIdAndUpdate(
            jobid,
            { $set: { title, amount, pickup, dropoff, status } },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found or update failed" });
        }

        return res.status(200).json({ message: "Job updated successfully", job: updatedJob });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a job
export const deleteJobs = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Job ID is required to delete" });
        }

        const deleted = await CustomerModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Job not found or already deleted" });
        }

        return res.status(200).json({ message: "Job deleted successfully", deleted });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

//select a driver 
export const assignDriver  =async(req,res,next)=>{
    const{jobid} =req.params;
    const{driverid} = req.body
    try{
        if(req.user.role!="customer"){
            return res.status(403).json({message:"only customer can assign driver"})
        }
        const job =await CustomerModel.findById(
            jobid
        );
        if(!job){
            return res.statsu(400).json({message:"no job found"})
        }
        const driver = await UserModel.findById(driverid)
        if(!driver || driver.role!="driver"){
            return res.status(400).json({message:"not driver"})
        }
        job.driverId = driver._id
        job.status = "accepted"
        await job.save();
        return res.status(200).json({message:"job assigned",job})
    }
    catch(err){
        return  res.status(500).json({message:"internal server error"})
    }
}
