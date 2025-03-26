import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Availability from "./pages/Availability";

import BookingPage from "./pages/BookingPage";
import TestingPage from "./pages/TestingPage";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return <Navigate to="/" />;
    }
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  if (!token || location.pathname.startsWith("/book/")) {
    return null; 
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        <Link to="/availability" className="navbar-link">Availability</Link>
        <Link to="/profile" className="navbar-link">Profile</Link>
      </div>
      <div className="navbar-right">
        <Link to="/testing" className="navbar-link">Test Connection</Link>
        <button onClick={handleLogout} className="navbar-link" style={{ background: "none", border: "none", cursor: "pointer", color: "#007bff" }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/availability" element={<PrivateRoute><Availability /></PrivateRoute>} />
            <Route path="/book/:userId" element={<BookingPage />} />
            <Route path="/testing" element={<TestingPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
