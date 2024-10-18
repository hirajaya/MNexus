import React, { useState } from 'react';
import { useUpdateMusicMutation, useDeleteMusicMutation } from '../../redux/features/music/musicApiSlice';
import { toast } from 'react-toastify';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const MusicCard = ({ music, onEditClick, onDeleteClick }) => (
  <li style={styles.musicCard}>
    <h3 style={styles.title}>{music.title}</h3>
    <p>Composer: {music.composer}</p>
    <p>Record Label: {music.rLabel}</p>
    <p>Genre: {music.genre}</p>
    <p>Release Date: {new Date(music.rDate).toLocaleDateString()}</p>
    <div style={styles.iconContainer}>
      <AiFillEdit style={styles.icon} onClick={() => onEditClick(music)} />
      <AiFillDelete style={styles.icon} onClick={() => onDeleteClick(music._id)} />
    </div>
  </li>
);

const MusicList = ({ musicData }) => {
  const [updateMusic] = useUpdateMusicMutation();
  const [deleteMusic] = useDeleteMusicMutation();
  const [editMusicId, setEditMusicId] = useState(null);
  const [musicDetails, setMusicDetails] = useState({
    title: '',
    composer: '',
    rLabel: '',
    genre: '',
    rDate: '',
  });

  const handleEditClick = (music) => {
    setEditMusicId(music._id);
    setMusicDetails({
      title: music.title,
      composer: music.composer,
      rLabel: music.rLabel,
      genre: music.genre,
      rDate: music.rDate.split('T')[0],
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMusic({ id: editMusicId, ...musicDetails }).unwrap();
      toast.success('Music updated successfully!');
      setEditMusicId(null);
    } catch (error) {
      toast.error('Failed to update music.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this music?')) {
      try {
        await deleteMusic(id).unwrap();
        toast.success('Music deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete music.');
      }
    }
  };

  return (
    <div style={styles.container}>
      {musicData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Music Tracks</h2>
          <ul className="mt-2 space-y-4">
            {musicData.map((track) =>
              editMusicId === track._id ? (
                <li key={track._id} style={styles.musicCard}>
                  <form onSubmit={handleUpdateSubmit}>
                    <input
                      type="text"
                      value={musicDetails.title}
                      onChange={(e) => setMusicDetails({ ...musicDetails, title: e.target.value })}
                      style={styles.inputField}
                      required
                    />
                    <input
                      type="text"
                      value={musicDetails.composer}
                      onChange={(e) => setMusicDetails({ ...musicDetails, composer: e.target.value })}
                      style={styles.inputField}
                      required
                    />
                    <input
                      type="text"
                      value={musicDetails.rLabel}
                      onChange={(e) => setMusicDetails({ ...musicDetails, rLabel: e.target.value })}
                      style={styles.inputField}
                      required
                    />
                    <input
                      type="text"
                      value={musicDetails.genre}
                      onChange={(e) => setMusicDetails({ ...musicDetails, genre: e.target.value })}
                      style={styles.inputField}
                      required
                    />
                    <input
                      type="date"
                      value={musicDetails.rDate}
                      onChange={(e) => setMusicDetails({ ...musicDetails, rDate: e.target.value })}
                      style={styles.inputField}
                      required
                    />
                    <button type="submit" style={styles.saveButton}>
                      Save
                    </button>
                  </form>
                </li>
              ) : (
                <MusicCard
                  key={track._id}
                  music={track}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDelete}
                />
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  musicCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#333',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  icon: {
    fontSize: '24px',
    cursor: 'pointer',
    color: '#007bff',
  },
  inputField: {
    display: 'block',
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  saveButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default MusicList;
