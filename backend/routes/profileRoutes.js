const express = require("express");
const CandidateProfile = require("../models/CandidateProfile");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   GET MY PROFILE
========================= */
router.get("/me", protect, authorize("candidate"), async (req, res) => {
  try {
    let profile = await CandidateProfile.findOne({
      userId: req.user._id,
    });

    // 🔥 If profile does not exist → create empty one
    if (!profile) {
      profile = await CandidateProfile.create({
        userId: req.user._id,
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   UPDATE PROFILE
========================= */
router.put("/me", protect, authorize("candidate"), async (req, res) => {
  try {
    let profile = await CandidateProfile.findOne({
      userId: req.user._id,
    });

    // 🔥 If profile does not exist → create it
    if (!profile) {
      profile = await CandidateProfile.create({
        userId: req.user._id,
      });
    }

    // Update fields manually (safe way)
    profile.phone = req.body.phone;
    profile.education = req.body.education;
    profile.experience = req.body.experience;
    profile.skills = req.body.skills;
    profile.linkedin = req.body.linkedin;
    profile.github = req.body.github;
    profile.bio = req.body.bio;

    await profile.save();

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;