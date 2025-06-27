const jwt = require('jsonwebtoken');

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

// Generate access token
const generateAccessToken = (userId) => {
    return jwt.sign(
        { 
            userId: userId,
            type: 'access'
        },
        JWT_SECRET,
        { 
            expiresIn: JWT_EXPIRES_IN,
            issuer: 'bass-stage-app',
            audience: 'bass-stage-users'
        }
    );
};

// Generate refresh token
const generateRefreshToken = (userId) => {
    return jwt.sign(
        { 
            userId: userId,
            type: 'refresh'
        },
        JWT_SECRET,
        { 
            expiresIn: JWT_REFRESH_EXPIRES_IN,
            issuer: 'bass-stage-app',
            audience: 'bass-stage-users'
        }
    );
};

// Verify token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET, {
            issuer: 'bass-stage-app',
            audience: 'bass-stage-users'
        });
    } catch (error) {
        throw new Error(`Token verification failed: ${error.message}`);
    }
};

// Generate token pair (access + refresh)
const generateTokenPair = (userId) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);
    
    return {
        accessToken,
        refreshToken,
        expiresIn: JWT_EXPIRES_IN
    };
};

// Decode token without verification (for expired token handling)
const decodeToken = (token) => {
    try {
        return jwt.decode(token, { complete: true });
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateTokenPair,
    verifyToken,
    decodeToken,
    JWT_SECRET,
    JWT_EXPIRES_IN
};