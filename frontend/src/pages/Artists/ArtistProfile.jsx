import { useParams, useNavigate } from 'react-router-dom';
import { useGetArtistByAIDQuery, useUpdateArtistByAIDMutation, useDeleteArtistByAIDMutation } from '../../redux/api/artistsApiSlice';
import { useGetMusicByAIDQuery } from '../../redux/features/music/musicApiSlice';
import { useState } from 'react';
import MusicCard from '../MusicCard';

const ArtistProfile = () => {
  const { AID } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetArtistByAIDQuery(AID);
  const [showMusic, setShowMusic] = useState(false);
  const { data: musicData } = useGetMusicByAIDQuery(AID, { skip: !showMusic });
  const [updateArtist] = useUpdateArtistByAIDMutation();
  const [deleteArtist] = useDeleteArtistByAIDMutation();
  const [artistForm, setArtistForm] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtistForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateArtist = async () => {
    try {
      const updatedData = {
        name: artistForm.name || data?.name,
        email: artistForm.email || data?.email,
        username: artistForm.username || data?.username,
        password: artistForm.password
      };
      await updateArtist({ AID, data: updatedData }).unwrap();
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  const handleDeleteArtist = async () => {
    try {
      await deleteArtist(AID).unwrap();
      navigate('/artistlogin');
    } catch (err) {
      alert('Failed to delete artist');
    }
  };

  const handleLogout = () => {
    navigate('/artistlogin'); 
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching artist profile: {error.data?.message || error.message}</p>;

  const handleToggleMusic = () => {
    setShowMusic((prevState) => !prevState);
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center">{data?.name}</h1>
        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">AID:</span>
            <span className="text-gray-600">{data?.AID}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Artist Type:</span>
            <span className="text-gray-600">{data?.artistType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Username:</span>
            <span className="text-gray-600">{data?.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-600">{data?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Phone Number:</span>
            <span className="text-gray-600">{data?.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            name="name"
            value={artistForm.name}
            onChange={handleChange}
            placeholder={data?.name || 'Enter Name'}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={artistForm.email}
            onChange={handleChange}
            placeholder={data?.email || 'Enter Email'}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="username"
            value={artistForm.username}
            onChange={handleChange}
            placeholder={data?.username || 'Enter Username'}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            value={artistForm.password}
            onChange={handleChange}
            placeholder="Enter New Password"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={handleUpdateArtist}
          className="mt-4 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600"
        >
          Update Profile
        </button>
        <button
          onClick={handleDeleteArtist}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Delete Profile
        </button>
        
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
        >
          Logout
        </button>

        <div className="mt-4 flex justify-between">
          <button
            onClick={handleToggleMusic}
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 mr-2"
          >
            {showMusic ? 'Close Music' : 'View Music'}
          </button>
          <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600">
            View Albums
          </button>
        </div>

        {showMusic && musicData && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Music Tracks</h2>
            <ul className="mt-2 space-y-4">
              {musicData.map((track) => (
                <MusicCard key={track._id} music={track} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistProfile;
