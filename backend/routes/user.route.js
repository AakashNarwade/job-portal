import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  getUsers,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isAuthenticated, updateProfile);

export default router;
