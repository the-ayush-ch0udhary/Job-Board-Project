import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Profile() {
  const [profile, setProfile] = useState({
    phone: "",
    education: "",
    experience: "",
    skills: "",
    linkedin: "",
    github: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/me");
        if (res.data.profile) {
          setProfile({
            ...res.data.profile,
            skills: res.data.profile.skills?.join(", ") || "",
          });
        }
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/profile/me", {
        ...profile,
        skills: profile.skills.split(",").map((s) => s.trim()),
      });

      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-6">

        <h1 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white">
          My Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md space-y-6"
        >
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={profile.phone || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="education"
            placeholder="Education"
            value={profile.education || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={profile.experience || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={profile.skills || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={profile.linkedin || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="github"
            placeholder="GitHub URL"
            value={profile.github || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <textarea
            name="bio"
            placeholder="Short Bio"
            value={profile.bio || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            rows="4"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Save Profile
          </button>
        </form>

      </div>
    </div>
  );
}

export default Profile;