import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs/my-jobs");
        setJobs(res.data.jobs);
      } catch {
        toast.error("Failed to load your jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white">
          My Posted Jobs
        </h1>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {job.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {job.location}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Posted on {new Date(job.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/jobs/${job._id}`}
                  className="text-indigo-600 hover:underline"
                >
                  View Details
                </Link>

                <Link
                  to={`/job-applicants/${job._id}`}
                  className="text-green-600 hover:underline"
                >
                  View Applicants ({job.applicantCount || 0})
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default MyJobs;