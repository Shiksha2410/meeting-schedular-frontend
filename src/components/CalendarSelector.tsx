import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarSelectorProps {
  onDateSelect: (day: string, date: string) => void;
}

const CalendarSelector: React.FC<CalendarSelectorProps> = ({ onDateSelect }) => {
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAvailableDays = async () => {
      try {
        const response = await axios.get("/api/availability", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setAvailableDays(response.data.days || []);
      } catch (error: any) {
        setError(error.response?.data?.message || "Failed to fetch available days.");
      }
    };

    fetchAvailableDays();
  }, []);

  const isDayAllowed = (date: Date): boolean => {
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayOfWeek = normalizedDate.toLocaleDateString("en-US", { weekday: "long" });
    return availableDays.includes(dayOfWeek) && normalizedDate >= new Date();
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
      const formattedDate = date.toISOString().split("T")[0];
      setSelectedDate(date);
      onDateSelect(dayOfWeek, formattedDate);
    }
  };

  return (
    <div className="calendar-selector">
      <h3>Select a Date</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        filterDate={isDayAllowed}
        minDate={new Date()}
        placeholderText="Select a date"
        inline
      />
    </div>
  );
};

export default CalendarSelector;
