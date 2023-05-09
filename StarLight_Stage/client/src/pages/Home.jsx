import React from 'react';
import SideBar from '../components/SideBar';
import Profile from '../components/Profile';

const Home = () => {
    return (
        <div>

            <SideBar />

            <div className='ml-16    '>
                <div className="homeBox ">
                    <section className='homeSection black '>
                        <h1 className='homeH1' >Welcome "insert id" </h1>

                        <Profile />


                    </section>

                    <div className="spacer layer1">
                        {/* this is a decorative div */}
                    </div>


                    <section className='homeSection purple' >
                        <h1 className='homeH1'>Upcoming events!</h1>
{/* ---------------table--------------- */}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Event Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Venue
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date(s)
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            EDC Vegas
                                        </th>
                                        <td className="px-6 py-4">
                                            Las Vegas MotorSpeedway
                                        </td>
                                        <td className="px-6 py-4">
                                            May 19-21, 2023
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Beyond Wonderland PNW
                                        </th>
                                        <td className="px-6 py-4">
                                            The Gorge Ampitheatre
                                        </td>
                                        <td className="px-6 py-4">
                                            June 17-18, 2023
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            ABGT Weekender
                                        </th>
                                        <td className="px-6 py-4">
                                            The Gorge Ampitheatre
                                        </td>
                                        <td className="px-6 py-4">
                                            July 21-23, 2023
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </section>
                </div>

            </div>
        </div>
    )
}

export default Home;