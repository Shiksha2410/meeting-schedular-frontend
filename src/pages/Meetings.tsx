import React, { useEffect, useState } from "react";
import axios from "axios";

const Meetings: React.FC = () => {
  const [meetings, setMeetings] = useState<any[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get("/api/meetings");
        setMeetings(response.data);
      } catch (error) {
        console.error("Failed to fetch meetings:", error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div>
      <h2>Meetings</h2>
      <ul>
        {meetings.map((meeting) => (
          <li key={meeting.id}>{meeting.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Meetings;
