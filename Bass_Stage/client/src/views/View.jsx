import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const View = () => {
    const [eventList, setEventList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/events')
            .then((bucket) => {
                setEventList(bucket.data);
            })
            .catch((error) => {
                console.log('This is an error', error);
            });
    }, [loaded]);

    const handleDelete = (e, id) => {
        axios
            .delete(`http://localhost:8000/api/event/${id}`)
            .then((res) => {
                setLoaded(!loaded);
            })
            .catch((error) => {
                console.log('This is handle error', error);
            });
    };

    return (
        <div>
      
            <div className="event-list">
                {eventList.map((event, i) => (
                    <div className="event-item" key={i}>
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
                                onClick={(e) => {
                                    handleDelete(e, event._id);
                                }}
                                className="btn btn-outline-danger"
                            >
                                Delete
                            </button>
                            <button className="btn btn-outline-primary" ><Link to='/'>Home</Link></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default View;
