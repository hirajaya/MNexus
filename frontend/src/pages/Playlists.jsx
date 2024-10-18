import React, { useState } from 'react';
import { useCreatePlaylistMutation } from '../redux/api/playlistsApiSlice.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState('');
  const [createPlaylist, { isLoading }] = useCreatePlaylistMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPlaylist({ name: playlistName }).unwrap();
      toast.success('Playlist created successfully');
      setPlaylistName('');
    } catch (error) {
      toast.error('Failed to create playlist');
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a Playlist</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="playlistName">
              Playlist Name
            </label>
            <input
              type="text"
              id="playlistName"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="Enter playlist name"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 mt-4 rounded-lg bg-pink-600 text-white text-lg font-bold ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Playlist'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatePlaylist;
