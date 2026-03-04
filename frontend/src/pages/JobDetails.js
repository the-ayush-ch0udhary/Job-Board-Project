import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // 🛑 Prevent invalid API call

    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        if (res.data?.job) {
          setJob(res.data.job);
        } else {
          setJob(null);
        }
      } catch (error) {
        setJob(null); // ❌ Do NOT show toast here
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Job not found
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {job.title}
          </h1>

          <div className="text-gray-600 space-y-2 mb-8">
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            {job.salary && <p><strong>Salary:</strong> ₹{job.salary}</p>}
            {job.experience && <p><strong>Experience:</strong> {job.experience}</p>}
            {job.jobType && <p><strong>Job Type:</strong> {job.jobType}</p>}
            <p>
              <strong>Posted On:</strong>{" "}
              {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>

          {job.skills?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Job Description
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {job.responsibilities && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Responsibilities
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {job.responsibilities}
              </p>
            </div>
          )}

          {job.requirements && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Requirements
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {job.requirements}
              </p>
            </div>
          )}

          <Link
            to={`/apply/${job._id}`}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-200"
          >
            Apply Now
          </Link>

        </div>
      </div>
    </div>
  );
}

export default JobDetails;