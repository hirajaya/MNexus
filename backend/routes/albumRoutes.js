import express from 'express';
import { addAlbum,getAlbumByID,getAlbumByAID,getAllAlbums,updateAlbum,deleteAlbum } from '../controllers/albumController.js';
 

const router = express.Router();

router.post('/', addAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);
router.get('/', getAllAlbums);
router.get('/:id', getAlbumByID);
router.get('/aid/:AID', getAlbumByAID);

export default router;
