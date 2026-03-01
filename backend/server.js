require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

/* =========================
   GLOBAL MIDDLEWARE
========================= */
app.use(
    cors({
        origin: "http://localhost:3000", // allow frontend
        credentials: true,
    })
);

app.use(express.json());

/* =========================
   DATABASE CONNECTION
========================= */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "jobboard",
        });
        console.log("✅ MongoDB Atlas Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // stop server if DB fails
    }
};

connectDB();

/* =========================
   ROUTES
========================= */
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
    res.send("🚀 JobBoard API is running...");
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});