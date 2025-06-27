import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Auth states
const AUTH_STATES = {
    LOADING: 'LOADING',
    AUTHENTICATED: 'AUTHENTICATED',
    UNAUTHENTICATED: 'UNAUTHENTICATED',
    ERROR: 'ERROR'
};

// Initial state
const initialState = {
    status: AUTH_STATES.LOADING,
    user: null,
    error: null,
    isAuthenticated: false
};

// Auth actions
const AUTH_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_AUTHENTICATED: 'SET_AUTHENTICATED',
    SET_UNAUTHENTICATED: 'SET_UNAUTHENTICATED',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    UPDATE_USER: 'UPDATE_USER'
};

// Auth reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.SET_LOADING:
            return {
                ...state,
                status: AUTH_STATES.LOADING,
                error: null
            };
        
        case AUTH_ACTIONS.SET_AUTHENTICATED:
            return {
                ...state,
                status: AUTH_STATES.AUTHENTICATED,
                isAuthenticated: true,
                user: action.payload.user,
                error: null
            };
        
        case AUTH_ACTIONS.SET_UNAUTHENTICATED:
            return {
                ...state,
                status: AUTH_STATES.UNAUTHENTICATED,
                isAuthenticated: false,
                user: null,
                error: null
            };
        
        case AUTH_ACTIONS.SET_ERROR:
            return {
                ...state,
                status: AUTH_STATES.ERROR,
                error: action.payload.error,
                isAuthenticated: false,
                user: null
            };
        
        case AUTH_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        
        case AUTH_ACTIONS.UPDATE_USER:
            return {
                ...state,
                user: { ...state.user, ...action.payload.user }
            };
        
        default:
            return state;
    }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Configure axios defaults
    useEffect(() => {
        // Set up axios interceptors for token handling
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                // Add base URL if not set
                if (!config.url.startsWith('http')) {
                    config.baseURL = API_BASE_URL;
                }
                
                // Add credentials for cookie-based auth
                config.withCredentials = true;
                
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                
                // Handle token expiration
                if (error.response?.status === 401 && 
                    error.response?.data?.code === 'TOKEN_EXPIRED' &&
                    !originalRequest._retry) {
                    
                    originalRequest._retry = true;
                    
                    try {
                        await refreshToken();
                        return axios(originalRequest);
                    } catch (refreshError) {
                        console.error('Token refresh failed:', refreshError);
                        dispatch({ type: AUTH_ACTIONS.SET_UNAUTHENTICATED });
                        // Redirect to login or handle as needed
                        return Promise.reject(refreshError);
                    }
                }
                
                return Promise.reject(error);
            }
        );

        // Cleanup interceptors on unmount
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    // Check authentication status on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Check authentication status
    const checkAuthStatus = async () => {
        try {
            dispatch({ type: AUTH_ACTIONS.SET_LOADING });
            
            const response = await axios.get('/auth/check');
            
            if (response.data.authenticated) {
                dispatch({
                    type: AUTH_ACTIONS.SET_AUTHENTICATED,
                    payload: { user: response.data.user }
                });
            } else {
                dispatch({ type: AUTH_ACTIONS.SET_UNAUTHENTICATED });
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            dispatch({ type: AUTH_ACTIONS.SET_UNAUTHENTICATED });
        }
    };

    // Refresh access token
    const refreshToken = async () => {
        try {
            const response = await axios.post('/auth/refresh');
            return response.data;
        } catch (error) {
            console.error('Token refresh failed:', error);
            throw error;
        }
    };

    // Get current user profile
    const getCurrentUser = async () => {
        try {
            const response = await axios.get('/auth/me');
            
            dispatch({
                type: AUTH_ACTIONS.UPDATE_USER,
                payload: { user: response.data.user }
            });
            
            return response.data.user;
        } catch (error) {
            console.error('Get current user failed:', error);
            throw error;
        }
    };

    // Login with Google
    const loginWithGoogle = () => {
        // Redirect to backend OAuth endpoint
        window.location.href = `${API_BASE_URL}/auth/google`;
    };

    // Future: Login with Apple
    const loginWithApple = () => {
        // Redirect to backend OAuth endpoint
        window.location.href = `${API_BASE_URL}/auth/apple`;
    };

    // Logout
    const logout = async () => {
        try {
            await axios.post('/auth/logout');
            
            // Clear any stored tokens/cookies
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            
            dispatch({ type: AUTH_ACTIONS.SET_UNAUTHENTICATED });
            
            // Redirect to home or login page
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed:', error);
            // Force logout even if request fails
            dispatch({ type: AUTH_ACTIONS.SET_UNAUTHENTICATED });
            window.location.href = '/';
        }
    };

    // Clear error
    const clearError = () => {
        dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
    };

    // Context value
    const value = {
        // State
        ...state,
        
        // Actions
        loginWithGoogle,
        loginWithApple,
        logout,
        checkAuthStatus,
        getCurrentUser,
        refreshToken,
        clearError,
        
        // Helpers
        isLoading: state.status === AUTH_STATES.LOADING,
        isError: state.status === AUTH_STATES.ERROR
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return context;
};

// HOC for components that require authentication
export const withAuth = (Component) => {
    return (props) => {
        const auth = useAuth();
        
        if (auth.isLoading) {
            return <div className="d-flex justify-content-center p-4">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>;
        }
        
        if (!auth.isAuthenticated) {
            return <div className="alert alert-warning">
                Please log in to access this content.
            </div>;
        }
        
        return <Component {...props} />;
    };
};

export default AuthContext;