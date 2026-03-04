import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function RecruiterDashboard() {

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const jobsRes = await api.get("/jobs/my-jobs");
        setJobs(jobsRes.data.jobs);

        let allApps = [];

        for (const job of jobsRes.data.jobs) {

          const res = await api.get(`/applications/job/${job._id}`);

          allApps = [...allApps, ...res.data.applications];

        }

        setApplications(allApps);

      } catch {

        toast.error("Failed to load dashboard");

      }

    };

    fetchData();

  }, []);

  const totalJobs = jobs.length;

  const totalApplicants = applications.length;

  const shortlisted = applications.filter(
    (a) => a.status === "Shortlisted"
  ).length;

  const rejected = applications.filter(
    (a) => a.status === "Rejected"
  ).length;

  const applicantsPerJob = jobs.map((job) => {

    const count = applications.filter(
      (a) => a.jobId === job._id || a.jobId?._id === job._id
    ).length;

    return {

      name:
        job.title.length > 15
          ? job.title.slice(0, 15) + "..."
          : job.title,

      applicants: count,

    };

  });

  const statusData = [

    { name: "Shortlisted", value: shortlisted },

    { name: "Rejected", value: rejected },

    { name: "Others", value: totalApplicants - shortlisted - rejected },

  ];

  const COLORS = ["#16a34a", "#dc2626", "#6366f1"];

  return (

    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">
          Recruiter Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14">

          <StatCard title="Jobs Posted" value={totalJobs} />

          <StatCard title="Total Applicants" value={totalApplicants} />

          <StatCard title="Shortlisted" value={shortlisted} />

          <StatCard title="Rejected" value={rejected} />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">

            <h2 className="text-lg font-semibold mb-6 dark:text-white">
              Applicants per Job
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={applicantsPerJob}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="applicants" fill="#6366f1" radius={[8,8,0,0]} />

              </BarChart>

            </ResponsiveContainer>

          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">

            <h2 className="text-lg font-semibold mb-6 dark:text-white">
              Application Status
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >

                  {statusData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Legend />

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  );
}

function StatCard({ title, value }) {

  return (

    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center">

      <h2 className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </h2>

      <p className="text-3xl font-bold mt-2 text-indigo-600">
        {value}
      </p>

    </div>

  );

}

export default RecruiterDashboard;