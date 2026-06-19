import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    description: { type: String },
    logo: { type: String },

    location: { type: String },
    website: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, //admin
  },
  { timestamps: true },
);

export const Company = mongoose.model("Company", companySchema);
