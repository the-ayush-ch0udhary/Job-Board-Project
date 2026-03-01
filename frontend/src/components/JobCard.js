import { Link } from "react-router-dom";

function JobCard({ job }) {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {job.title}
            </h3>

            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 mb-4">{job.location}</p>

            <Link
                to={`/jobs/${job._id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                View Details
            </Link>
        </div>
    );
}

export default JobCard;