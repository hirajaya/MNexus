import express from 'express';
import {
    createInquiry,
    getAllInquiries,
    getInquiryById,
    updateInquiry,
    deleteInquiry,
    getInquiriesByUserId,
    approveInquiry,
    denyInquiry,
    getApprovedInquiries,
} from '../controllers/inquiryController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

import {authenticate, authorizeOrderM, authorizeSalesM} from '../middleware/authMiddleware.js'

router.post('/', upload.single('proofImage'), authenticate, createInquiry);
router.get('/', getAllInquiries, authenticate,authorizeSalesM);
router.get('/:id', authenticate, getInquiryById);
router.put('/:id', authenticate, updateInquiry);
router.delete('/:id', authenticate, deleteInquiry);
router.get('/user/:userId', authenticate, getInquiriesByUserId); 
router.put('/:id/approve', authenticate, authorizeSalesM, approveInquiry);
router.put('/:id/deny',authenticate,authorizeSalesM, denyInquiry)
router.get('/', getApprovedInquiries);

export default router;
