import express from "express"
import { body } from "express-validator";
import { createJobs,updateJobs,deleteJobs ,assignDriver} from "../Controller/customerController.js";
import { authentication } from "../Auth/authMiddleware.js";

export const custRoutes = express.Router();

custRoutes.post("/",[
    body("title").isString().withMessage("title should be string and inimum 3 charcters"),
    body("amount").isNumeric().withMessage("amount should be number"),
    body("pickup").isString().withMessage("shold be string"),
    body("dropoff").isString().withMessage("should be string")
],authentication,createJobs);

custRoutes.delete("/:id",deleteJobs)
custRoutes.put("/:id",[
    body("title").isString().withMessage("title should be string and inimum 3 charcters"),
    body("amount").isNumeric().withMessage("amount should be number"),
    body("pickup").isString().withMessage("shold be string"),
    body("dropoff").isString().withMessage("should be string")
],authentication,updateJobs);

custRoutes.put("/assign:id",authentication,assignDriver)


