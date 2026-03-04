import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const submitApplication = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload resume (PDF)");
      return;
    }

    const formData = new FormData();
    formData.append("jobId", id);
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);

    try {
      setLoading(true);

      await api.post("/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Application submitted successfully!");
      setTimeout(() => navigate("/jobs"), 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">
      <div className="max-w-xl mx-auto px-6">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-10">

          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">
            Apply for This Job
          </h2>

          <form onSubmit={submitApplication} className="space-y-6">

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />

            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows="4"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default ApplyJob;