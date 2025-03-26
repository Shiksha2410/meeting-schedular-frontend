import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const timeZones = [
  "UTC",
  "Asia/Kolkata", 
  "America/New_York", 
  "Europe/London", 
  "Asia/Tokyo", 
  "Australia/Sydney", 
];

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [timeZone, setTimeZone] = useState("UTC+05:30"); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", { name, email, password, timeZone });
      navigate("/");
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2>Register</h2>
        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="" disabled>
              Select Time Zone
            </option>
            {timeZones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Register</button>
        </form>
        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
