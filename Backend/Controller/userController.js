import { UserModel } from "../Model/userModel.js";
import { validationResult } from "express-validator";
import { createUser } from "../service/userService.js";

//register user
export const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        const { name, email, phone, image, password, role } = req.body;

        if (!name || !email || !phone || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await UserModel.genPassword(password);

        const userDetails = await createUser({
            name,
            email,
            phone,
            image,
            password: hashedPassword,
            role
        });

        if (!userDetails) {
            return res.status(500).json({ message: "User was not created" });
        }

        const token = userDetails.genToken();

        return res.status(201).json({ message: "User created", user: userDetails, token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

//login user
export const loginUser = async (req, res, next) => {
    try {
        const { email, phone, password } = req.body;

        if ((!email && !phone) || !password) {
            return res.status(400).json({ message: "Email or phone and password are required" });
        }

        const user = await UserModel.findOne({
            $or: [
                { email: email },
                { phone: phone }
            ]
        }).select("+password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.verifyPassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = user.genToken();

        return res.status(200).json({ message: "Login successful", user, token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
