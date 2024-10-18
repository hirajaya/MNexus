import express from "express";
import { authenticate, authorizeSalesM } from '../middleware/authMiddleware.js';
import { createOffer, getAllOffers, getOfferById, updateOffer,deleteOffer } from "../controllers/offerController.js";

const router = express.Router();

router.route('/').post(authenticate, authorizeSalesM, createOffer).get(authenticate,getAllOffers)
router.route('/:id').get(authenticate,getOfferById).put(authenticate,authorizeSalesM,updateOffer ).delete(authenticate,authorizeSalesM,deleteOffer)

export default router;
