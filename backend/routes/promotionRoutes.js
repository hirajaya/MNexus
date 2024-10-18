import express from 'express';
import {
  createPromotion,
  getPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion,
} from '../controllers/promotionController.js';
import { authenticate, authorizeSalesM } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPromotions);

router.route('/:id').get(getPromotionById);

router
  .route('/')
  .post(authenticate, authorizeSalesM, createPromotion);

router
  .route('/:id')
  .put(authenticate, authorizeSalesM, updatePromotion)  
  .delete(authenticate, authorizeSalesM, deletePromotion);  

export default router;
