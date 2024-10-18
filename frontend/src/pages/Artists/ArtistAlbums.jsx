import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAlbumByAIDQuery, useDeleteAlbumMutation, useAddAlbumMutation, useUpdateAlbumMutation } from '../../redux/features/albums/albumApiSlice.js';
import { RiDeleteBin6Line, RiEditBoxLine } from 'react-icons/ri';
import Modal from 'react-modal';

const ArtistAlbums = () => {
    const { AID } = useParams();
    const { data: albums, error, isLoading } = useGetAlbumByAIDQuery(AID);
    const [deleteAlbum] = useDeleteAlbumMutation();
    const [addAlbum] = useAddAlbumMutation();
    const [updateAlbum] = useUpdateAlbumMutation();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [newAlbumData, setNewAlbumData] = useState({
        albumtitle: '',
        rLabel: '',
        genre: '',
        rdate: '',
        price: '',
        AID: AID,
    });
    const [currentAlbumId, setCurrentAlbumId] = useState(null);

    const handleDelete = async (albumId) => {
        try {
            await deleteAlbum(albumId).unwrap();
            alert('Album deleted successfully');
        } catch (err) {
            console.error('Failed to delete the album: ', err);
            alert('Failed to delete the album');
        }
    };

    const handleAddAlbum = async (e) => {
        e.preventDefault();
        try {
            await addAlbum(newAlbumData).unwrap();
            alert('Album added successfully');
            setModalIsOpen(false);
            setNewAlbumData({
                albumtitle: '',
                rLabel: '',
                genre: '',
                rdate: '',
                price: '',
                AID: AID,
            });
        } catch (err) {
            console.error('Failed to add the album: ', err);
            alert('Failed to add the album');
        }
    };

    const handleUpdateAlbum = async (e) => {
        e.preventDefault();
        try {
            await updateAlbum({ ...newAlbumData, id: currentAlbumId }).unwrap();
            alert('Album updated successfully');
            setUpdateModalIsOpen(false);
            setNewAlbumData({
                albumtitle: '',
                rLabel: '',
                genre: '',
                rdate: '',
                price: '',
                AID: AID,
            });
        } catch (err) {
            console.error('Failed to update the album: ', err);
            alert('Failed to update the album');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAlbumData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const openUpdateModal = (album) => {
        setNewAlbumData({
            albumtitle: album.albumtitle,
            rLabel: album.rLabel,
            genre: album.genre,
            rdate: album.rdate,
            price: album.price,
            AID: AID,
        });
        setCurrentAlbumId(album._id);
        setUpdateModalIsOpen(true);
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().slice(0, 10); 
    };

    const formatDateForInput = (dateString) => {
        return dateString ? new Date(dateString).toISOString().split('T')[0] : ''; // Format as YYYY-MM-DD for input
    };

    if (isLoading) return <p>Loading albums...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>My Albums</h2>
            <button onClick={() => setModalIsOpen(true)} style={styles.addButton}>
                Add New Album
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={modalStyles}
                contentLabel="Add Album"
            >
                <h2>Add New Album</h2>
                <form onSubmit={handleAddAlbum} style={styles.form}>
                    <input
                        type="text"
                        name="albumtitle"
                        placeholder="Album Title"
                        value={newAlbumData.albumtitle}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="rLabel"
                        placeholder="Record Label"
                        value={newAlbumData.rLabel}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="genre"
                        placeholder="Genre"
                        value={newAlbumData.genre}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="date"
                        name="rdate"
                        value={newAlbumData.rdate}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={newAlbumData.price}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.submitButton}>Submit</button>
                    <button type="button" onClick={() => setModalIsOpen(false)} style={styles.closeButton}>
                        Close
                    </button>
                </form>
            </Modal>
            <Modal
                isOpen={updateModalIsOpen}
                onRequestClose={() => setUpdateModalIsOpen(false)}
                style={modalStyles}
                contentLabel="Update Album"
            >
                <h2>Update Album</h2>
                <form onSubmit={handleUpdateAlbum} style={styles.form}>
                    <input
                        type="text"
                        name="albumtitle"
                        placeholder="Album Title"
                        value={newAlbumData.albumtitle}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="rLabel"
                        placeholder="Record Label"
                        value={newAlbumData.rLabel}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="genre"
                        placeholder="Genre"
                        value={newAlbumData.genre}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="date"
                        name="rdate"
                        value={newAlbumData.rdate}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={newAlbumData.price}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.submitButton}>Update</button>
                    <button type="button" onClick={() => setUpdateModalIsOpen(false)} style={styles.closeButton}>
                        Close
                    </button>
                </form>
            </Modal>
            <div style={styles.albumList}>
                {albums && albums.length > 0 ? (
                    albums.map((album) => (
                        <div key={album._id} style={styles.albumItem}>
                            <RiDeleteBin6Line
                                style={styles.deleteIcon}
                                onClick={() => handleDelete(album._id)}
                            />
                            <RiEditBoxLine
                                style={styles.editIcon}
                                onClick={() => openUpdateModal(album)}
                            />
                            <div style={styles.albumDetails}>
                                <h3 style={styles.albumTitle}>{album.albumtitle}</h3>
                                <p>Label: {album.rLabel}</p>
                                <p>Genre: {album.genre}</p>
                                <p>Release Date: {formatDateForDisplay(album.rdate)}</p>
                                <p>Price: Rs.{album.price}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No albums available.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f8f9fa',
    },
    header: {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#343a40',
    },
    addButton: {
        marginBottom: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#ff69b4',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ced4da',
        borderRadius: '5px',
    },
    submitButton: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: 'black', // Changed to black
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    closeButton: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: 'black', // Changed to black
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    albumList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    albumItem: {
        margin: '15px',
        padding: '25px',
        border: '2px solid black',
        borderRadius: '12px',
        width: '400px',
        height: 'auto',
        textAlign: 'left',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        transition: 'transform 0.2s, box-shadow 0.2s',
        position: 'relative',
    },
    albumDetails: {
        marginTop: '10px',
    },
    albumTitle: {
        fontSize: '26px', // Increased font size
        fontWeight: 'bold', // Made text bold
        margin: '10px 0',
        color: '#ff69b4',
    },
    deleteIcon: {
        color: 'red',
        cursor: 'pointer',
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
    editIcon: {
        color: 'blue',
        cursor: 'pointer',
        position: 'absolute',
        top: '10px',
        right: '40px',
    },
};

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        padding: '20px',
    },
};

export default ArtistAlbums;
