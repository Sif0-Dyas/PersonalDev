import { MdOutlineEventAvailable, MdBuild } from "react-icons/md";
import {  FaRegAddressCard, FaHome } from 'react-icons/fa';
import {  Link } from 'react-router-dom'

import React from 'react'

const SideBar = () => {
    return (
        <div className='fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-blue-950 text-white shadow-lg'>


<Link to="/home"><SideBarIcon icon={<FaHome size="25" />} text="Home" /></Link>
<Link to="/passport"><SideBarIcon icon={<FaRegAddressCard size="28" />} text="Passport" /></Link>
<Link to="/newEvent" ><SideBarIcon icon={<MdOutlineEventAvailable size="32" />} text="Add Event" /></Link>
<Link to="/settings" ><SideBarIcon icon={<MdBuild size="28" />} text ="settings" /></Link>
        </div>
    );
};

const SideBarIcon = ({ icon, text  }) => (
    <div className='sidebar-icon group'>
        {icon}
        <span className='sidebar-tooltip group-hover:scale-100'>
        {text}
        </span>
    </div>
);

export default SideBar