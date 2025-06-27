import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

const Create = () => {
    const { user, isAuthenticated } = useAuth();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [venueName, setVenueName] = useState("");
    const [country, setCountry] = useState("");
    const [lineup, setLineup] = useState("");
    const [favoritePerformance, setFavoritePerformance] = useState("");
    const [rating, setRating] = useState("");
    const [notes, setNotes] = useState("");
    const [top10, setTop10] = useState(false);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isAuthenticated) {
            setErrors(['Please sign in to create events']);
            return;
        }
        
        const event = { name, description, startDate, endDate, venueName, country, lineup, favoritePerformance, rating, notes, top10 };
        
        axios.post("http://localhost:8000/api/events/new", event, {
            withCredentials: true
        })
            .then((res) => {
                navigate("/dashboard");
            })
            .catch(err => {
                console.error('Error creating event:', err);
                const errorArr = [];
                
                if (err.response?.data?.errors) {
                    const errorResponse = err.response.data.errors;
                    for (const key of Object.keys(errorResponse)) {
                        errorArr.push(errorResponse[key].message);
                    }
                } else if (err.response?.data?.error) {
                    errorArr.push(err.response.data.error);
                } else if (err.response?.data?.message) {
                    errorArr.push(err.response.data.message);
                } else if (err.message) {
                    errorArr.push(err.message);
                } else {
                    errorArr.push('An unexpected error occurred');
                }
                
                setErrors(errorArr);
            });
    };

    return (
        <div>
            <SideBar />
            {errors.map((err, index) => <p key={index} className="text-red-500 text-center">{err}</p>)}
            <div className="page-container">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-title"><span>Add a new</span></div>
                    <div className="title-2"><span>EVENT</span></div>

                    <div className="input-container">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-200">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            onChange={(e) => setName(e.target.value)} 
                            className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-200">Description</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            onChange={(e) => setDescription(e.target.value)} 
                            className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        ></textarea>
                    </div>

                    <div className="input-container">
                        <label htmlFor="startDate" className="block text-sm font-semibold text-gray-200">Start Date</label>
                        <input 
                            type="date" 
                            id="startDate" 
                            name="startDate" 
                            onChange={(e) => setStartDate(e.target.value)} 
                            className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="endDate" className="block text-sm font-semibold text-gray-200">End Date</label>
                        <input 
                            type="date" 
                            id="endDate" 
                            name="endDate" 
                            onChange={(e) => setEndDate(e.target.value)} 
                            className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="venueName" className="block text-sm font-semibold text-gray-200">Venue Name</label>
                        <input 
                            type="text" 
                            id="venueName" 
                            name="venueName" 
                            onChange={(e) => setVenueName(e.target.value)} 
                            className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="country" className="block text-sm font-semibold text-gray-200">Country</label>
                        <input 
                            type="text" 
                            id="country" 
                            name="country" 
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
                        <label htmlFor="favoritePerformance" className="block text-sm font-semibold text-gray-200">Favorite Performance(s)</label>
                        <input 
                            type="text" 
                            id="favoritePerformance" 
                            name="favoritePerformance" 
                            onChange={(e) => setFavoritePerformance(e.target.value)} 
                            className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="rating" className="block text-sm font-semibold text-gray-200">Rating</label>
                        <input 
                            type="number" 
                            id="rating" 
                            name="rating" 
                            min="1" 
                            max="10" 
                            onChange={(e) => setRating(e.target.value)} 
                            className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="notes" className="block text-sm font-semibold text-gray-200">Notes</label>
                        <textarea 
                            id="notes" 
                            name="notes" 
                            onChange={(e) => setNotes(e.target.value)} 
                            className="input-mail block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        ></textarea>
                    </div>

                    <div className="input-container">
                        <label htmlFor="top10" className="block text-sm font-semibold text-gray-200">Top 10?</label>
                        <input 
                            type="checkbox" 
                            id="top10" 
                            name="top10" 
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

                    <button type="submit" className="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Create;
