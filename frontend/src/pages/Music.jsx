import React, { useState } from 'react';
import { useGetAllMusicQuery } from '../redux/features/music/musicApiSlice';
import Loader from '../components/Loader'; 
import Message from '../components/Message'; 
import MusicCard from './MusicCard';

const Music = () => {
    const { data: musicList, isLoading, isError, error } = useGetAllMusicQuery();
    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return (
            <Message variant="danger">
                {error.data?.message || error.message}
            </Message>
        );
    }

    const filteredMusicList = musicList.filter((music) =>
        music.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-2xl font-bold mb-4 text-center">Browse Your Favorites</h2>
            
            {/* Search Bar */}
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMusicList && filteredMusicList.length > 0 ? (
                    filteredMusicList.map((music) => (
                        <MusicCard key={music._id} music={music} />
                    ))
                ) : (
                    <Message variant="info">No music tracks found.</Message>
                )}
            </div>
        </div>
    );
};

export default Music;
