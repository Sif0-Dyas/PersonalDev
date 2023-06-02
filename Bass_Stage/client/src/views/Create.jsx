import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Create = () => {

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
                navigate("/")
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
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label>Description</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                    <label>Start Date</label>
                    <input type="date" onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div>
                    <label>End Date</label>
                    <input type="date" onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <div>
                    <label>Venue Name</label>
                    <input type="text" onChange={(e) => setVenueName(e.target.value)} />
                </div>

                <div>
                    <label>Country</label>
                    <input type="text" onChange={(e) => setCountry(e.target.value)} />
                </div>

                <div>
                    <label>Lineup</label>
                    <input type="text" onChange={(e) => setLineup(e.target.value)} />
                </div>

                <div>
                    <label>Favorite Performance</label>
                    <input type="text" onChange={(e) => setFavoritePerformance(e.target.value)} />
                </div>

                <div>
                    <label>Rating</label>
                    <input type="number" onChange={(e) => setRating(e.target.value)} />
                </div>

                <div>
                    <label>Notes</label>
                    <input type="text" onChange={(e) => setNotes(e.target.value)} />
                </div>

                <div>
                    <label>Top 10</label>
                    <input type="checkbox" onChange={(e) => setTop10(e.target.checked)} />
                </div>

                <div>
                    <button type="submit" className="btn btn-outline-success">Create an Event</button>| <button className="btn btn-outline-primary" ><Link to='/'>Cancel</Link></button>
                </div>

            </form>
        </div>
    )
}

export default Create
