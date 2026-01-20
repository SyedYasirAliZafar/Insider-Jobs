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
  try {
    const { jobId } = req.body;
    const userId = req.params.id; // <-- userId from URL params

    if (!jobId) {
      return res.json({ success: false, message: "Job ID is required" });
    }

    // Check user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check already applied
    const alreadyApplied = await JobApplication.findOne({ jobId, userId });
    if (alreadyApplied) {
      return res.json({ success: false, message: "Already Applied" });
    }

    // Check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.json({ success: false, message: "Job not Found" });
    }

    // Create application
// create application and store in a variable
const application = await JobApplication.create({
  companyId: job.companyId,
  userId,
  jobId,
  date: new Date(),
});

// return response with the created object
return res.json({ success: true, message: "Applied Successfully", application });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Get user applied applications

export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.params.id; // must match what was stored in JobApplication.userId

    if(!userId){
      return ("Id not found")
    }

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
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
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
