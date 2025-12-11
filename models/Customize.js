// models/Customize.js
import mongoose from "mongoose";

const customizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    template: {
      type: String,
      enum: ["business", "portfolio", "ecommerce", "other"],
      required: true,
    },
    hosting: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    budget: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Customize = mongoose.model("Customize", customizeSchema);

export default Customize;
