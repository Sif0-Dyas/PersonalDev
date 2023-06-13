import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';
import { Link, useParams } from 'react-router-dom';

const ViewEvent = () => {
  const { eventId } = useParams(); // Assuming you have defined the route parameter in the Router configuration

  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/event/${eventId}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.log('Error fetching event:', error);
      });
  }, [eventId]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/event/${id}`)
      .then(() => {
        // Handle successful deletion if needed
      })
      .catch((error) => {
        console.log('Error deleting event:', error);
      });
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SideBar />
      <div className="event-details">
        <div className="event-name">{event.name}</div>
        <div className="event-description">{event.description}</div>
        <div className="event-startDate">{new Date(event.startDate).toLocaleDateString()}</div>
        <div className="event-endDate">{new Date(event.endDate).toLocaleDateString()}</div>
        <div className="event-venueName">{event.venueName}</div>
        <div className="event-country">{event.country}</div>
        <div className="event-lineup">{event.lineup}</div>
        <div className="event-favoritePerformance">{event.favoritePerformance}</div>
        <div className="event-rating">{event.rating}</div>
        <div className="event-notes">{event.notes}</div>
        <div className="event-top10">{event.top10 ? 'Yes' : 'No'}</div>
      </div>
      <div className="event-actions">
        <button className="btn btn-outline-warning">
          <Link to={`/edit/${event._id}`}>Edit</Link>
        </button>
        <button
          onClick={() => {
            handleDelete(event._id);
          }}
          className="btn btn-outline-danger"
        >
          Delete
        </button>
        <button className="btn btn-outline-primary">
          <Link to="/">Home</Link>
        </button>
      </div>
    </div>
  );
};

export default ViewEvent;
