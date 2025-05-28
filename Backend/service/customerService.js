import { CustomerModel } from "../Model/customerModel.js";

//create job
export const createJob = async({title,amount,pickup,dropoff,customerId,status})=>{
    try{
        const job = await CustomerModel.create({title,amount,pickup,dropoff,customerId,status});
        return job
    }
    catch(err){
        throw new Error("jobs not created");
    }
};