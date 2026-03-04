const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        resume: {
            type: String,
            required: true,
        },

        coverLetter: {
            type: String,
        },

        status: {
            type: String,
            enum: ["Applied", "Shortlisted", "Interview", "Rejected", "Hired"],
            default: "Applied",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);