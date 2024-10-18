import express from "express";
const router = express.Router()

import { createOrder, getAllOrders, getUserOrders, countTotalOrders, calculateTotalSales, calculateTotalSalesByDate, findOrderById, markOrderAsPaid, markOrderAsDelivered, updateOrderToDelivered, getOrderCountByUser, calculateTotalProfits, getTopProducts, getTotalSalesByArtist } from "../controllers/orderController.js";

import {authenticate, authorizeOrderM, authorizeSalesM} from '../middleware/authMiddleware.js'

router.route("/order-count-by-user").get(getOrderCountByUser);
router.get('/top-products', getTopProducts);
router.get("/total-sales-by-artist", getTotalSalesByArtist);
router.route("/").post(authenticate, createOrder).get(authenticate, authorizeOrderM, getAllOrders)
router.get('/total-profits', calculateTotalProfits);
router.route('/mine').get(authenticate, getUserOrders)
router.route("/total-orders").get(countTotalOrders, authorizeSalesM)
router.route("/total-sales").get(calculateTotalSales, authorizeSalesM)
router.route("/total-sales-by-date").get(calculateTotalSalesByDate)
router.route("/:id").get(authenticate, findOrderById)
router.route("/:id/pay").put(authenticate, markOrderAsPaid)
router.route("/:id/deliver").put(authenticate, authorizeOrderM, markOrderAsDelivered)
router.put('/:id/delivery', authorizeOrderM, updateOrderToDelivered);

export default router;