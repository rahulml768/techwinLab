import express from "express";
import cors from "cors"
import { custRoutes} from "./Routes/customerRoutes.js";
import { dbConnect } from "./db/db.js";
import { userRoutes } from "./Routes/userRoutes.js";
import { driverRou } from "./Routes/driverRoutes.js";

export const app =express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
dbConnect()

app.get("/",(req,res)=>{
    res.send(`hello World`)
});

app.use("/job",custRoutes);
app.use("/user",userRoutes);
app.use("/driver",driverRou)