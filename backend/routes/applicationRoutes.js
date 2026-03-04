const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const Application = require("../models/Application");
const Job = require("../models/job");
const CandidateProfile = require("../models/CandidateProfile");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   APPLY TO JOB (Candidate Only)
========================= */
router.post(
  "/",
  protect,
  authorize("candidate"),
  upload.single("resume"),
  async (req, res) => {
    try {
      const { jobId, coverLetter } = req.body;

      if (!req.file) {
        return res
          .status(400)
          .json({ message: "Resume file is required (PDF only)" });
      }

      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      const existingApplication = await Application.findOne({
        jobId,
        userId: req.user._id,
      });

      if (existingApplication) {
        return res
          .status(400)
          .json({ message: "You already applied to this job" });
      }

      const application = await Application.create({
        jobId,
        userId: req.user._id,
        resume: req.file.path,
        coverLetter,
      });

      res.status(201).json({
        success: true,
        application,
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* =========================
   GET MY APPLICATIONS (Candidate Dashboard)
========================= */
router.get("/my", protect, authorize("candidate"), async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.user._id,
    })
      .populate("jobId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      applications,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   EMPLOYER: VIEW APPLICANTS FOR A JOB
========================= */
router.get(
  "/job/:jobId",
  protect,
  authorize("recruiter", "admin"),
  async (req, res) => {
    try {
      const job = await Job.findById(req.params.jobId);

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      if (job.postedBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const applications = await Application.find({
        jobId: req.params.jobId,
      })
        .populate({
          path: "userId",
          select: "name email",
        })
        .sort({ createdAt: -1 });

      // Attach candidate profile to each application
      const applicationsWithProfile = await Promise.all(
        applications.map(async (app) => {
          const profile = await CandidateProfile.findOne({
            userId: app.userId._id,
          });

          return {
            ...app.toObject(),
            profile,
          };
        })
      );

      res.status(200).json({
        success: true,
        applications: applicationsWithProfile,
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* =========================
   UPDATE APPLICATION STATUS (Employer Only)
========================= */
router.put(
  "/:id/status",
  protect,
  authorize("recruiter", "admin"),
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        "Applied",
        "Shortlisted",
        "Interview",
        "Rejected",
        "Hired",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      const application = await Application.findById(req.params.id);

      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      const job = await Job.findById(application.jobId);

      if (job.postedBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }

      application.status = status;
      await application.save();

      res.status(200).json({
        success: true,
        application,
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;