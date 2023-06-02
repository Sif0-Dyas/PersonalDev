import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

const Edit = () => {

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

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/event/${id}`)
            .then((res) => {
                const event = res.data
                setName(event.name)
                setDescription(event.description)
                setStartDate(event.startDate)
                setEndDate(event.endDate)
                setVenueName(event.venueName)
                setCountry(event.country)
                setLineup(event.lineup)
                setFavoritePerformance(event.favoritePerformance)
                setRating(event.rating)
                setNotes(event.notes)
                setTop10(event.top10)
            })
            .catch(err => console.log("Error: ", err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const eventObj = { name, description, startDate, endDate, venueName, country, lineup, favoritePerformance, rating, notes, top10 }
        axios.put(`http://localhost:8000/api/event/${id}`, eventObj)
            .then((res) => {
                navigate("/")
            })
            .catch(err => console.log("Error: ", err))
    }

    return (
        <div>

            <form onSubmit={handleSubmit} >

                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label>Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                    <label>Start Date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div>
                    <label>End Date</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <div>
                    <label>Venue Name</label>
                    <input type="text" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
                </div>

                <div>
                    <label>Country</label>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>

                <div>
                    <label>Lineup</label>
                    <input type="text" value={lineup} onChange={(e) => setLineup(e.target.value)} />
                </div>

                <div>
                    <label>Favorite Performance</label>
                    <input type="text" value={favoritePerformance} onChange={(e) => setFavoritePerformance(e.target.value)} />
                </div>

                <div>
                    <label>Rating</label>
                    <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>

                <div>
                    <label>Notes</label>
                    <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>

                <div>
                    <label>Top 10</label>
                    <input type="checkbox" checked={top10} onChange={(e) => setTop10(e.target.checked)} />
                </div>

                <div>
                    <button type="submit" className="btn btn-outline-success">Edit Event</button>| <button className="btn btn-outline-primary" ><Link to='/'>Cancel</Link></button>
                </div>

            </form>
        </div>
    )
}

export default Edit
