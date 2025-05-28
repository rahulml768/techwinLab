import mongoose from "mongoose"
import "dotenv/config"

export const dbConnect = async()=>{
try{
    await mongoose.connect(process.env.DATABASE)
    console.group("databse is connected")
    mongoose.set("debug",true)
}
catch(err){
console.log("database is not connected")
process.exit();
}

}