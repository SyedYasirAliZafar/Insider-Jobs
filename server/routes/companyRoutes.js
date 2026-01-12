import express from "express";
import {
  ChangeJobApplicationStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/register", upload.single("image") , registerCompany);

router.post("/login", loginCompany);

router.get("/company", getCompanyData);

router.post("/post-job", postJob);

router.get("/applicants", getCompanyJobApplicants);

router.get("/list-jobs", getCompanyPostedJobs);

router.post("/change-status", ChangeJobApplicationStatus);

router.post("/change-visibilty", changeVisibility);

export default router