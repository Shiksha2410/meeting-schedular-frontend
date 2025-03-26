import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Your Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Time Zone: {user.timeZone}</p>
    </div>
  );
};

export default Profile;
