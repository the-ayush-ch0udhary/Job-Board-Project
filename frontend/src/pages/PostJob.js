import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function PostJob() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "",
    skills: "",
    description: "",
    responsibilities: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
      };

      await api.post("/jobs", payload);

      toast.success("Job posted successfully!");

      navigate("/my-jobs");

    } catch (error) {

      toast.error(error.response?.data?.message || "Failed to post job");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">

      <div className="max-w-3xl mx-auto px-6">

        <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">

          <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
            Post a New Job
          </h1>

          <form onSubmit={submitHandler} className="space-y-6">

            <input
              name="title"
              placeholder="Job Title"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              name="company"
              placeholder="Company Name"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={formData.company}
              onChange={handleChange}
              required
            />

            <input
              name="location"
              placeholder="Location"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <input
              name="salary"
              placeholder="Salary"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={formData.salary}
              onChange={handleChange}
            />

            <input
              name="experience"
              placeholder="Experience"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={formData.experience}
              onChange={handleChange}
            />

            <input
              name="jobType"
              placeholder="Job Type (Full-time, Internship...)"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={formData.jobType}
              onChange={handleChange}
            />

            <input
              name="skills"
              placeholder="Skills (comma separated)"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={formData.skills}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Job Description"
              rows="4"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <textarea
              name="responsibilities"
              placeholder="Responsibilities"
              rows="3"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={formData.responsibilities}
              onChange={handleChange}
            />

            <textarea
              name="requirements"
              placeholder="Requirements"
              rows="3"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={formData.requirements}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? "Posting..." : "Post Job"}
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default PostJob;