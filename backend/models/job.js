const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        company: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        salary: {
            type: String,
        },

        experience: {
            type: String,
        },

        jobType: {
            type: String,
            enum: ["Full-time", "Part-time", "Internship", "Remote"],
        },

        skills: [
            {
                type: String,
                trim: true,
            },
        ],

        description: {
            type: String,
            required: true,
        },

        responsibilities: {
            type: String,
        },

        requirements: {
            type: String,
        },

        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);