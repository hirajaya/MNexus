import express from 'express';
import {
  calculatePayroll,
  getAllPayrollDetails,
  getPayrollByAID,
  updatePayroll,
  deletePayroll
} from '../controllers/payrollController.js';

const router = express.Router();

router.post('/calculate', calculatePayroll);
router.get('/all', getAllPayrollDetails);
router.get('/:AID', getPayrollByAID);
router.put('/:AID', updatePayroll);
router.delete('/:AID', deletePayroll);

export default router;
