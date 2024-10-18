import express from 'express';
import {
  addMusic,
  updateMusic,
  deleteMusic,
  getAllMusic,
  getMusicByID,
  getMusicByAID,
  uploadMiddleware
} from '../controllers/MusicController.js';

const router = express.Router();

router.post('/', uploadMiddleware, addMusic);
router.put('/:id', updateMusic);
router.delete('/:id', deleteMusic);
router.get('/', getAllMusic);
router.get('/:id', getMusicByID);
router.get('/aid/:AID', getMusicByAID);

export default router;
