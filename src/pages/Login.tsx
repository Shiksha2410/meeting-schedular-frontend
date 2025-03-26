import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token); // Store the token
      localStorage.setItem("userId", user._id); // Store the userId

      navigate("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
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
        <h2>Login</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px", fontSize: "16px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px", fontSize: "16px" }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" style={{ padding: "10px", fontSize: "16px" }}>
            Login
          </button>
        </form>
        <p style={{ marginTop: "20px" }}>
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            style={{
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
