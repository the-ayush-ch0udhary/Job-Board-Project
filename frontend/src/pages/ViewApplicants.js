import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function ViewApplicants() {

  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchApplicants = async () => {
      try {
        const res = await api.get(`/applications/job/${id}`);
        setApplications(res.data.applications);
      } catch {
        toast.error("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();

  }, [id]);

  const updateStatus = async (applicationId, status) => {
    try {

      await api.put(`/applications/${applicationId}/status`, { status });

      toast.success(`Marked as ${status}`);

      const res = await api.get(`/applications/job/${id}`);
      setApplications(res.data.applications);

    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 dark:text-white">
        Loading...
      </div>
    );

  return (

    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">
          Applicants
        </h1>

        {applications.length === 0 && (
          <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl text-center dark:text-white">
            No applicants yet.
          </div>
        )}

        <div className="space-y-8">

          {applications.map((app) => (

            <div
              key={app._id}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-8 shadow-sm hover:shadow-xl transition"
            >

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {app.userId?.name}
              </h2>

              <p className="text-gray-600 dark:text-gray-300">
                {app.userId?.email}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Applied on {new Date(app.createdAt).toLocaleDateString()}
              </p>

              <p className="mt-3 font-medium text-indigo-600">
                Status: {app.status}
              </p>

              {app.resume && (
                <a
                  href={`http://localhost:5000/${app.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-600 hover:underline"
                >
                  View Resume
                </a>
              )}

              <div className="mt-5 flex flex-wrap gap-4">

                <button
                  onClick={() => updateStatus(app._id, "Shortlisted")}
                  className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
                >
                  Shortlist
                </button>

                <button
                  onClick={() => updateStatus(app._id, "Rejected")}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
                >
                  Reject
                </button>

                <button
                  onClick={() => updateStatus(app._id, "Interview")}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600"
                >
                  Interview
                </button>

                <button
                  onClick={() => updateStatus(app._id, "Hired")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                >
                  Hire
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default ViewApplicants;