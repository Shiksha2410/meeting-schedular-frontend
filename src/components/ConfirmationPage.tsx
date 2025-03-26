import React from "react";

interface ConfirmationPageProps {
  meetingDetails: {
    title?: string;
    date?: string;
    time?: string;
    host?: string;
    link?: string;
    participants?: string[];
  } | null;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ meetingDetails }) => {
  if (!meetingDetails) {
    return <p>No meeting details available.</p>; // Handle the case where meetingDetails is null
  }

  const { title, date, time, host, link, participants } = meetingDetails;

  return (
    <div className="confirmation-page">
      <h2>Meeting Confirmation</h2>
      <p>
        <strong>Title:</strong> {title || "N/A"}
      </p>
      <p>
        <strong>Date:</strong> {date || "N/A"}
      </p>
      <p>
        <strong>Time:</strong> {time || "N/A"}
      </p>
      <p>
        <strong>Host:</strong> {host || "N/A"}
      </p>
      <p>
        <strong>Participants:</strong> {participants?.join(", ") || "N/A"}
      </p>
      <p>
        <strong>Meeting Link:</strong>{" "}
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        ) : (
          "N/A"
        )}
      </p>
    </div>
  );
};

export default ConfirmationPage;
