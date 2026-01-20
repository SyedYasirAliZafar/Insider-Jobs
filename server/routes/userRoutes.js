import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/user/:id", getUserData);

router.post("/apply/:id", applyForJob);

router.get("/applications/:id", getUserJobApplications);

router.post("/update-resume/:id", upload.single('resume') ,updateUserResume);


export default router;