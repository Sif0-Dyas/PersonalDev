import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';
import { Link, useParams } from 'react-router-dom';

const ViewEvent = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [venueName, setVenueName] = useState('');
  const [country, setCountry] = useState('');
  const [lineup, setLineup] = useState('');
  const [favoritePerformance, setFavoritePerformance] = useState('');
  const [rating, setRating] = useState('');
  const [notes, setNotes] = useState('');
  const [top10, setTop10] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/event/${id}`)
      .then((response) => {
        console.log(response.data);
        const eventData = response.data;
        setEvent(eventData);
        setName(eventData.name);
        setDescription(eventData.description);

        // Convert startDate and endDate to Date objects
        const startDate = new Date(eventData.startDate);
        const endDate = new Date(eventData.endDate);

        // Format startDate and endDate as strings in "YYYY-MM-DD" format
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];

        setStartDate(formattedStartDate);
        setEndDate(formattedEndDate);
        setVenueName(eventData.venueName);
        setCountry(eventData.country);
        setLineup(eventData.lineup);
        setFavoritePerformance(eventData.favoritePerformance);
        setRating(eventData.rating);
        setNotes(eventData.notes);
        setTop10(eventData.top10);
      })
      .catch((error) => {
        console.log('Error fetching event:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedEvent = {
      name,
      description,
      startDate,
      endDate,
      venueName,
      country,
      lineup,
      favoritePerformance,
      rating,
      notes,
      top10
    };
  
    axios
      .put(`http://localhost:8000/api/event/${id}`, updatedEvent)
      .then((response) => {
        // Handle successful update if needed
        console.log('Event updated successfully:', response.data);
        window.location.href = 'http://localhost:3000/home';
      })
      .catch((error) => {
        console.log('Error updating event:', error);
      });
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SideBar />
      <div className="page-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-title">
            <span>Modify this</span>
          </div>
          <div className="title-2">
            <span>EVENT</span>
          </div>

          <div className="input-container">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="input-container">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-200">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            ></textarea>
          </div>

          <div className="input-container">
            <label htmlFor="startDate" className="block text-sm font-semibold text-gray-200">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="input-container">
            <label htmlFor="endDate" className="block text-sm font-semibold text-gray-200">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="input-container">
            <label htmlFor="venueName" className="block text-sm font-semibold text-gray-200">
              Venue Name
            </label>
            <input
              type="text"
              id="venueName"
              name="venueName"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="input-container">
            <label htmlFor="country" className="block text-sm font-semibold text-gray-200">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="input-container">
    <label htmlFor="lineup" className="block text-sm font-semibold text-gray-200">Lineup</label>
    <textarea 
        id="lineup" 
        name="lineup" 
        rows="5"
        value={lineup}
        onChange={(e) => setLineup(e.target.value)} 
        className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
    ></textarea>
</div>

          <div className="input-container">
            <label htmlFor="favoritePerformance" className="block text-sm font-semibold text-gray-200">
              Favorite Performance
            </label>
            <input
              type="text"
              id="favoritePerformance"
              name="favoritePerformance"
              value={favoritePerformance}
              onChange={(e) => setFavoritePerformance(e.target.value)}
              className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="input-container">
            <label htmlFor="rating" className="block text-sm font-semibold text-gray-200">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="input-container">
            <label htmlFor="notes" className="block text-sm font-semibold text-gray-200">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            ></textarea>
          </div>

          <div className="input-container">
            <label htmlFor="top10" className="block text-sm font-semibold text-gray-200">
              Top 10?
            </label>
            <input
              type="checkbox"
              id="top10"
              name="top10"
              checked={top10}
              onChange={(e) => setTop10(e.target.checked)}
              className="mt-2"
            />
          </div>

          <section className="bg-stars">
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
          </section>

          <button type="submit" className="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewEvent;
