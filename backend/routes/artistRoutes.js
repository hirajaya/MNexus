import express from 'express';
import {
    createArtist,
    loginArtist,
    logoutCurrentArtist,
    getAllArtists,
    getArtistByAID,
    updateArtistByAID,
    updateCurrentArtistProfile,
    deleteArtistByAID
} from '../controllers/artistController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createArtist).get(getAllArtists);
router.route('/:AID').get(getArtistByAID).put(updateArtistByAID).delete(deleteArtistByAID);

router.post('/auth', loginArtist);
router.post('/logout', logoutCurrentArtist);
router.route('/profile').put(authenticate, updateCurrentArtistProfile); 

export default router;
