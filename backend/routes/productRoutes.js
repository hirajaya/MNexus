import express from "express";
import ExpressFormidable from "express-formidable";
const router = express.Router();

import {  fetchProducts ,addProduct, updateProductDetails, removeProduct, fetchProductById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts, filterProducts, fetchProductCount } from "../controllers/productController.js";

import { authenticate, authorizeInventoryM } from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";

router
    .route('/')
    .get(fetchProducts)
    .post(authenticate, authorizeInventoryM, ExpressFormidable(), addProduct);

router.route('/allproducts').get(fetchAllProducts);

router.route('/:id/reviews').post(authenticate, checkId, addProductReview)

router.get('/top', fetchTopProducts);
router.get('/new', fetchNewProducts);

router.get('/product-count', fetchProductCount);

router
    .route('/:id')
    .get(fetchProductById).put(authenticate, authorizeInventoryM, ExpressFormidable(), updateProductDetails)
    .delete(authenticate,authorizeInventoryM, removeProduct);

router.route('/filtered-products').post(filterProducts);

export default router;