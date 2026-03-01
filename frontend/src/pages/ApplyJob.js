import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    resume: "",
    coverLetter: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitApplication = async (e) => {
    e.preventDefault();

    try {
      await api.post("/applications", {
        jobId: id,
        ...form,
      });

      toast.success("Application submitted successfully!");

      setTimeout(() => {
        navigate("/jobs");
      }, 800);
    } catch (error) {
      toast.error("Error submitting application");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Apply for Job</h2>

      <form onSubmit={submitApplication} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          name="resume"
          placeholder="Resume Link"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default ApplyJob;