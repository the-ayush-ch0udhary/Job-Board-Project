import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";
import toast from "react-hot-toast";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          `/jobs?keyword=${keyword}&location=${location}&page=${page}`
        );

        setJobs(res.data.jobs);
        setTotalPages(res.data.totalPages);
      } catch {
        toast.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, keyword, location]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold mb-12 text-gray-800 dark:text-white text-center">
          Explore Opportunities
        </h1>

        <form
          onSubmit={handleSearch}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm mb-12 flex flex-col md:flex-row gap-4"
        >

          <input
            type="text"
            placeholder="Job title..."
            className="flex-1 p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location..."
            className="flex-1 p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>

        </form>

        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
            Loading jobs...
          </p>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500 dark:text-gray-400">
              No jobs found
            </p>
          )}

        </div>

        <div className="flex justify-center mt-14 gap-6">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
};

export default JobList;