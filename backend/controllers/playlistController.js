import Playlist from '../models/playlistModel.js';

const createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Playlist name is required' });
    }
    const newPlaylist = new Playlist({ name });
    const savedPlaylist = await newPlaylist.save();
    res.status(201).json(savedPlaylist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { createPlaylist, getPlaylists };
