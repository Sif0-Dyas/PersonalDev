const { verifyToken } = require('../utils/jwt');
const User = require('../models/user.model');
const mongoose = require('mongoose');

// Main authentication middleware
const authenticate = async (req, res, next) => {
    try {
        // Check for token in Authorization header
        const authHeader = req.headers.authorization;
        let token = null;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); // Remove 'Bearer ' prefix
        }

        // Fallback: Check for token in cookies (for browser requests)
        if (!token && req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
        }

        if (!token) {
            return res.status(401).json({
                error: 'Access denied. No token provided.',
                code: 'NO_TOKEN'
            });
        }

        // Verify the token
        const decoded = verifyToken(token);
        
        // Check if it's an access token
        if (decoded.type !== 'access') {
            return res.status(401).json({
                error: 'Invalid token type.',
                code: 'INVALID_TOKEN_TYPE'
            });
        }

        // Find the user
        let user;
        
        // Check if this is a mock user scenario (no database)
        if (decoded.userId === 'demo-user-id' || mongoose.connection.readyState !== 1) {
            console.log('⚠️ Using mock user for demo (no database)');
            user = {
                _id: 'demo-user-id',
                email: 'demo@example.com',
                firstName: 'Demo',
                lastName: 'User',
                fullName: 'Demo User',
                profilePicture: null,
                role: 'user',
                isActive: true
            };
        } else {
            try {
                user = await User.findById(decoded.userId);
            } catch (dbError) {
                // Handle database connection issues
                if (dbError.message.includes('buffering timed out') || dbError.message.includes('ECONNREFUSED')) {
                    console.log('⚠️ Database timeout in auth middleware, using mock user');
                    user = {
                        _id: 'demo-user-id',
                        email: 'demo@example.com',
                        firstName: 'Demo',
                        lastName: 'User',
                        fullName: 'Demo User',
                        profilePicture: null,
                        role: 'user',
                        isActive: true
                    };
                } else {
                    throw dbError;
                }
            }
        }

        if (!user) {
            return res.status(401).json({
                error: 'User not found.',
                code: 'USER_NOT_FOUND'
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({
                error: 'User account is inactive.',
                code: 'ACCOUNT_INACTIVE'
            });
        }

        // Attach user to request object
        req.user = user;
        req.userId = user._id;
        
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        
        // Handle different types of JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token has expired.',
                code: 'TOKEN_EXPIRED'
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                error: 'Invalid token.',
                code: 'INVALID_TOKEN'
            });
        } else if (error.name === 'NotBeforeError') {
            return res.status(401).json({
                error: 'Token not active yet.',
                code: 'TOKEN_NOT_ACTIVE'
            });
        }
        
        return res.status(500).json({
            error: 'Authentication failed.',
            code: 'AUTH_ERROR'
        });
    }
};

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
    try {
        // Check for token in Authorization header
        const authHeader = req.headers.authorization;
        let token = null;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }

        // Fallback: Check for token in cookies
        if (!token && req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
        }

        if (token) {
            try {
                const decoded = verifyToken(token);
                
                if (decoded.type === 'access') {
                    let user;
                    try {
                        user = await User.findById(decoded.userId);
                    } catch (dbError) {
                        if (dbError.message.includes('buffering timed out') || dbError.message.includes('ECONNREFUSED')) {
                            console.log('⚠️ Database timeout in optional auth, using mock user');
                            user = {
                                _id: decoded.userId,
                                email: 'demo@example.com',
                                firstName: 'Demo',
                                lastName: 'User',
                                fullName: 'Demo User',
                                profilePicture: null,
                                role: 'user',
                                isActive: true
                            };
                        }
                    }
                    
                    if (user && user.isActive) {
                        req.user = user;
                        req.userId = user._id;
                    }
                }
            } catch (error) {
                // Silently fail for optional auth
                console.log('Optional auth failed:', error.message);
            }
        }
        
        next();
    } catch (error) {
        // For optional auth, always continue
        next();
    }
};

// Admin role check middleware (use after authenticate)
const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            error: 'Authentication required.',
            code: 'AUTH_REQUIRED'
        });
    }
    
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            error: 'Admin access required.',
            code: 'ADMIN_REQUIRED'
        });
    }
    
    next();
};

// User ownership check (user can only access their own resources)
const requireOwnership = (userIdField = 'userId') => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Authentication required.',
                code: 'AUTH_REQUIRED'
            });
        }
        
        // Get the user ID from request params, body, or query
        const resourceUserId = req.params[userIdField] || 
                             req.body[userIdField] || 
                             req.query[userIdField];
        
        // Admin can access all resources
        if (req.user.role === 'admin') {
            return next();
        }
        
        // Check ownership
        if (resourceUserId && resourceUserId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                error: 'Access denied. You can only access your own resources.',
                code: 'OWNERSHIP_REQUIRED'
            });
        }
        
        next();
    };
};

module.exports = {
    authenticate,
    optionalAuth,
    requireAdmin,
    requireOwnership
};