// Projects.jsx

import React from 'react';
import SideNav from './SideNav';
import { Link } from 'react-scroll';
import ContactModal from './ContactModal';
import Projects from './Projects';
import About from './About';


const Portfolio = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex">
            <SideNav handleOpenModal={handleOpenModal} />
            <div className="w-full">

                <section id="projects" className="text-gray-400 bg-gray-900 body-font">
                    <Projects/>
                </section>

                <About/> 
                
                <ContactModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
            </div>
        </div>
    );
};

export default Portfolio;
