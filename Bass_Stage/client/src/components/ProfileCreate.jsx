import React, { useState } from 'react';

const ProfileForm = () => {
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can perform further validation and data processing here
    // For simplicity, this example only updates the state

    // Reset form fields
    setImage('');
    setCaption('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Image:
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter image URL"
          required
        />
      </label>
      <label>
        Caption:
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter caption"
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileForm;
