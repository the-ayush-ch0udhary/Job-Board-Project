const router = require("express").Router();
const Job = require("../models/job");

/* =========================
   CREATE NEW JOB
========================= */
router.post("/", async (req, res) => {
    try {
        const job = new Job(req.body);
        const savedJob = await job.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create job",
            error: error.message,
        });
    }
});

/* =========================
   GET ALL JOBS
   WITH SEARCH + FILTER
========================= */
router.get("/", async (req, res) => {
    try {
        const { search, location } = req.query;

        let query = {};

        // Search by job title
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        // Filter by location
        if (location) {
            query.location = { $regex: location, $options: "i" };
        }

        const jobs = await Job.find(query).sort({ createdAt: -1 });

        res.json(jobs);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch jobs",
            error: error.message,
        });
    }
});

/* =========================
   GET SINGLE JOB BY ID
========================= */
router.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({
            message: "Invalid Job ID",
            error: error.message,
        });
    }
});

module.exports = router;