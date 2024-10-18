import React, { useState } from 'react';
import { useGetAllAlbumsQuery } from '../redux/features/albums/albumApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Modal from 'react-modal';
import { FaDownload } from 'react-icons/fa';

const Albums = () => {
    const { data: albumsList, isLoading, isError, error } = useGetAllAlbumsQuery();
    const [searchTerm, setSearchTerm] = useState('');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [paidAlbums, setPaidAlbums] = useState([]);

    const openPaymentModal = (album) => {
        setSelectedAlbum(album);
        setIsPaymentModalOpen(true);
    };

    const closePaymentModal = () => {
        setIsPaymentModalOpen(false);
        setSelectedAlbum(null);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setPaidAlbums([...paidAlbums, selectedAlbum._id]);
        closePaymentModal();
    };

    const filteredAlbumsList = albumsList
        ? albumsList.filter((album) =>
              album.albumtitle?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

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

    return (
        <div className={`container mx-auto p-5 ${isPaymentModalOpen ? 'blur-sm' : ''}`}>
            <h2 className="text-4xl font-bold mb-8 text-center">Browse Your Albums</h2>
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by album title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAlbumsList && filteredAlbumsList.length > 0 ? (
                    filteredAlbumsList.map((album) => (
                        <AlbumCard
                            key={album._id}
                            album={album}
                            onDownload={() => openPaymentModal(album)}
                            isPaid={paidAlbums.includes(album._id)}
                        />
                    ))
                ) : (
                    <Message variant="info">No albums found.</Message>
                )}
            </div>
            {selectedAlbum && (
                <Modal
                    isOpen={isPaymentModalOpen}
                    onRequestClose={closePaymentModal}
                    contentLabel="Payment Form"
                    className="modal"
                    style={{
                        content: {
                            maxWidth: '400px',
                            margin: 'auto',
                            padding: '40px',
                            marginTop: '20px',
                        },
                    }}
                >
                    <h2 className="text-2xl font-bold mb-4">Payment for {selectedAlbum.albumtitle}</h2>
                    <p className="mb-4 text-gray-700">Price: Rs. {selectedAlbum.price}</p>
                    <form className="mt-6" onSubmit={handlePaymentSubmit}>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                            required
                        />
                        <input
                            type="text"
                            name="expiryDate"
                            placeholder="Expiry Date (MM/YY)"
                            className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                            required
                        />
                        <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                            required
                        />
                        <button type="submit" className="w-full bg-pink-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-pink-700 transition">
                            Pay Now
                        </button>
                    </form>
                    <button onClick={closePaymentModal} className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-gray-700 transition">
                        Close
                    </button>
                </Modal>
            )}
        </div>
    );
};

const AlbumCard = ({ album, onDownload, isPaid }) => {
    const cardColor = isPaid ? 'bg-white' : 'bg-pink-50';
    const formattedDate = new Date(album.rdate).toLocaleDateString('en-CA');

    return (
        <div className={`border-4 border-pink-500 rounded-lg shadow-lg p-6 relative ${cardColor}`}>
            {!isPaid && (
                <button onClick={onDownload} className="absolute top-4 right-4 text-pink-500 hover:text-pink-600 transition">
                    <FaDownload size={20} />
                </button>
            )}
            <h3 className="text-xl font-bold mb-2">{album.albumtitle}</h3>
            <p className="text-gray-700 mb-1">Artist: {album.rLabel}</p>
            <p className="text-gray-600 mb-1">Genre: {album.genre}</p>
            <p className="text-gray-600 mb-1">Release Date: {formattedDate}</p>
            <p className="text-gray-600 mb-4">Price: Rs. {album.price}</p>
        </div>
    );
};

export default Albums;
