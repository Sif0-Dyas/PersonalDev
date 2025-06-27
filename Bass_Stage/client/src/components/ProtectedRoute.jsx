import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SocialLoginPanel } from './GoogleSignInButton';

// Loading component
const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="text-muted">
                <h5>Loading...</h5>
                <p>Please wait while we verify your authentication.</p>
            </div>
        </div>
    </div>
);

// Login required component
const LoginRequired = ({ message, showSocialLogin = true }) => (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
                <div className="card shadow-sm">
                    <div className="card-body text-center p-4">
                        <div className="mb-4">
                            <i className="bi bi-shield-lock text-warning" style={{ fontSize: '3rem' }}></i>
                        </div>
                        
                        <h4 className="card-title mb-3">Authentication Required</h4>
                        
                        <p className="text-muted mb-4">
                            {message || 'You need to sign in to access this content.'}
                        </p>
                        
                        {showSocialLogin && (
                            <div className="mb-3">
                                <SocialLoginPanel />
                            </div>
                        )}
                        
                        <div className="text-center mt-3">
                            <small className="text-muted">
                                Your data is secure and protected.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Error component
const AuthError = ({ error, onRetry }) => (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="alert alert-danger" role="alert">
                    <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        <strong>Authentication Error</strong>
                    </div>
                    <p className="mb-3">{error || 'An authentication error occurred.'}</p>
                    {onRetry && (
                        <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={onRetry}
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// Main ProtectedRoute component
const ProtectedRoute = ({ 
    children, 
    fallback = null,
    loadingComponent = <LoadingSpinner />,
    loginComponent = <LoginRequired />,
    errorComponent = null,
    requireAdmin = false,
    message = null
}) => {
    const { 
        isAuthenticated, 
        isLoading, 
        isError, 
        user, 
        error, 
        checkAuthStatus,
        clearError 
    } = useAuth();

    // Handle retry for errors
    const handleRetry = () => {
        clearError();
        checkAuthStatus();
    };

    // Show loading state
    if (isLoading) {
        return loadingComponent;
    }

    // Show error state
    if (isError) {
        if (errorComponent) {
            return errorComponent;
        }
        return <AuthError error={error} onRetry={handleRetry} />;
    }

    // Check authentication
    if (!isAuthenticated) {
        if (fallback) {
            return fallback;
        }
        return React.cloneElement(loginComponent, { message });
    }

    // Check admin requirement
    if (requireAdmin && user && user.role !== 'admin') {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="alert alert-warning" role="alert">
                            <div className="d-flex align-items-center mb-2">
                                <i className="bi bi-shield-exclamation me-2"></i>
                                <strong>Access Denied</strong>
                            </div>
                            <p className="mb-0">You need administrator privileges to access this content.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // User is authenticated and authorized
    return children;
};

// Higher-order component version
export const withProtection = (Component, options = {}) => {
    return (props) => (
        <ProtectedRoute {...options}>
            <Component {...props} />
        </ProtectedRoute>
    );
};

// Admin-only route component
export const AdminRoute = ({ children, ...props }) => {
    return (
        <ProtectedRoute requireAdmin={true} {...props}>
            {children}
        </ProtectedRoute>
    );
};

// Optional protection (shows content but indicates login would enhance experience)
export const OptionallyProtectedRoute = ({ children, loginPrompt = null }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {!isAuthenticated && loginPrompt && (
                <div className="alert alert-info alert-dismissible fade show" role="alert">
                    <div className="d-flex align-items-center">
                        <i className="bi bi-info-circle me-2"></i>
                        <div>
                            {loginPrompt}
                        </div>
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            {children}
        </>
    );
};

export default ProtectedRoute;