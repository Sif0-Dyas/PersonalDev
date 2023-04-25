import React from 'react';
import { Link } from 'react-scroll';
import ContactModal from './ContactModal';

const SideNav = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800">
            <nav className="text-white p-4">
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="top"
                            spy={true}
                            smooth={true}
                            duration={50}
                            className="block hover:bg-gray-700 px-4 py-2 rounded cursor-pointer"
                        >
                            About me
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="projects"
                            spy={true}
                            smooth={true}
                            duration={50}
                            className="block hover:bg-gray-700 px-4 py-2 rounded cursor-pointer"
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={handleOpenModal}
                            className="block w-full text-left hover:bg-gray-700 px-4 py-2 rounded"
                        >
                            Contact Me
                        </button>
                        <ContactModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideNav;
