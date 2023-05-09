import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';

const Passport = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/Main_Stage/allevents');
            const jsonData = await response.json();
            setData(jsonData);
        };
        fetchData();
    }, []);

    return (
        <div>
            <SideBar />
            <div className='ml-16 p-4'>
                <p>This is the Passport page.</p>
                <div className="passportBook">
                    {data.map(item => (
                        <a key={item.id} href="#" className="group relative block bg-black">
                            <img
                                alt={item.altText}
                                src={item.imageUrl}
                                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                            />
                            <div className="relative p-4 sm:p-6 lg:p-8">
                                <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                                    {item.title}
                                </p>
                                <p className="text-xl font-bold text-white sm:text-2xl">{item.location}</p>
                                <div className="mt-32 sm:mt-48 lg:mt-64">
                                    <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                                        <p className="text-sm text-white">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Passport;
