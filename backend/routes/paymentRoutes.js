import express from 'express';
import { createPayment, getPaymentsByDriverId, updatePayment, deletePayment } from '../controllers/paymentController.js';
const router = express.Router();

router.post('/', createPayment);
router.get('/:driverID', getPaymentsByDriverId);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

export default router
