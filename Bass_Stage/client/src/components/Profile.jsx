import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="flex justify-center">
                <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                    <div className="p-6">
                        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            Please Sign In
                        </h5>
                        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                            Sign in to see your profile information
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-center">
                <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                    <div className="p-6">
                        {user?.profilePicture && (
                            <img
                                className="rounded-t-lg w-full h-32 object-cover mb-4"
                                src={user.profilePicture}
                                alt={user.fullName}
                            />
                        )}
                        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            {user?.fullName || 'User Profile'}
                        </h5>
                        <p className="mb-2 text-base text-neutral-600 dark:text-neutral-200">
                            {user?.email}
                        </p>
                        <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-300">
                            Welcome to Bass Stage! 🎵
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;