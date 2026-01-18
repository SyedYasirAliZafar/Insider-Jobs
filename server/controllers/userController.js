import { Job } from "../models/job.model.js";
import { JobApplication } from "../models/jobApplication.js";
import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

//  get user data

export const getUserData = async (req, res) => {
  const { id } = req.params;
  console.log(id, "User ID");

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// apply for a job

export const applyForJob = async (req, res) => {
  const { jobId } = req.body;

  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.json({
        success: false,
        message: "Already Applied",
      });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({
        success: false,
        message: "Job not Found",
      });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.json({
      success: true,
      message: "Applied Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get user applied applications

export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const application = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!application) {
      return res.json({
        success: false,
        message: "No job applications found for this user",
      });
    }

    return res.json({
      success: true,
      application,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// update user profile (resume)

export const updateUserResume = async (req, res) => {
  try {
    const userId = req.params.id; // get from params
    const resumeFile = req.file;

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    return res.json({ success: true, message: "Resume Updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


