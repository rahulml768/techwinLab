import { UserModel } from "../Model/userModel.js";

//create user
export const createUser = async({name,email,phone,image,password,role})=>{
    try{
         const user = await UserModel.create({name,email,phone,image,password,role})
         return user;
    }
    catch(err){
        console.log("user not created")
        throw new Error("user not created")
    }
}