import express from "express";
import {
  getAdminJob,
  getAllJobs,
  getJobById,
  jobPost,
} from "../controllers/job.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/post", isAuthenticated, jobPost);
router.get("/get", isAuthenticated, getAllJobs);
router.get("/get/:id", isAuthenticated, getJobById);
router.get("/getadminjobs", isAuthenticated, getAdminJob);

export default router;
