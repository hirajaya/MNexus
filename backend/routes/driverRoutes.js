import express from 'express';
import {
  addDriver,
  updateDriver,
  getDriverByID,
  getAllDrivers,
  deleteDriver,
} from '../controllers/driverController.js';
import { authenticate, authorizeOrderM } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', addDriver, authenticate); 
router.put('/:id', updateDriver, authenticate); 
router.get('/:id', getDriverByID, authenticate);
router.get('/', getAllDrivers,authenticate,authorizeOrderM); 
router.delete('/:id', deleteDriver); 

export default router;
