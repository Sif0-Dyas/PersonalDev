import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const changeHandler = (e) => {
        let { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/register`, user, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                navigate("/home")
            })
            .catch(err => console.log("This is my register catch error: ", err))
    }

    return (
        <div className='registration'>

            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mainLogin">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-cyan-500/80 ring ring-2 ring-cyan-600 lg:max-w-xl">

                    <h1 className="text-3xl font-semibold text-center text-blue-700 ">
                        New account registration.
                    </h1>

                    <form className="mt-6" onSubmit={submitHandler}>

                        <div className="mb-2">
                            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" name='firstName' onChange={changeHandler} />
                        </div>


                        <div className="mb-2">
                            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-900">
                                Last Name
                            </label>
                            <input
                                type="lastName"
                                className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-blue-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" name='lastName' onChange={changeHandler} />
                        </div>



                        <div className="mb-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-900" >
                                Email
                            </label>
                            <input type="email" className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40" name="email" onChange={changeHandler} />
                        </div>



                        <div className="mb-2">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-900" >
                                Password
                            </label>
                            <input type="password" className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40" name="password" onChange={changeHandler} />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-900" >
                                Confirm Password
                            </label>
                            <input type="password" className="block w-full px-4 py-2 mt-2 text-cyan-800 bg-white border rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40" name="confirmPassword" onChange={changeHandler} />
                        </div>



                        <div className="mt-6">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-cyan-600 focus:outline-none focus:bg-blue-600">
                                Create account
                            </button>
                        </div>

                    </form>

                    <p className="mt-8 text-xs font-light text-center text-gray-700">

                        <Link
                            to={"/"}
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Cancel
                        </Link>
                    </p>
                </div>
            </div>

























        </div>
    )
}

export default Register