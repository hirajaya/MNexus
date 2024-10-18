import express from 'express';
import { createArtistSales,getArtistSales } from '../controllers/artistSalesController.js';
const router = express.Router();

router.post('/create', createArtistSales);
router.get('/:AID', getArtistSales);

export default router
