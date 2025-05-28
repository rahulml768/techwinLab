import express from "express"
import {fectchJobs,applyJobs} from "../Controller/driverController.js"
import {authentication} from "../Auth/authMiddleware.js"

export const driverRou = express.Router();


driverRou.get("/",authentication,fectchJobs);
driverRou.post("/apply/:id",authentication,applyJobs);