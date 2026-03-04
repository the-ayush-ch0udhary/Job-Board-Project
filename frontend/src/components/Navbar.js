import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  /* LOAD USER */
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
      else setUser(null);
    };

    loadUser();
    window.addEventListener("userChanged", loadUser);

    return () => {
      window.removeEventListener("userChanged", loadUser);
    };
  }, []);

  /* LOAD THEME */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold text-indigo-600">
          JobBoard
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">

          <Link to="/jobs" className="text-gray-600 dark:text-gray-300">
            Jobs
          </Link>

          {user?.role === "candidate" && (
            <>
              <Link to="/my-applications" className="dark:text-gray-300">
                My Applications
              </Link>
              <Link to="/profile" className="dark:text-gray-300">
                Profile
              </Link>
            </>
          )}

          {(user?.role === "recruiter" || user?.role === "admin") && (
            <>
              <Link to="/dashboard" className="dark:text-gray-300">
                Dashboard
              </Link>
              <Link to="/my-jobs" className="dark:text-gray-300">
                My Jobs
              </Link>
              <Link
                to="/post"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Post Job
              </Link>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {!user ? (
            <>
              <Link to="/login" className="dark:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="dark:text-gray-300">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-500 dark:text-gray-400">
                {user.name}
              </span>
              <button onClick={logout} className="text-red-600">
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 dark:text-gray-300"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col space-y-4 bg-white dark:bg-gray-900">

          <Link to="/jobs" onClick={() => setMenuOpen(false)}>
            Jobs
          </Link>

          {user?.role === "candidate" && (
            <>
              <Link to="/my-applications" onClick={() => setMenuOpen(false)}>
                My Applications
              </Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
            </>
          )}

          {(user?.role === "recruiter" || user?.role === "admin") && (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/my-jobs" onClick={() => setMenuOpen(false)}>
                My Jobs
              </Link>
              <Link to="/post" onClick={() => setMenuOpen(false)}>
                Post Job
              </Link>
            </>
          )}

          <button onClick={toggleTheme}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {!user ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
              <span>{user.name}</span>
              <button onClick={logout} className="text-red-600">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;