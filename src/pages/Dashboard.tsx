import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard: React.FC = () => {
  const [meetings, setMeetings] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get("/api/meetings", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        
        setMeetings(response.data);
      } catch (error) {
        console.error("Failed to fetch meetings:", error); // Debug log
      }
    };

    fetchMeetings();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const upcomingMeetings = meetings.filter(
    (meeting) => new Date(meeting.date) >= new Date()
  );
  const pastMeetings = meetings.filter(
    (meeting) => new Date(meeting.date) < new Date()
  );

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="card">
        <h3>Upcoming Meetings</h3>
        {upcomingMeetings.length === 0 ? (
          <p>No upcoming meetings.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Participants</th>
              </tr>
            </thead>
            <tbody>
              {upcomingMeetings.map((meeting) => (
                <tr key={meeting._id}>
                  <td>{meeting.title}</td>
                  <td>{new Date(meeting.date).toLocaleDateString()}</td>
                  <td>{meeting.time}</td>
                  <td>{meeting.status}</td>
                  <td>
                    {meeting.participants.map((p: any) => p.name).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="card">
        <h3>Past Meetings</h3>
        {pastMeetings.length === 0 ? (
          <p>No past meetings.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Participants</th>
              </tr>
            </thead>
            <tbody>
              {pastMeetings.map((meeting) => (
                <tr key={meeting._id}>
                  <td>{meeting.title}</td>
                  <td>{new Date(meeting.date).toLocaleDateString()}</td>
                  <td>{meeting.time}</td>
                  <td>{meeting.status}</td>
                  <td>
                    {meeting.participants.map((p: any) => p.name).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
