import mongoose from "mongoose";

//customer schema
const customerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, "Title should be at least 3 characters long"],
  },
  amount: {
    type: Number,
    required: true,
  },
  pickup: {
    type: String,
    required: true,
  },
  dropoff: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["applied", "pending", "accepted", "completed"],
    default: "pending",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null,
  },
}, { timestamps: true });


export const CustomerModel = mongoose.model("customers", customerSchema);
