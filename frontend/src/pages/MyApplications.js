import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/applications/my");
        setApplications(res.data.applications);
      } catch {
        toast.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16 transition">
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-sm text-center text-gray-500 dark:text-gray-400">
            No applications submitted yet.
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {app.jobId?.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {app.jobId?.company}
                </p>

                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Applied On {new Date(app.createdAt).toLocaleDateString()}
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

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;