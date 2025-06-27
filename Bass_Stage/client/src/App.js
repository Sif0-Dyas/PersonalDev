import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute, { OptionallyProtectedRoute } from './components/ProtectedRoute';
import Home from "./views/Home";
import Create from "./views/Create";
import View from "./views/View";
import Edit from "./views/Edit";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import './App.css';

// Navigation component
const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          🎵 Bass Stage
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Events</a>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/create">Add Event</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">Dashboard</a>
                </li>
              </>
            )}
          </ul>
          
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <button 
                  className="nav-link dropdown-toggle d-flex align-items-center btn btn-link border-0" 
                  id="navbarDropdown" 
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: 'none', color: 'white' }}
                >
                  {user?.profilePicture && (
                    <img 
                      src={user.profilePicture} 
                      alt={user.fullName}
                      className="rounded-circle me-2"
                      style={{ width: '30px', height: '30px' }}
                    />
                  )}
                  {user?.firstName || 'User'}
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/dashboard">Dashboard</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">Sign In</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Main App component
function AppContent() {
  return (
    <div className="App">
      <Navigation />
      
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={
            <OptionallyProtectedRoute 
              loginPrompt={
                <div>
                  <strong>Sign in to personalize your experience!</strong> 
                  <span className="ms-2">
                    <a href="/login" className="btn btn-sm btn-outline-primary">Sign In</a>
                  </span>
                </div>
              }
            >
              <Home />
            </OptionallyProtectedRoute>
          } 
        />
        
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute message="Please sign in to access your dashboard.">
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/create" 
          element={
            <ProtectedRoute message="Please sign in to create events.">
              <Create />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/details/:id" 
          element={
            <OptionallyProtectedRoute>
              <View />
            </OptionallyProtectedRoute>
          } 
        />
        
        <Route 
          path="/edit/:id" 
          element={
            <ProtectedRoute message="Please sign in to edit events.">
              <Edit />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

// Root App component with providers
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;