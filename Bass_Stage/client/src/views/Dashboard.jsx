import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';
import Profile from '../components/Profile';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const [eventList, setEventList] = useState([]);
    const [loaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/events', {
            withCredentials: true
        })
            .then((response) => {
                console.log('Response Data: ', response.data);
                // Ensure we always have an array
                const events = Array.isArray(response.data) ? response.data : [];
                setEventList(events);
            })
            .catch((error) => { 
                console.log("This is an error", error);
                setEventList([]); // Set empty array on error
            });
    }, [loaded]);

    return (
        <div className='full'>
            <div>
                <SideBar />

                <div className="homeBox">
                    <section className='homeSection black'>
                        <h1 className='homeH1'>Welcome {user?.firstName}</h1>
                        <Profile />
                    </section>

                    <div className="spacer layer1">
                        <div className="max-w-7xl mx-auto">
                            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Name</th>
                                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Start Date</th>
                                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">End Date</th>
                                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Venue Name</th>
                                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Country</th>
                                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Rating</th>
                                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Top 10</th>
                                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {eventList.length > 0 ? (
                                            eventList.map((event, i) => {
                                                return (
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={i}>
                                                        <td className="px-6 py-4">{event.name}</td>
                                                        <td className="px-6 py-4">{new Date(event.startDate).toLocaleDateString()}</td>
                                                        <td className="px-6 py-4">{new Date(event.endDate).toLocaleDateString()}</td>
                                                        <td className="px-6 py-4">{event.venueName}</td>
                                                        <td className="px-6 py-4">{event.country}</td>
                                                        <td className="px-6 py-4">{event.rating}</td>
                                                        <td className="px-6 py-4">{event.top10 ? "Yes" : "No"}</td>
                                                        <td className="px-6 py-4">
                                                            <Link to={`/details/${event._id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                                                                View
                                                            </Link>
                                                            <Link to={`/edit/${event._id}`} className="text-green-600 hover:text-green-900">
                                                                Edit
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                    No events found. <Link to="/create" className="text-blue-600 hover:text-blue-900">Create your first event!</Link>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="homeBox">
                    <section className='homeSection black'>
                        <h1>Quick Actions</h1>
                        <div className="flex gap-4 mt-4">
                            <Link to="/create" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                                Add New Event
                            </Link>
                            <Link to="/" className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors">
                                View All Events
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;