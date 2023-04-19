
import React from 'react';
import  banner  from '../assets/banner.jpg'

const About = () => {
    return (
        <section id="top" className="h-screen"  class="text-gray-400 bg-gray-900 body-font">
            
            <div class="container px-5 py-24 mx-auto flex flex-col">
                <div class="lg:w-4/6 mx-auto">
                    <div class="rounded-lg h-64 overflow-hidden">
                        <img alt="banner" class="object-cover object-center h-full w-full" src={banner}/>
                    </div>
                    <div class="flex flex-col sm:flex-row mt-10">
                        <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                            <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600 overflow-hidden">
                                <img src="https://media.licdn.com/dms/image/C5603AQH-sYBmMCvZ9w/profile-displayphoto-shrink_800_800/0/1640126592647?e=1687392000&v=beta&t=wtT2UM-lHA6MIrbxH--yTCnanZFpYI01eaadxiDF2sM" alt="My profile" class="rounded-full" />
                            </div>

                            <div class="flex flex-col items-center text-center justify-center">
                                <h2 class="font-medium title-font mt-4 text-white text-lg">Andres Avalos</h2>
                                <div class="w-12 h-1 bg-purple-500 rounded mt-2 mb-4"></div>
                                <p class="text-base text-gray-400">"I bring the knowledge and experience from different industries into my work."</p>
                            </div>
                        </div>
                        <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            <h2 class="font-medium title-font mt-4 text-white text-lg">About me </h2>
                            <p class="leading-relaxed text-xl mb-4">Hello! Thanks for checking out my portfolio. I strive daily to achieve excellence, and as the world is constantly changing and evolving so am I. Before the pandemic I maintained world class customer service, and during it I was part of a team that facilitated getting personnel and supplies in to medical facilities globally. Now I am focused on learning new skills to help the world in other ways.</p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
       
    );
};

export default About;
