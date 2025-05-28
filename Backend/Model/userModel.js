import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name should be minimum 3 characters long"],
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    minlength: [5, "Email should be minimum 5 characters long"],
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [5, "Password should be minimum 5 characters long"],
    select: false,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["driver", "customer"],
    default: "customer",
  },
  
}, { timestamps: true }); 




userSchema.statics.genPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};


userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.genToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role, status: this.status },
    process.env.TOKEN_KEY,
    { expiresIn: "24h" }
  );
};

export const UserModel = mongoose.model("users", userSchema);
