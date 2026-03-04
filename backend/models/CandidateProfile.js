const mongoose = require("mongoose");

const candidateProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    phone: {
      type: String,
    },

    skills: [
      {
        type: String,
      },
    ],

    education: {
      type: String,
    },

    experience: {
      type: String,
    },

    linkedin: {
      type: String,
    },

    github: {
      type: String,
    },

    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CandidateProfile", candidateProfileSchema);