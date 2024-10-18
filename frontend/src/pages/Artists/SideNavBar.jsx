import React from 'react';
import { Link } from 'react-router-dom';

const SideNavbar = ({ AID }) => {
    return (
        <div className="w-64 bg-gray-100 h-full fixed shadow-lg">
            <div className="p-6">
                <ul className="space-y-6">
                    <li>
                        <Link 
                            to={`/artist/profile/${AID}`} 
                            className="block text-gray-800 text-lg font-semibold hover:text-blue-500 transition duration-300"
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={`/artist/music/${AID}`} 
                            className="block text-gray-800 text-lg font-semibold hover:text-blue-500 transition duration-300"
                        >
                            Upload Music
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={`/artist/mymusic/${AID}`} 
                            className="block text-gray-800 text-lg font-semibold hover:text-blue-500 transition duration-300"
                        >
                            My Music
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={`/artist/albums/${AID}`} 
                            className="block text-gray-800 text-lg font-semibold hover:text-blue-500 transition duration-300"
                        >
                            Albums
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={`/artist/posts/${AID}`} 
                            className="block text-gray-800 text-lg font-semibold hover:text-blue-500 transition duration-300"
                        >
                            Posts
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={`/artist/events/${AID}`} 
                            className="block text-gray-800 text-lg font-semibold hover:text-blue-500 transition duration-300"
                        >
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={`/artist/myevents/${AID}`} 
                            className="block text-gray-800 text-lg font-semibold hover:text-blue-500 transition duration-300"
                        >
                            My Events
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideNavbar;
