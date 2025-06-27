const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');

// Environment variables for OAuth configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:8000';

// Configure Google OAuth Strategy
if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && 
    GOOGLE_CLIENT_ID !== 'placeholder-client-id' && 
    GOOGLE_CLIENT_SECRET !== 'placeholder-client-secret') {
    
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${SERVER_URL}/auth/google/callback`,
        scope: ['profile', 'email']
    }, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('Google OAuth Profile:', {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName
        });

        // Normalize the profile data
        const normalizedProfile = {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            given_name: profile.name?.givenName,
            family_name: profile.name?.familyName,
            picture: profile.photos?.[0]?.value,
            // Store the full profile for reference
            fullProfile: profile._json
        };

        // Validate required fields
        if (!normalizedProfile.email) {
            return done(new Error('Email not provided by Google'), null);
        }

        // Find or create user
        const user = await User.findOrCreateFromOAuth('google', normalizedProfile);
        
        return done(null, user);
    } catch (error) {
        console.error('Google OAuth Error:', error);
        return done(error, null);
    }
}));

} else {
    console.warn('⚠️  Google OAuth not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env file');
    console.warn('📋 See OAUTH_SETUP.md for instructions');
}

// Serialize user for session (we won't use sessions but this is required by passport)
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Future: Apple ID Strategy (placeholder for modular design)
// const AppleStrategy = require('passport-apple');
// 
// passport.use(new AppleStrategy({
//     clientID: process.env.APPLE_CLIENT_ID,
//     teamID: process.env.APPLE_TEAM_ID,
//     keyID: process.env.APPLE_KEY_ID,
//     key: process.env.APPLE_PRIVATE_KEY,
//     callbackURL: `${SERVER_URL}/auth/apple/callback`,
//     scope: ['name', 'email']
// }, async (accessToken, refreshToken, idToken, profile, done) => {
//     try {
//         // Apple ID implementation would go here
//         const normalizedProfile = {
//             id: profile.id,
//             email: profile.email,
//             given_name: profile.name?.firstName,
//             family_name: profile.name?.lastName,
//             fullProfile: profile
//         };
//         
//         const user = await User.findOrCreateFromOAuth('apple', normalizedProfile);
//         return done(null, user);
//     } catch (error) {
//         console.error('Apple OAuth Error:', error);
//         return done(error, null);
//     }
// }));

module.exports = passport;