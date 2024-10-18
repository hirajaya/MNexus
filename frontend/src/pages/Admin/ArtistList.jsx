import React, { useState } from 'react';
import { useGetAllArtistsQuery } from '../../redux/api/artistsApiSlice';

const ArtistList = () => {
  const { data: artists, error, isLoading } = useGetAllArtistsQuery();
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredArtists = artists?.filter(artist =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching artists: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Artists' List</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Artist Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-full px-4 py-2 w-full focus:outline-none focus:ring focus:ring-pink-500"
        />
      </div>

      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-pink-500 text-white">
            <th className="px-4 py-2 border text-center">AID</th>
            <th className="px-4 py-2 border text-center">Name</th>
            <th className="px-4 py-2 border text-center">Email</th>
            <th className="px-4 py-2 border text-center">Phone Number</th>
            <th className="px-4 py-2 border text-center">Artist Type</th>
            <th className="px-4 py-2 border text-center">Username</th>
            <th className="px-4 py-2 border text-center">Join On</th>
          </tr>
        </thead>
        <tbody>
          {filteredArtists?.map((artist) => (
            <tr key={artist.AID} className="text-center">
              <td className="px-4 py-2 border">{artist.AID}</td>
              <td className="px-4 py-2 border">{artist.name}</td>
              <td className="px-4 py-2 border">{artist.email}</td>
              <td className="px-4 py-2 border">{artist.phoneNumber}</td>
              <td className="px-4 py-2 border">{artist.artistType}</td>
              <td className="px-4 py-2 border">{artist.username}</td>
              <td className="px-4 py-2 border">{formatDate(artist.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistList;
