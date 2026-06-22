import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  getMe,
  getUsers,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/me", isAuthenticated, getMe);
router.get("/getMe", isAuthenticated, getMe);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isAuthenticated, updateProfile);

export default router;
