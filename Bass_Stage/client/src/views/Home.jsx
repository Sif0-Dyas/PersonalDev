import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Display = () => {
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

  return (
    <div>
      <button className="btn btn-warning"><Link to={'/create'}>Add Event</Link></button>
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
  )
}

export default Display
