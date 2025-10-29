import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosClient from '../api/axiosClient.js';
import { toast, ToastContainer } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function MyEditorComponent() {
        const handleEditorChange = (content, editor) => {
            // Handle changes in the editor content
            console.log('Content was updated:', content);
        };
        }

    const logout = async () => {
        setMenuOpen(false);
        await axiosClient.post('/auth/logout');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 1000);
        toast.success('User logout successfully');
    };

    return (
        <>
            <ToastContainer />
            <nav className="bg-white dark:bg-blue-900 shadow-md">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    {/* Left Logo */}
                    <NavLink to="/" className="flex items-center space-x-3">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-8"
                            alt="TaskFlow Logo"
                        />
                        <span className="text-2xl font-semibold text-gray-800 dark:text-white">
            TaskFlow
          </span>
                    </NavLink>

                    {/* Center Links */}
                    <ul className="hidden md:flex space-x-8 font-medium">
                        <li>
                            <NavLink
                                to="/blogs"
                                className={({ isActive }) =>
                                    `text-gray-900 dark:text-white hover:underline transition ${
                                        isActive ? "font-semibold text-purple-600 underline" : ""
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/crud"
                                className={({ isActive }) =>
                                    `text-gray-900 dark:text-white hover:underline transition ${
                                        isActive ? "font-semibold text-purple-600 underline" : ""
                                    }`
                                }                            >
                                CRUD
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/todo"
                                className={({ isActive }) =>
                                    `text-gray-900 dark:text-white hover:underline transition ${
                                        isActive ? "font-semibold text-purple-600 underline" : ""
                                    }`
                                }                            >
                                TODO
                            </NavLink>
                        </li>
                    </ul>

                    {/* Right - Three Dots Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-700 dark:text-white p-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-700 cursor-pointer"
                        >
                            {/* Three-dot icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <circle cx="12" cy="5" r="1.5" />
                                <circle cx="12" cy="12" r="1.5" />
                                <circle cx="12" cy="19" r="1.5" />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        {menuOpen && (
                            <div
                                className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700">
                                <ul className="py-2 text-gray-700 dark:text-gray-200">
                                    <li>
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>



        </>
    );
}
