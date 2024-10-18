import Album from "../models/albumModel.js";

export const addAlbum = async (req, res) => {
  try {
    const { albumtitle, rLabel, genre, rdate, price, AID } = req.body;

    const newAlbum = new Album({
      albumtitle,
      rLabel,
      genre,
      rdate,
      price,
      AID,
    });

    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const album = await Album.findByIdAndUpdate(id, updates, { new: true });
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAlbums = async (req, res) => {
  try {
    const albumlist = await Album.find();
    res.json(albumlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAlbumByID = async (req, res) => {
  const { id } = req.params;

  try {
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAlbumByAID = async (req, res) => {
  const { AID } = req.params;

  try {
    const albumlist = await Album.find({ AID });
    res.json(albumlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

