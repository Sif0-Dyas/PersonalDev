const Profile = require('../models/Profile');

exports.createProfile = async (req, res) => {
  try {
    const { image, caption } = req.body;

    // Create a new profile
    const profile = new Profile({
      image,
      caption,
    });

    // Save the profile to the database
    await profile.save();

    res.status(201).json({ success: true, message: 'Profile created successfully.' });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
};
