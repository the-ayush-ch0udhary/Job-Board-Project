import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs").then((res) => setJobs(res.data));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-24">
        <h1 className="text-5xl font-bold">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 text-lg">
          Discover thousands of job opportunities from top companies
        </p>

        <div className="mt-8">
          <input
            placeholder="Search by job title, company, or location..."
            className="w-2/3 p-4 rounded-lg text-black"
          />
        </div>

        <p className="mt-6 text-lg">
          {jobs.length} jobs available
        </p>
      </div>

      {/* Featured Jobs */}
      <div className="px-16 py-16">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Featured Jobs</h2>

          <Link
            to="/jobs"
            className="text-blue-600 hover:underline"
          >
            View All Jobs →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {jobs.slice(0, 6).map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold">
                {job.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {job.company}
              </p>

              <p className="text-gray-500">
                {job.location}
              </p>

              <Link
                to={`/jobs`}
                className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-lg"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg"
          >
            View All {jobs.length} Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;