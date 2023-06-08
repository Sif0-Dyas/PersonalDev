import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import axios from 'axios';
import DateRangeComponent from '../components/DateRangePicker';
import { useNavigate, Link } from 'react-router-dom'


const NewEvent = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [venueName, setVenueName] = useState("")
  const [country, setCountry] = useState("")
  const [lineup, setLineup] = useState("")
  const [favoritePerformance, setFavoritePerformance] = useState("")
  const [rating, setRating] = useState("")
  const [notes, setNotes] = useState("")
  const [top10, setTop10] = useState(false)
  const [errors, setErrors] = useState([])

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const event = { name, description, startDate, endDate, venueName, country, lineup, favoritePerformance, rating, notes, top10 }
    axios.post("http://localhost:8000/api/events/new", event)
      .then((res) => {
        navigate("/home")
      })
      .catch(err => {
        const errorResponse = err.response.data.errors;
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message)
        }
        setErrors(errorArr);
      })
  }


  // const handleDateChange = (startDate, endDate) => {
  //   setEvent({
  //     ...event,
  //     startDate,
  //     endDate
  //   });
  // };



  return (
    <div>
      <SideBar />
      {errors.map((err, index) => <p key={index}>{err}</p>)}
      <div className='ml-16 p-4'>
        <p>This is the New Event.</p>



        {/* ~~~~~~~~~~~~~~~~~~~~~ */}

        <form className="mt-6" onSubmit={handleSubmit}>

          <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            ></textarea>
          </div>


          <div className="mb-2">
            <label htmlFor="eventDate" className="block text-sm font-semibold text-gray-900">
              Event Date
            </label>

            <div>
              <label>Start Date</label>
              <input type="date" onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div>
              <label>End Date</label>
              <input type="date" onChange={(e) => setEndDate(e.target.value)} />
            </div>


            {/* <DateRangeComponent onDateChange={handleDateChange} /> */}

          </div>
          <div className="mb-2">
            <label htmlFor="venueName" className="block text-sm font-semibold text-gray-900">
              Venue Name
            </label>
            <input
              type="text"
              id="venueName"
              name="venueName"
              onChange={(e) => setVenueName(e.target.value)}
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
              onChange={(e) => setCountry(e.target.value)}
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
              onChange={(e) => setLineup(e.target.value)}
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
              onChange={(e) => setFavoritePerformance(e.target.value)}
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
              onChange={(e) => setRating(e.target.value)}
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
              onChange={(e) => setNotes(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
            ></textarea>
          </div>

          <div>
                    <label>Top 10</label>
                    <input type="checkbox" onChange={(e) => setTop10(e.target.checked)} />
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
