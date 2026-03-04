import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl transition duration-300 transform hover:-translate-y-1">

            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {job.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300">{job.company}</p>

            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                {job.location}
            </p>

            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-6">
                {job.description}
            </p>

            <Link
                to={`/jobs/${job._id}`}
                className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-200"
            >
                View Details
            </Link>

        </div>
    );
};

export default JobCard;