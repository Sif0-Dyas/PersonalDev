import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';
import Profile from '../components/Profile';
import { Link } from 'react-router-dom'


const Home = () => {
  const [user, setUser] = useState({});
  // const [events, setEvents] = useState([]);
  

  const [eventList, setEventList] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:8000/api/events')
      .then((response) => {
        console.log('Response Data: ', response.data)
        setEventList(response.data)
      })
      .catch((error) => { console.log("This is an error", error) })
  }, [loaded])

  const handleDelete = (e, id) => {
    axios.delete(`http://localhost:8000/api/event/${id}`)
      .then((res) => {
        console.log('Deleting this event response:', id)
        setLoaded(!loaded)
      })
      .catch((error) => { console.log("This is handle error", error) })

  }

  // useEffect(() => {
  //   axios.get('/api/getUser')
  //     .then(res => {
  //       if (res.data) {
  //         setUser(res.data);
  //       } else {
  //         console.error("No user data received");
  //       }
  //     })
  //     .catch(err => console.error(err));

  //   axios.get('/api/events')  // replace with your actual events API endpoint
  //     .then(res => {
  //       if (res.data) {
  //         setEvents(res.data);
  //       } else {
  //         console.error("No events data received");
  //       }
  //     })
  //     .catch(err => console.error(err));
  // }, []);

  return (
    <div>
      <SideBar />

      <div className='ml-16'>
        <div className="homeBox ">
          <section className='homeSection black '>
            <h1 className='homeH1'>Welcome {user.firstName} </h1>  {/* Replace `id` with `firstName` */}
            <Profile />
          </section>

          {/* <table>
            <tbody>
              {events.map((event, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {event.name}  
                  </th>
                  <td className="px-6 py-4">
                    {event.venue}  
                  </td>
                  <td className="px-6 py-4">
                    {event.date}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}


<p>new tabel inster test</p>

<table className='table' >
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Venue Name</th>
            <th>Country</th>
            <th>Rating</th>
            <th>Top 10</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            eventList.map((event, i) => {
              return (
                <tr key={i}>
                  <td>{event.name}</td>

                  <td>{new Date(event.startDate).toLocaleDateString()}</td>
                  <td>{new Date(event.endDate).toLocaleDateString()}</td>
                  <td>{event.venueName}</td>
                  <td>{event.country}</td>
                  <td>{event.rating}</td>
                  <td>{event.top10 ? "Yes" : "No"}</td>
                  <td>
                    <button className="btn btn-outline-dark"><Link to={`/details/${event._id}`}>View</Link></button> |
                    <button className="btn btn-outline-warning" ><Link to={`/edit/${event._id}`}>Edit</Link></button> |
                    <button onClick={(e) => { handleDelete(e, event._id) }} className="btn btn-outline-danger">Delete</button>
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
  )
}

export default Home;
