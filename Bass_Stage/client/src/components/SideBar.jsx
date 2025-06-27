import { MdOutlineEventAvailable, MdLogout } from "react-icons/md";
import { FaRegAddressCard, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import React from 'react';

const SideBar = () => {
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className='fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-transparent text-white'>
            <Link to="/dashboard"><SideBarIcon icon={<FaHome size="25" />} text="Dashboard" /></Link>
            <Link to="/"><SideBarIcon icon={<FaRegAddressCard size="28" />} text="Events" /></Link>
            <Link to="/create"><SideBarIcon icon={<MdOutlineEventAvailable size="32" />} text="Add Event" /></Link>
            <button onClick={handleLogout} className="text-left">
                <SideBarIcon icon={<MdLogout size="28" />} text="Logout" />
            </button>
        </div>
    );
};

const SideBarIcon = ({ icon, text }) => (
    <div className='sidebar-icon group'>
        {icon}
        <span className='sidebar-tooltip group-hover:scale-100'>
            {text}
        </span>
    </div>
);

export default SideBar;