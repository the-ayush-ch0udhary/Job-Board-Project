import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function PostJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/jobs", job);

      toast.success("Job posted successfully!");

      setJob({
        title: "",
        company: "",
        location: "",
        description: "",
      });

      setTimeout(() => {
        navigate("/jobs");
      }, 800);
    } catch (error) {
      toast.error("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Post a New Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={job.title}
              onChange={handleChange}
              required
              placeholder="e.g. Frontend Developer"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={job.company}
              onChange={handleChange}
              required
              placeholder="e.g. Google"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={job.location}
              onChange={handleChange}
              required
              placeholder="e.g. Bangalore"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Job Description
            </label>
            <textarea
              name="description"
              value={job.description}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Describe responsibilities..."
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostJob;