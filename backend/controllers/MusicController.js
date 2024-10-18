import Music from '../models/musicModel.js';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const addMusic = async (req, res) => {
  try {
    const { title, composer, rLabel, genre, rdate, AID } = req.body;
    const audioTrack = req.file.path;

    const newMusic = new Music({
      title,
      composer,
      rLabel,
      genre,
      rdate,
      audioTrack,
      AID,
    });

    await newMusic.save();
    res.status(201).json(newMusic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMusic = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const music = await Music.findByIdAndUpdate(id, updates, { new: true });
    if (!music) {
      return res.status(404).json({ message: 'Music not found' });
    }
    res.json(music);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMusic = async (req, res) => {
  const { id } = req.params;

  try {
    const music = await Music.findByIdAndDelete(id);
    if (!music) {
      return res.status(404).json({ message: 'Music not found' });
    }
    fs.unlinkSync(music.audioTrack);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMusic = async (req, res) => {
  try {
    const musicList = await Music.find();
    res.json(musicList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMusicByID = async (req, res) => {
  const { id } = req.params;

  try {
    const music = await Music.findById(id);
    if (!music) {
      return res.status(404).json({ message: 'Music not found' });
    }
    res.json(music);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMusicByAID = async (req, res) => {
  const { AID } = req.params;

  try {
    const musicList = await Music.find({ AID });
    res.json(musicList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadMiddleware = upload.single('audioTrack');
