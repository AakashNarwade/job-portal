import mongoose from "mongoose";

const userSchema = new mongoose.userSchema(
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
      unique: true,
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
      company: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
      profilPhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
