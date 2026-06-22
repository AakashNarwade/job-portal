import { Job } from "../models/job.model.js";

export const jobPost = async (req, res) => {
  try {
    const {
      title,
      jobType,
      companyId,
      experience,
      description,
      requirements,
      position,
      location,
      created_by,
    } = req.body;
    if (
      !title ||
      !jobType ||
      !companyId ||
      !experience ||
      !description ||
      !requirements ||
      !position ||
      !location ||
      !created_by
    ) {
      return res
        .status(401)
        .json({ message: "Something missing", success: false });
    }
    const job = await Job.create({
      title,
      experienceLevel: experience,
      jobType,
      company: companyId,
      description,
      requirements,
      position,
      location,
      created_by: req.id,
    });
    return res
      .status(200)
      .json({ message: "Job Posted Successfully", success: true, job });
  } catch (error) {
    console.log("error-> ", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const userId = req.id;
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    // const jobs = await Job.find({ created_by: userId });
    console.log("get all jobs => ", jobs);
    if (!jobs || jobs.length == 0) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    res
      .status(200)
      .json({ message: "All jobs fetched successfully!", success: true, jobs });
  } catch (error) {
    console.log("error-> ", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job || job.length == 0) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Got job by jobId", success: true, job });
  } catch (error) {
    console.log("error-> ", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getAdminJob = async (req, res) => {
  try {
    const userId = req.id;
    const job = await Job.find({ created_by: userId });
    if (!job || job.length == 0) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Job fetched successfully ! ", success: true, job });
  } catch (error) {
    console.log("error-> ", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
