import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';
import Profile from '../components/Profile';

const Home = () => {
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/getUser')
      .then(res => {
        if (res.data) {
          setUser(res.data);
        } else {
          console.error("No user data received");
        }
      })
      .catch(err => console.error(err));

    axios.get('/api/getEvents')  // replace with your actual events API endpoint
      .then(res => {
        if (res.data) {
          setEvents(res.data);
        } else {
          console.error("No events data received");
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <SideBar />

      <div className='ml-16'>
        <div className="homeBox ">
          <section className='homeSection black '>
            <h1 className='homeH1'>Welcome {user.firstName} </h1>  {/* Replace `id` with `firstName` */}
            <Profile />
          </section>

          <table>
            <tbody>
              {events.map((event, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {event.name}  {/* replace `name` with the appropriate property of the event object */}
                  </th>
                  <td className="px-6 py-4">
                    {event.venue}  {/* replace `venue` with the appropriate property of the event object */}
                  </td>
                  <td className="px-6 py-4">
                    {event.date}  {/* replace `date` with the appropriate property of the event object */}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home;
