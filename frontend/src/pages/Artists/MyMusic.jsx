import React, { useState, useEffect } from 'react';
import { useGetMusicByAIDQuery, useGetMusicByIDQuery, useUpdateMusicMutation, useDeleteMusicMutation } from '../../redux/features/music/musicApiSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';

const MyMusic = () => {
    const { AID } = useParams();
    const { data: musicList, isLoading, error } = useGetMusicByAIDQuery(AID);
    const [updateMusic] = useUpdateMusicMutation();
    const [deleteMusic] = useDeleteMusicMutation();
    const [editMusicId, setEditMusicId] = useState(null);
    const { data: musicToEdit, refetch } = useGetMusicByIDQuery(editMusicId, {
        skip: !editMusicId,
    });

    const [formData, setFormData] = useState({
        title: '',
        composer: '',
        rLabel: '',
        genre: '',
        rdate: '',
    });

    useEffect(() => {
        if (musicToEdit) {
            setFormData({
                title: musicToEdit.title,
                composer: musicToEdit.composer,
                rLabel: musicToEdit.rLabel,
                genre: musicToEdit.genre,
                rdate: new Date(musicToEdit.rdate).toISOString().split('T')[0],
            });
        }
    }, [musicToEdit]);

    const handleEdit = (musicId) => {
        setEditMusicId(musicId);
        refetch(); // Fetch the music data by ID when editing
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateMusic({ id: editMusicId, ...formData }).unwrap();
            toast.success('Music updated successfully');
            setEditMusicId(null);
        } catch (err) {
            toast.error('Failed to update music');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this track?')) {
            try {
                await deleteMusic(id).unwrap();
                toast.success('Music deleted successfully');
            } catch (err) {
                toast.error('Failed to delete music');
            }
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (isLoading) return <p>Loading music...</p>;
    if (error) return <p>Error loading music: {error.message}</p>;

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">My Music</h1>
            <table className="min-w-[60%] max-w-[90%] table-auto bg-white shadow-lg rounded-lg text-center">
                <thead>
                    <tr className="bg-pink-200 text-gray-800">
                        <th className="px-2 py-2">Title</th>
                        <th className="px-2 py-2">Composer</th>
                        <th className="px-2 py-2">Record Label</th>
                        <th className="px-2 py-2">Genre</th>
                        <th className="px-2 py-2">Release Date</th>
                        <th className="px-2 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {musicList?.map((music) => (
                        <tr key={music._id} className="border-b">
                            <td className="px-2 py-2">{music.title}</td>
                            <td className="px-2 py-2">{music.composer}</td>
                            <td className="px-2 py-2">{music.rLabel}</td>
                            <td className="px-2 py-2">{music.genre}</td>
                            <td className="px-2 py-2">{new Date(music.rdate).toLocaleDateString()}</td>
                            <td className="px-2 py-2 flex justify-center space-x-3">
                                <RiEdit2Line
                                    className="text-blue-600 cursor-pointer"
                                    onClick={() => handleEdit(music._id)}
                                />
                                <RiDeleteBin6Line
                                    className="text-red-600 cursor-pointer"
                                    onClick={() => handleDelete(music._id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editMusicId && musicToEdit && (
                <form
                    onSubmit={handleUpdate}
                    className="mt-6 bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4 w-[90%] max-w-md"
                >
                    <h2 className="text-xl font-semibold">Edit Music</h2>
                    <div className="flex flex-col w-full space-y-4">
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="border p-2 rounded-lg w-full"
                            required
                        />
                        <input
                            type="text"
                            name="composer"
                            value={formData.composer}
                            onChange={handleChange}
                            placeholder="Composer"
                            className="border p-2 rounded-lg w-full"
                            required
                        />
                        <input
                            type="text"
                            name="rLabel"
                            value={formData.rLabel}
                            onChange={handleChange}
                            placeholder="Record Label"
                            className="border p-2 rounded-lg w-full"
                            required
                        />
                        <input
                            type="text"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            placeholder="Genre"
                            className="border p-2 rounded-lg w-full"
                            required
                        />
                        <input
                            type="date"
                            name="rdate"
                            value={formData.rdate}
                            onChange={handleChange}
                            className="border p-2 rounded-lg w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg">
                        Update Music
                    </button>
                </form>
            )}
        </div>
    );
};

export default MyMusic;
