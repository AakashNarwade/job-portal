import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("error-> ", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const register = async (req, res) => {
  const { fullName, email, password, role, phoneNumber } = req.body;
  try {
    if (!fullName || !email || !password || !role || !phoneNumber) {
      return res.status(400).json({
        message: "Missing input",
        success: false,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const alreadyPresent = await User.findOne({ email: normalizedEmail });

    if (alreadyPresent) {
      return res.status(409).json({
        message: "User is already registered",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      fullName,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      phoneNumber,
    });

    return res.status(201).json({
      message: "Registered successfully",
      success: true,
    });
  } catch (error) {
    console.log("error-> ", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(401).json({
        message: "Missing input",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    //check role
    if (role != user.role) {
      return res.status(401).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({ message: `Welcome back ${user.fullName}`, success: true, user });
  } catch (error) {
    console.log("error=> ", error);
    // return res.status()
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", " ", { maxAge: "0" })
      .json({ message: "Logged out successfully ", success: true });
  } catch (error) {
    console.log("error =>", error);
  }
};

export const updateProfile = async (req, res) => {
  const { fullName, email, bio, skills, phoneNumber, role } = req.body;
  const file = req.file;

  try {
    const skillsArrays = skills?.split(" ");
    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

    //updating user

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (skills) user.profile.skills = skillsArrays;
    if (bio) user.profile.bio = bio;
    if (role) user.role = role;

    await user.save();
    user = {
      _id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "Profile updated successfuly",
      success: true,
    });
  } catch (error) {
    console.log("error=> ", error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No records found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      users,
    });
  } catch (error) {
    console.log("error=> ", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
