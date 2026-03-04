const express = require("express");
const Job = require("../models/job");
const Application = require("../models/Application");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   CREATE JOB (Employer Only)
========================= */
router.post("/", protect, authorize("recruiter", "admin"), async (req, res) => {
    try {
        const {
            title,
            company,
            location,
            description,
            salary,
            experience,
            jobType,
            skills,
            responsibilities,
            requirements,
        } = req.body;

        const job = await Job.create({
            title,
            company,
            location,
            description,
            salary,
            experience,
            jobType,
            skills,
            responsibilities,
            requirements,
            postedBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            job,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* =========================
   EMPLOYER DASHBOARD - GET MY JOBS
========================= */
router.get("/my-jobs", protect, authorize("recruiter", "admin"), async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user._id })
            .sort({ createdAt: -1 });

        const jobsWithApplicants = await Promise.all(
            jobs.map(async (job) => {
                const applicantCount = await Application.countDocuments({
                    jobId: job._id,
                });

                return {
                    ...job.toObject(),
                    applicantCount,
                };
            })
        );

        res.status(200).json({
            success: true,
            jobs: jobsWithApplicants,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* =========================
   UPDATE JOB (Only Owner)
========================= */
router.put("/:id", protect, authorize("recruiter", "admin"), async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this job" });
        }

        Object.assign(job, req.body);
        await job.save();

        res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* =========================
   DELETE JOB (Only Owner)
========================= */
router.delete("/:id", protect, authorize("recruiter", "admin"), async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this job" });
        }

        await job.deleteOne();

        res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* =========================
   GET ALL JOBS (Search + Filter + Pagination)
========================= */
router.get("/", async (req, res) => {
    try {
        const { keyword, location, minSalary, maxSalary, page = 1, limit = 5 } = req.query;

        const query = {};

        if (keyword) {
            query.title = { $regex: keyword, $options: "i" };
        }

        if (location) {
            query.location = { $regex: location, $options: "i" };
        }

        if (minSalary || maxSalary) {
            query.salary = {};
            if (minSalary) query.salary.$gte = Number(minSalary);
            if (maxSalary) query.salary.$lte = Number(maxSalary);
        }

        const jobs = await Job.find(query)
            .populate("postedBy", "name email")
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const total = await Job.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit),
            jobs,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* =========================
   GET SINGLE JOB
========================= */
router.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("postedBy", "name email");

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;