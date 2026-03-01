const router = require("express").Router();
const Application = require("../models/Application");

/* APPLY TO JOB */
router.post("/", async (req, res) => {
    try {
        const application = new Application(req.body);
        const saved = await application.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: "Failed to submit application" });
    }
});

/* GET ALL APPLICATIONS (optional for admin) */
router.get("/", async (req, res) => {
    try {
        const applications = await Application.find().populate("jobId");
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch applications" });
    }
});

module.exports = router;