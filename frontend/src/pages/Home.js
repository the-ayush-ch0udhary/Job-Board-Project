import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data.jobs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="overflow-hidden">

      {/* HERO */}
      <section className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Discover Your <span className="text-yellow-300">Next Career Move</span>
            </h1>

            <p className="mt-6 text-lg opacity-90">
              Connect with top companies and unlock opportunities tailored to your skills.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/jobs"
                className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
              >
                Browse Jobs
              </Link>

              <Link
                to="/register"
                className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-indigo-700 transition"
              >
                Get Started
              </Link>
            </div>

            <p className="mt-8 text-lg opacity-80">
              {loading ? "Loading..." : `${jobs.length} active opportunities`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mt-12 md:mt-0"
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Team working"
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>

        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-white dark:bg-gray-800 transition">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-700">
            <h2 className="text-3xl font-bold text-indigo-600">
              {jobs.length}+
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Open Positions
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-700">
            <h2 className="text-3xl font-bold text-indigo-600">50+</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Partner Companies
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-700">
            <h2 className="text-3xl font-bold text-indigo-600">1K+</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Successful Applications
            </p>
          </div>

        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Featured Opportunities
          </h2>

          <Link
            to="/jobs"
            className="text-indigo-600 font-medium hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {jobs.slice(0, 6).map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-xl p-6 border border-gray-100 dark:border-gray-700 transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {job.title}
              </h3>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {job.company}
              </p>

              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {job.location}
              </p>

              <Link
                to={`/jobs/${job._id}`}
                className="inline-block mt-6 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;