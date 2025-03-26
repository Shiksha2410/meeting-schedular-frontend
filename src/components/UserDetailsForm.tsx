import React, { useState } from "react";

interface UserDetailsFormProps {
  onSubmit: (details: { name: string; email: string; notes: string }) => void;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Name and email are required."); // Add validation
      return;
    }
    onSubmit({ name, email, notes }); // Pass user details to the parent
  };

  return (
    <form onSubmit={handleSubmit} className="user-details-form">
      <h3>Enter Your Details</h3>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <textarea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserDetailsForm;
