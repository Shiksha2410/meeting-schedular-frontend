import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CalendarSelector from "../components/CalendarSelector";
import TimeSlotSelector from "../components/TimeSlotSelector";
import UserDetailsForm from "../components/UserDetailsForm";
import ConfirmationPage from "../components/ConfirmationPage";
import axios from "axios";

const BookingPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<{ name: string; email: string; notes: string } | null>(null);
  const [meetingDetails, setMeetingDetails] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleDateSelect = (day: string, date: string) => {
    setSelectedDay(day);
    setSelectedDate(date);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleUserDetailsSubmit = async (details: { name: string; email: string; notes: string }) => {
    setUserDetails(details);

    if (!selectedDate || !selectedTime) {
      setError("Please select a valid date and time.");
      return;
    }

    if (!details.name || !details.email) {
      setError("Name and email are required.");
      return;
    }

    setLoading(true);

    try {
      const fullDateTime = new Date(`${selectedDate}T${selectedTime}:00`).toISOString();
      const response = await axios.post("/api/meetings/book", {
        title: "Meeting with " + details.name,
        userId,
        date: fullDateTime,
        time: selectedTime,
        name: details.name,
        email: details.email,
        notes: details.notes,
      });

      setMeetingDetails(response.data.meeting);
      setStep(4);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to book meeting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      {step === 1 && <CalendarSelector onDateSelect={handleDateSelect} />}
      {step === 2 && selectedDay && <TimeSlotSelector day={selectedDay} onTimeSelect={handleTimeSelect} />}
      {step === 3 && <UserDetailsForm onSubmit={handleUserDetailsSubmit} />}
      {step === 4 && <ConfirmationPage meetingDetails={meetingDetails} />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default BookingPage;
