const express = require('express');
const passport = require('../config/passport.config');
const { authenticate, optionalAuth } = require('../middleware/auth.middleware');
const {
    oauthSuccess,
    oauthFailure,
    getCurrentUser,
    refreshAccessToken,
    logout,
    checkAuth
} = require('../controllers/auth.controller');

const router = express.Router();

// Google OAuth Routes
router.get('/google', (req, res, next) => {
    // Check if Google OAuth is configured
    if (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID === 'placeholder-client-id') {
        return res.status(501).json({
            error: 'Google OAuth not configured',
            message: 'Please set up Google OAuth credentials in the server .env file',
            documentation: 'See OAUTH_SETUP.md for instructions'
        });
    }
    
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        accessType: 'offline',
        prompt: 'consent'
    })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
    // Check if Google OAuth is configured
    if (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID === 'placeholder-client-id') {
        return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/login?error=oauth_not_configured`);
    }
    
    passport.authenticate('google', {
        failureRedirect: '/auth/failure',
        session: false
    })(req, res, next);
}, oauthSuccess);

// Future: Apple ID OAuth Routes (placeholder for modular design)
// router.get('/apple',
//     passport.authenticate('apple', {
//         scope: ['name', 'email']
//     })
// );

// router.post('/apple/callback',
//     passport.authenticate('apple', {
//         failureRedirect: '/auth/failure',
//         session: false
//     }),
//     oauthSuccess
// );

// OAuth failure route
router.get('/failure', oauthFailure);

// Token management routes
router.post('/refresh', refreshAccessToken);
router.post('/logout', logout);

// User profile routes
router.get('/me', authenticate, getCurrentUser);
router.get('/check', optionalAuth, checkAuth);

// Health check for auth service
router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'authentication',
        timestamp: new Date().toISOString(),
        availableProviders: ['google'] // Add 'apple' when implemented
    });
});

module.exports = router;