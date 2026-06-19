import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enums: ["recruiter", "jobSeeker"],
      required: true,
    },
    profile: {
      bio: { type: String },
      resume: { type: String }, //url
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilPhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
