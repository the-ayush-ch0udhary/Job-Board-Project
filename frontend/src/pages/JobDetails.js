import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function JobDetails() {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        api.get(`/jobs/${id}`)
            .then(res => setJob(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!job) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
            <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 mb-6">{job.location}</p>

            <p className="text-gray-700 mb-6">{job.description}</p>

            <Link
                to={`/apply/${job._id}`}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
                Apply Now
            </Link>
        </div>
    );
}

export default JobDetails;