import express from 'express';
import { createVenue, getOneVenue, getAllVenues } from '../controllers/venueController.js';

const router = express.Router();

router.post('/create', createVenue);
router.get('/:id', getOneVenue);
router.get('/', getAllVenues);


export default router
