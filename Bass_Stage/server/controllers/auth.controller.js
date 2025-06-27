const User = require('../models/user.model');
const { generateTokenPair, verifyToken } = require('../utils/jwt');

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// OAuth Success Handler
const oauthSuccess = async (req, res) => {
    try {
        if (!req.user) {
            return res.redirect(`${CLIENT_URL}/login?error=oauth_failed`);
        }

        // Generate JWT tokens
        // Use consistent ID for mock users
        const userId = req.user._id || 'demo-user-id';
        const tokens = generateTokenPair(userId);
        
        // Set secure cookies
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        };

        // Set access token cookie (shorter expiration)
        res.cookie('accessToken', tokens.accessToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Set refresh token cookie (longer expiration)
        res.cookie('refreshToken', tokens.refreshToken, {
            ...cookieOptions,
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        // Update user's last login
        req.user.lastLoginAt = new Date();
        await req.user.save();

        // Redirect to frontend with success
        res.redirect(`${CLIENT_URL}/dashboard?auth=success`);
    } catch (error) {
        console.error('OAuth success handler error:', error);
        res.redirect(`${CLIENT_URL}/login?error=server_error`);
    }
};

// OAuth Failure Handler
const oauthFailure = (req, res) => {
    console.error('OAuth failure:', req.query);
    res.redirect(`${CLIENT_URL}/login?error=oauth_failed`);
};

// Get current user profile
const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                error: 'User not authenticated',
                code: 'NOT_AUTHENTICATED'
            });
        }

        // Return user profile (exclude sensitive data)
        const userProfile = {
            id: req.user._id,
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            fullName: req.user.fullName,
            profilePicture: req.user.profilePicture,
            role: req.user.role,
            isActive: req.user.isActive,
            lastLoginAt: req.user.lastLoginAt,
            createdAt: req.user.createdAt,
            // Only return provider names, not sensitive data
            authProviders: req.user.authProviders.map(p => p.provider)
        };

        res.json({
            user: userProfile,
            message: 'User profile retrieved successfully'
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            error: 'Failed to retrieve user profile',
            code: 'PROFILE_ERROR'
        });
    }
};

// Refresh access token
const refreshAccessToken = async (req, res) => {
    try {
        // Get refresh token from cookies or Authorization header
        let refreshToken = req.cookies?.refreshToken;
        
        if (!refreshToken) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                refreshToken = authHeader.substring(7);
            }
        }

        if (!refreshToken) {
            return res.status(401).json({
                error: 'Refresh token not provided',
                code: 'NO_REFRESH_TOKEN'
            });
        }

        // Verify refresh token
        const decoded = verifyToken(refreshToken);
        
        if (decoded.type !== 'refresh') {
            return res.status(401).json({
                error: 'Invalid token type',
                code: 'INVALID_TOKEN_TYPE'
            });
        }

        // Find user
        const user = await User.findById(decoded.userId);
        if (!user || !user.isActive) {
            return res.status(401).json({
                error: 'User not found or inactive',
                code: 'USER_NOT_FOUND'
            });
        }

        // Generate new token pair
        const tokens = generateTokenPair(user._id);

        // Update cookies
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        };

        res.cookie('accessToken', tokens.accessToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.cookie('refreshToken', tokens.refreshToken, {
            ...cookieOptions,
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.json({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            expiresIn: tokens.expiresIn,
            message: 'Tokens refreshed successfully'
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Refresh token expired',
                code: 'REFRESH_TOKEN_EXPIRED'
            });
        }
        
        res.status(401).json({
            error: 'Failed to refresh token',
            code: 'REFRESH_ERROR'
        });
    }
};

// Logout user
const logout = async (req, res) => {
    try {
        // Clear cookies
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        };

        res.clearCookie('accessToken', cookieOptions);
        res.clearCookie('refreshToken', cookieOptions);

        res.json({
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            error: 'Logout failed',
            code: 'LOGOUT_ERROR'
        });
    }
};

// Check authentication status
const checkAuth = async (req, res) => {
    try {
        if (req.user) {
            res.json({
                authenticated: true,
                user: {
                    id: req.user._id,
                    email: req.user.email,
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    fullName: req.user.fullName,
                    profilePicture: req.user.profilePicture,
                    role: req.user.role
                }
            });
        } else {
            res.json({
                authenticated: false,
                user: null
            });
        }
    } catch (error) {
        console.error('Check auth error:', error);
        res.status(500).json({
            error: 'Authentication check failed',
            code: 'AUTH_CHECK_ERROR'
        });
    }
};

module.exports = {
    oauthSuccess,
    oauthFailure,
    getCurrentUser,
    refreshAccessToken,
    logout,
    checkAuth
};