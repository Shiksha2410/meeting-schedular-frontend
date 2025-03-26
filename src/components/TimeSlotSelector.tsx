import React, { useEffect, useState } from "react";
import axios from "axios";

interface TimeSlotSelectorProps {
  day: string; // Use 'day' directly instead of converting from date
  onTimeSelect: (time: string) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ day, onTimeSelect }) => {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      setLoading(true);
      setError(""); // Reset error state before fetching
      try {
        console.log("Fetching time slots for day:", day); // Debug log

        // Pass the day directly to the backend
        const response = await axios.get(`/api/availability/${day}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("Fetched time slots:", response.data); // Debug log
        setTimeSlots(response.data.timeSlots || []); // Ensure timeSlots is an array
      } catch (error: any) {
        console.error("Failed to fetch time slots:", error);
        setError(error.response?.data?.message || error.message || "Failed to fetch time slots.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [day]);

  return (
    <div className="time-slot-selector">
      <h3>Select a Time Slot</h3>
      {loading ? (
        <p>Loading time slots...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="time-grid">
          {timeSlots.length > 0 ? (
            timeSlots.map((time) => (
              <button key={time} onClick={() => onTimeSelect(time)} className="time-button">
                {time}
              </button>
            ))
          ) : (
            <p>No time slots available for the selected day.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;
