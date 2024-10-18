import express from 'express';
import { createPlaylist, getPlaylists } from '../controllers/playlistController.js';

const router = express.Router();

router.post('/playlists', createPlaylist);
router.get('/playlists', getPlaylists);

export default router;
