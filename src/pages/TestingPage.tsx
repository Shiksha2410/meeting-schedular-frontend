import React, { useState } from "react";
import axios from "axios";

interface TestResult {
  name: string;
  status: "success" | "failure";
  reason?: string;
}

const TestingPage: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const tests = [
    {
      name: "Fetch Availability",
      api: async () => {
        const response = await axios.get("/api/availability", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return response.data;
      },
    },
    {
      name: "Set Availability",
      api: async () => {
        const response = await axios.post(
          "/api/availability",
          {
            startTime: "09:00",
            endTime: "17:00",
            days: ["Monday", "Tuesday"],
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        return response.data;
      },
    },
    {
      name: "Get Available Slots",
      api: async () => {
        const response = await axios.get("/api/availability/Monday", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return response.data;
      },
    },
    {
      name: "Book Meeting",
      api: async () => {
        const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
        if (!userId) {
          throw new Error("User ID is missing. Please ensure you are logged in.");
        }
        const response = await axios.post(
          "/api/meetings/book",
          {
            title: "Test Meeting",
            userId,
            date: "2023-10-01",
            time: "10:00",
            name: "Test User",
            email: "testuser@example.com",
            notes: "Testing meeting booking",
             
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        return response.data;
      },
    },
    {
      name: "Generate Booking Link",
      api: async () => {
        const response = await axios.get("/api/availability/booking-link", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return response.data;
      },
    },
  ];

  const runTests = async () => {
    setLoading(true);
    const testResults: TestResult[] = [];

    for (const test of tests) {
      try {
        await test.api();
        testResults.push({ name: test.name, status: "success" });
      } catch (error: any) {
        testResults.push({
          name: test.name,
          status: "failure",
          reason: error.response?.data?.message || error.message || "Unknown error",
        });
      }
    }

    setResults(testResults);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", textAlign: "center" }}>
      <h2>API Testing Page</h2>
      <button
        onClick={runTests}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
        disabled={loading}
      >
        {loading ? "Running Tests..." : "Start Testing"}
      </button>
      {loading && <div className="loading-animation">🔄 Testing in progress...</div>}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Test Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Reason</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.name}</td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: result.status === "success" ? "green" : "red",
                }}
              >
                {result.status === "success" ? "✅" : "❌"}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {result.reason || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestingPage;
