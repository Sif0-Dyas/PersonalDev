import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../components/SideBar';
import Profile from '../components/Profile';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

const Home = () => {
  const [eventList, setEventList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:8000/api/events', {
      withCredentials: true
    })
      .then((response) => {
        console.log('Response Data: ', response.data);
        const events = Array.isArray(response.data) ? response.data : [];
        setEventList(events);
      })
      .catch((error) => { 
        console.log("This is an error", error);
        setEventList([]);
      });
  }, [loaded, isAuthenticated, navigate]);

  const handleDelete = (e, id) => {
    axios.delete(`http://localhost:8000/api/event/${id}`, {
      withCredentials: true
    })
      .then((res) => {
        console.log('Deleting this event response:', id);
        setLoaded(!loaded);
      })
      .catch((error) => { console.log("This is handle error", error); });
  };

  return (
    <div className='full'>
      <div>
        <SideBar />

        <div className="homeBox">
          <section className='homeSection black'>
            <h1 className='homeH1'>Welcome {user?.name || user?.firstName || 'Back'}!</h1>
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
                    {
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
                            <td className="px-6 py-4 space-x-2">
                              <button className="btn btn-outline-primary">
                                <Link to={`/edit/${event._id}`} className="text-blue-600 hover:text-blue-800">Edit</Link>
                              </button>
                              <button
                                onClick={(e) => {
                                  handleDelete(e, event._id);
                                }}
                                className="btn btn-outline-danger text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="homeBox">
          <section className='homeSection black'>
            <h1>Quick Actions</h1>
            <Link to="/create" className="submit mt-4 inline-block">
              Add New Event
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
