import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4
    bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      <div className="w-full max-w-md p-8 rounded-xl shadow-lg
      bg-white dark:bg-gray-800 transition-colors duration-300">

        <h2 className="text-2xl font-bold mb-6 text-center
        text-gray-800 dark:text-white">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg
            bg-gray-50 dark:bg-gray-700
            text-gray-800 dark:text-white
            border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg
            bg-gray-50 dark:bg-gray-700
            text-gray-800 dark:text-white
            border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg
            bg-gray-50 dark:bg-gray-700
            text-gray-800 dark:text-white
            border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full p-3 border rounded-lg
            bg-gray-50 dark:bg-gray-700
            text-gray-800 dark:text-white
            border-gray-300 dark:border-gray-600"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button
            type="submit"
            className="w-full p-3 rounded-lg font-semibold
            bg-indigo-600 hover:bg-indigo-700
            text-white transition duration-200"
          >
            Register
          </button>
        </form>

      </div>
    </div>
  );
};

export default Register;