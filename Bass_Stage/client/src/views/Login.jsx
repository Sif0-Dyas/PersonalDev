import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SocialLoginPanel } from '../components/GoogleSignInButton';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Login = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const error = searchParams.get('error');
    const authSuccess = searchParams.get('auth');

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    // Handle OAuth success
    useEffect(() => {
        if (authSuccess === 'success') {
            navigate('/dashboard');
        }
    }, [authSuccess, navigate]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <div className="text-center mb-4">
                                <h2 className="h4 text-primary">🎵 Bass Stage</h2>
                                <p className="text-muted">Sign in to access your music events</p>
                            </div>

                            {/* Error messages */}
                            {error && (
                                <div className="alert alert-warning" role="alert">
                                    <small>
                                        {error === 'oauth_failed' && 'Authentication failed. Please try again.'}
                                        {error === 'server_error' && 'Server error occurred. Please try again later.'}
                                        {error === 'access_denied' && 'Access was denied. Please try again.'}
                                        {error === 'oauth_not_configured' && (
                                            <div>
                                                <strong>OAuth Setup Required</strong><br/>
                                                Google Sign-In needs to be configured. Please see the setup instructions in the project documentation.
                                            </div>
                                        )}
                                        {!['oauth_failed', 'server_error', 'access_denied', 'oauth_not_configured'].includes(error) && 
                                         'An error occurred during authentication.'}
                                    </small>
                                </div>
                            )}

                            {/* Social login options */}
                            <SocialLoginPanel />
                            
                            <hr className="my-4" />
                            
                            <div className="text-center">
                                <small className="text-muted">
                                    By signing in, you agree to our terms of service and privacy policy.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;