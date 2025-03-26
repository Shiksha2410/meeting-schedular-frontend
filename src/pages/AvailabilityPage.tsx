import React, { useState, useEffect } from "react";
import axios from "axios";

const AvailabilityPage: React.FC = () => {
  const [availability, setAvailability] = useState({
    startTime: "",
    endTime: "",
    days: [] as string[],
  });
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get("/api/availability", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data) setAvailability(response.data);
      } catch (error) {
        console.error("Failed to fetch availability:", error);
      }
    };

    fetchAvailability();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate startTime and endTime
    const [startHour, startMinute] = availability.startTime.split(":").map(Number);
    const [endHour, endMinute] = availability.endTime.split(":").map(Number);
    if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
      setError("Start time must be earlier than end time");
      return;
    }

    try {
      await axios.post(
        "/api/availability",
        availability,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setSuccessMessage("Availability updated successfully!");
      setError("");
    } catch (error) {
      console.error("Failed to update availability:", error);
      setError("Failed to update availability. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h2>Set Your Availability</h2>
      <div className="card" style={{ padding: "20px", marginBottom: "20px" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <label style={{ textAlign: "left" }}>
            <strong>Start Time:</strong>
            <input
              type="time"
              value={availability.startTime}
              onChange={(e) => setAvailability({ ...availability, startTime: e.target.value })}
              required
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
          </label>
          <label style={{ textAlign: "left" }}>
            <strong>End Time:</strong>
            <input
              type="time"
              value={availability.endTime}
              onChange={(e) => setAvailability({ ...availability, endTime: e.target.value })}
              required
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
          </label>
          <label style={{ textAlign: "left" }}>
            <strong>Days:</strong>
            <select
              multiple
              value={availability.days}
              onChange={(e) =>
                setAvailability({
                  ...availability,
                  days: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </label>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save Availability
          </button>
        </form>
      </div>
    </div>
  );
};

export default AvailabilityPage;
