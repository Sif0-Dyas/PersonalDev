import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ContactModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="bg-white p-4 rounded w-80 mx-auto mt-20">
            <h2 className="text-xl font-semibold mb-4">Contact Me</h2>
            <ul className="space-y-2">
                <li>
                    <a  href="mailto:MrAndresAvalos@gmail.com?subject=Contact%20from%20Portfolio" className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                        Email
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/andres-a-avalos/" className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </li>
                <li>
                    <a href="https://github.com/Sif0-Dyas" className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </li>
            </ul>
            <button
                onClick={onRequestClose}
                className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
            >
                Close
            </button>
        </Modal>
    );
};

export default ContactModal;
