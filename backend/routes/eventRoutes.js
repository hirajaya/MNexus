import express from 'express';
import { createEvent, getAllEvents, getEventByID, updateEvent, deleteEvent, reserveSeats } from '../controllers/eventController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), createEvent);
router.get('/', getAllEvents);
router.get('/:eid', getEventByID);
router.put('/:eid', updateEvent);
router.delete('/:eid', deleteEvent);
router.post('/reserve-seats', reserveSeats);

export default router;
