import { Job } from "../models/job.model.js";
import { JobApplication } from "../models/jobApplication.js";
import { User } from "../models/user.model.js";

//  get user data

export const getUserData = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const user = await User.find(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not Found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
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

export const getUserJobApplications = async (req, res) => {};

// update user profile (resume)

export const updateUserResume = async (req, res) => {};
