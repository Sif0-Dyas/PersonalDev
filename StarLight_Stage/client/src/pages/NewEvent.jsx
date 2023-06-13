import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


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




  return (


    <div>
    <SideBar />
    {errors.map((err, index) => <p key={index}>{err}</p>)}
    <div className="page-container">
      

      <form class="form" onSubmit={handleSubmit}>
        <div class="form-title"><span>Add a new</span></div>
        <div class="title-2"><span>EVENT</span></div>

        <div class="input-container">
          <label for="name" class="block text-sm font-semibold text-gray-200">Name</label>
          <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} class="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>

        <div class="input-container">
          <label for="description" class="block text-sm font-semibold text-gray-200">Description</label>
          <textarea id="description" name="description" onChange={(e) => setDescription(e.target.value)} class="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"></textarea>
        </div>

        <div class="input-container">
          <label for="startDate" class="block text-sm font-semibold text-gray-200">Start Date</label>
          <input type="date" id="startDate" name="startDate" onChange={(e) => setStartDate(e.target.value)} class="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>

        <div class="input-container">
          <label for="endDate" class="block text-sm font-semibold text-gray-200">End Date</label>
          <input type="date" id="endDate" name="endDate" onChange={(e) => setEndDate(e.target.value)} class="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>

        <div class="input-container">
          <label for="venueName" class="block text-sm font-semibold text-gray-200">Venue Name</label>
          <input type="text" id="venueName" name="venueName" onChange={(e) => setVenueName(e.target.value)} class="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>

        <div class="input-container">
          <label for="country" class="block text-sm font-semibold text-gray-200">Country</label>
          <input type="text" id="country" name="country" onChange={(e) => setCountry(e.target.value)} class="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>

        <div class="input-container">
          <label for="lineup" class="block text-sm font-semibold text-gray-200">Lineup</label>
          <input type="text" id="lineup" name="lineup" onChange={(e) => setLineup(e.target.value)} class="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>

        <div class="input-container">
          <label for="favoritePerformance" class="block text-sm font-semibold text-gray-200">Favorite Performance</label>
          <input type="text" id="favoritePerformance" name="favoritePerformance" onChange={(e) => setFavoritePerformance(e.target.value)} class="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>

        <div class="input-container">
          <label for="rating" class="block text-sm font-semibold text-gray-200">Rating</label>
          <input type="number" id="rating" name="rating" min="1" max="10" onChange={(e) => setRating(e.target.value)} class="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>

        <div class="input-container">
          <label for="notes" class="block text-sm font-semibold text-gray-200">Notes</label>
          <textarea id="notes" name="notes" onChange={(e) => setNotes(e.target.value)} class="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"></textarea>
        </div>

        <div class="input-container">
          <label for="top10" class="block text-sm font-semibold text-gray-200">Top 10?</label>
          <input type="checkbox" id="top10" name="top10" onChange={(e) => setTop10(e.target.checked)} class="mt-2" />
        </div>

        <section class="bg-stars">
          <span class="star"></span>
          <span class="star"></span>
          <span class="star"></span>
          <span class="star"></span>
        </section>

        <button type="submit" class="submit">Submit</button>
      </form>
    </div>
  </div>
)
}

export default NewEvent;