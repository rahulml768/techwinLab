import jwt from "jsonwebtoken"
import { UserModel } from "../Model/userModel.js"

//authentication for checking token
export const authentication = async(req,res,next)=>{
const token = req.headers.authorization.split(" ")[1]
if(!token){
    return res.status(401).json({message:"error authentication"})
}
try{
   const decoded = jwt.verify(token,process.env.TOKEN_KEY)
   req.user = await UserModel.findById(decoded.id)
   next();
}
catch(err){

}
}