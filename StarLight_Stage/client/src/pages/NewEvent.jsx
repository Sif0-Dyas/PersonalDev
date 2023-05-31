import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import axios from 'axios';
import DateRangeComponent from '../components/DateRangePicker';

const NewEvent = () => {
  const [event, setEvent] = useState({
    name: '',
    description: '',
    startDate: null,
    endDate: null,
    venueName: '',
    country: '',
    lineup: '',
    favoritePerformance: '',
    rating: '',
    notes: ''
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/events', event);
      console.log(res.data);
      // handle success
    } catch (error) {
      console.log(error.response.data);
      // handle error
    }
  };


  const handleDateChange = (startDate, endDate) => {
    setEvent({
      ...event,
      startDate,
      endDate
    });
  };




  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <SideBar />
      <div className='ml-16 p-4'>
        <p>This is the New Event.</p>





        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={event.name}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={event.description}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            ></textarea>
          </div>
          <div className="mb-2">
            <label htmlFor="eventDate" className="block text-sm font-semibold text-gray-900">
              Event Date
            </label>
         


            <DateRangeComponent onDateChange={handleDateChange} />

          </div>
          <div className="mb-2">
            <label htmlFor="venueName" className="block text-sm font-semibold text-gray-900">
              Venue Name
            </label>
            <input
              type="text"
              id="venueName"
              name="venueName"
              value={event.venueName}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="country" className="block text-sm font-semibold text-gray-900">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={event.country}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="lineup" className="block text-sm font-semibold text-gray-900">
              Lineup
            </label>
            <input
              type="text"
              id="lineup"
              name="lineup"
              value={event.lineup}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="favoritePerformance" className="block text-sm font-semibold text-gray-900">
              Favorite Performance
            </label>
            <input
              type="text"
              id="favoritePerformance"
              name="favoritePerformance"
              value={event.favoritePerformance}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="rating" className="block text-sm font-semibold text-gray-900">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={event.rating}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="notes" className="block text-sm font-semibold text-gray-900">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={event.notes}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            ></textarea>
          </div>




          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-cyan-600 focus:outline-none focus:bg-blue-600"
            >
              Create Event
            </button>
          </div>
        </form>





      </div>
    </div>
  );
};

export default NewEvent;
