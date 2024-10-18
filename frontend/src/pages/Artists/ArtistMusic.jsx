import React, { useState } from 'react';
import { useAddMusicMutation } from '../../redux/features/music/musicApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import './ArtistMusic.css';

const ArtistMusic = () => {
  const [title, setTitle] = useState('');
  const [composer, setComposer] = useState('');
  const [rLabel, setRLabel] = useState('');
  const [genre, setGenre] = useState('');
  const [rDate, setrDate] = useState(null);
  const [AID, setAID] = useState(''); 
  const [audioTrack, setAudioTrack] = useState(null);
  const navigate = useNavigate();

  const [addMusic, { isLoading: addingMusic }] = useAddMusicMutation();
  
  const today = new Date(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('composer', composer);
    formData.append('rLabel', rLabel);
    formData.append('genre', genre);
    formData.append('rdate', rDate ? rDate.toISOString().split('T')[0] : ''); 
    formData.append('AID', AID);
    formData.append('audioTrack', audioTrack);

    try {
      const { data } = await addMusic(formData).unwrap();
      if (data && !data.error) {
        toast.success("Track has been added successfully!");
        navigate(`/artist/mymusic/${AID}`); 
        setTitle('');
        setComposer('');
        setRLabel('');
        setGenre('');
        setrDate(null); 
        setAID('');
        setAudioTrack(null);
      }
    } catch (error) {
      console.error('Error uploading music:', error);
      toast.error('Failed to upload music. Please try again.');
    }
  };

  return (
    <div className="flex">
      <div className="flex-grow flex justify-center items-center min-h-screen p-3">
        <div className="bg-white shadow-lg rounded-lg p-6 md:w-3/4">
          <h2 className="text-2xl mb-4 text-center">Add Music Track</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-1">Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="composer" className="block mb-1">Composer</label>
              <input 
                type="text" 
                value={composer} 
                onChange={(e) => setComposer(e.target.value)} 
                required 
                className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="rLabel" className="block mb-1">Record Label</label>
              <input 
                type="text" 
                value={rLabel} 
                onChange={(e) => setRLabel(e.target.value)} 
                required 
                className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="genre" className="block mb-1">Genre</label>
              <input 
                type="text" 
                value={genre} 
                onChange={(e) => setGenre(e.target.value)} 
                required 
                className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="AID" className="block mb-1">AID</label>
              <input 
                type="text" 
                value={AID} 
                onChange={(e) => setAID(e.target.value)} 
                required 
                className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="rdate" className="block mb-1">Release Date</label>
              <DatePicker
                selected={rDate}
                onChange={(date) => setrDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control mb-3 p-4 w-full border rounded-lg bg-[#ffffff] text-black"
                placeholderText="Select Release Date"
                maxDate={today}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="audioTrack" className="block mb-1">Audio Track</label>
              <input 
                type="file" 
                onChange={(e) => setAudioTrack(e.target.files[0])} 
                required 
                className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
              />
            </div>

            <button 
              type="submit" 
              className={`py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white ${addingMusic ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={addingMusic}
            >
              {addingMusic ? 'Uploading...' : 'Upload Music'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArtistMusic;
