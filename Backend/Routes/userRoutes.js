import express from "express"
import {body} from "express-validator"
import { registerUser,loginUser } from "../Controller/userController.js"


export const userRoutes = express.Router()

userRoutes.post("/register",[
    body("name").isLength().withMessage("must me min 3 character"),
    body("email").isEmail().isLength().withMessage("must me minimum 6 character"),
    body("phone") .isLength({ min: 10, max: 10 }).withMessage("must me exact 10 digit long"),
    body("password").isLength().withMessage("must be mimimum 5 chacrter long")
],registerUser);

userRoutes.post("/login",loginUser)