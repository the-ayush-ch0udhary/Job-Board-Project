import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";

function JobList() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        api.get("/jobs").then((res) => setJobs(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h2 className="text-3xl font-bold mb-8 text-center">
                Available Jobs
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
                {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
        </div>
    );
}

export default JobList;