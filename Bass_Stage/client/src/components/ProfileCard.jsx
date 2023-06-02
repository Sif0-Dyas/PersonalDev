import React, { useState, useEffect } from 'react';

const ProfileCard = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch profile data from the database
    // Replace this with your actual API call or database query
    const fetchProfileData = async () => {
      try {
        const response = await fetch('your-api-endpoint');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  if (!profileData) {
    return <div>Loading profile data...</div>;
  }

  return (
    <div className="profile-card">
      <img src={profileData.image} alt="Profile" />
      <h3>{profileData.caption}</h3>
    </div>
  );
};

export default ProfileCard;
