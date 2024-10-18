import express from 'express';
import { createPay } from '../controllers/payController.js';

const router = express.Router();

router.post('/create-pay', createPay);

export default router;
