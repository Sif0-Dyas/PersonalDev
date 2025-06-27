# 🔐 Google OAuth Setup Guide for Bass Stage

This guide explains how to set up Google Sign-In authentication for the Bass Stage MERN application.

## 🎯 What We've Built

A complete OAuth 2.0 authentication system with:
- **Secure JWT token handling** with refresh tokens
- **1-click Google Sign-In** with minimal friction
- **Modular design** ready for Apple ID integration
- **Protected routes** with role-based access control
- **Secure cookie-based token storage**

## 📋 Prerequisites

- Node.js 16+
- MongoDB running locally or connection string
- Google Cloud Console account

## 🚀 Setup Instructions

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google+ API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URI: `http://localhost:8000/auth/google/callback`
   - Note down your **Client ID** and **Client Secret**

### 2. Backend Configuration

1. **Install dependencies** (already done):
   ```bash
   cd server
   npm install passport passport-google-oauth20 jsonwebtoken cookie-parser express-session
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Configure .env file**:
   ```env
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   CLIENT_URL=http://localhost:3000
   ```

### 3. Frontend Configuration

1. **Install dependencies** (already done):
   ```bash
   cd client
   npm install js-cookie google-auth-library
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Configure .env file**:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   ```

### 4. Database Setup

The system will automatically create a `users` collection in MongoDB. Make sure your MongoDB connection is configured in `server/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/bass_stage
```

## 🏗️ Architecture Overview

### Backend Components

```
server/
├── config/
│   ├── passport.config.js      # OAuth strategies configuration
│   └── mongoose.config.js      # Database connection
├── controllers/
│   ├── auth.controller.js      # Authentication endpoints
│   └── event.controller.js     # Existing event logic
├── middleware/
│   └── auth.middleware.js      # JWT verification middleware
├── models/
│   ├── user.model.js          # User schema with OAuth support
│   └── event.model.js         # Existing event schema
├── routes/
│   ├── auth.routes.js         # Authentication routes
│   └── events.routes.js       # Existing event routes
└── utils/
    └── jwt.js                 # JWT token utilities
```

### Frontend Components

```
client/src/
├── contexts/
│   └── AuthContext.js         # Global authentication state
├── components/
│   ├── GoogleSignInButton.jsx # OAuth login buttons
│   └── ProtectedRoute.jsx     # Route protection wrapper
└── views/
    ├── Login.jsx              # Login page
    ├── Dashboard.jsx          # User dashboard
    └── [existing views]       # Updated with auth
```

## 🔒 Security Features

### JWT Implementation
- **Access tokens**: Short-lived (7 days) for API requests
- **Refresh tokens**: Long-lived (30 days) for token renewal
- **HttpOnly cookies**: Secure token storage, XSS protected
- **CSRF protection**: SameSite cookie attributes

### OAuth Flow
1. User clicks "Sign in with Google"
2. Redirected to Google OAuth consent screen
3. Google redirects back with authorization code
4. Backend exchanges code for user profile
5. User created/found in database
6. JWT tokens generated and set as secure cookies
7. User redirected to dashboard

### Route Protection
- **Public routes**: Accessible without authentication
- **Protected routes**: Require valid JWT token
- **Admin routes**: Require admin role (extensible)
- **Optional protection**: Shows login prompt but allows access

## 🎛️ API Endpoints

### Authentication Endpoints
```
GET  /auth/google           # Initiate Google OAuth
GET  /auth/google/callback  # Google OAuth callback
POST /auth/refresh          # Refresh access token
POST /auth/logout           # Clear authentication cookies
GET  /auth/me              # Get current user profile
GET  /auth/check           # Check authentication status
GET  /auth/health          # Service health check
```

### Usage Examples

#### Protecting Backend Routes
```javascript
const { authenticate } = require('./middleware/auth.middleware');

// Protect individual routes
router.get('/protected', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Optional authentication
router.get('/public', optionalAuth, (req, res) => {
  const user = req.user || null;
  res.json({ user, content: 'Public content' });
});
```

#### Frontend Authentication
```javascript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, loginWithGoogle, logout } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={loginWithGoogle}>Sign In</button>;
  }

  return (
    <div>
      Welcome, {user.firstName}!
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
```

## 🍎 Future: Apple ID Integration

The system is designed to easily add Apple ID:

1. **Install Apple strategy**:
   ```bash
   npm install passport-apple
   ```

2. **Add Apple configuration** in `passport.config.js`
3. **Add Apple routes** in `auth.routes.js`
4. **Enable Apple button** in `GoogleSignInButton.jsx`

## 🧪 Testing the Setup

1. **Start the backend**:
   ```bash
   cd server
   npm start
   ```

2. **Start the frontend**:
   ```bash
   cd client
   npm start
   ```

3. **Test the flow**:
   - Visit `http://localhost:3000`
   - Click "Sign In" → "Sign in with Google"
   - Complete OAuth flow
   - Verify you're redirected to dashboard
   - Test protected routes (Create Event, Edit Event)

## 🔧 Troubleshooting

### Common Issues

**OAuth Error: "redirect_uri_mismatch"**
- Ensure redirect URI in Google Console matches exactly: `http://localhost:8000/auth/google/callback`

**CORS Errors**
- Verify `CLIENT_URL` in server `.env` matches frontend URL
- Check CORS configuration in `server.js`

**JWT Errors**
- Ensure `JWT_SECRET` is set in server `.env`
- Check cookie settings if in production (HTTPS required)

**MongoDB Connection**
- Verify MongoDB is running
- Check `MONGODB_URI` in server `.env`

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
LOG_LEVEL=debug
```

## 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Passport.js Documentation](http://www.passportjs.org/docs/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [React Context API](https://reactjs.org/docs/context.html)

## 🎉 What's Next?

- **Email verification** for additional security
- **Two-factor authentication** (2FA)
- **Social login analytics** and user insights
- **Account linking** (multiple OAuth providers per user)
- **Advanced role management** system

---

**Built with 🎵 for Bass Stage** - Secure, scalable, and ready for production!