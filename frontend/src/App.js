import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import ApplyJob from "./pages/ApplyJob";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyApplications from "./pages/MyApplications";
import MyJobs from "./pages/MyJobs";
import ViewApplicants from "./pages/ViewApplicants";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Profile from "./pages/Profile"; // ✅ NEW

import ProtectedRoute from "./components/ProtectedRoute";

/* =========================
   Animated Page Wrapper
========================= */
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

/* =========================
   Animated Routes
========================= */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* Public */}
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/jobs" element={<PageWrapper><JobList /></PageWrapper>} />
        <Route path="/jobs/:id" element={<PageWrapper><JobDetails /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />

        {/* Candidate */}
        <Route
          path="/apply/:id"
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <PageWrapper><ApplyJob /></PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <PageWrapper><MyApplications /></PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <PageWrapper><Profile /></PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* Recruiter */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
              <PageWrapper><RecruiterDashboard /></PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/post"
          element={
            <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
              <PageWrapper><PostJob /></PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
              <PageWrapper><MyJobs /></PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/job-applicants/:id"
          element={
            <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
              <PageWrapper><ViewApplicants /></PageWrapper>
            </ProtectedRoute>
          }
        />

      </Routes>
    </AnimatePresence>
  );
}

/* =========================
   MAIN APP
========================= */
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
          },
        }}
      />

      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;