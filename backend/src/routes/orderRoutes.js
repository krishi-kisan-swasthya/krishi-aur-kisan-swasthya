import express from 'express';
import { orderController } from '../controllers/orderController.js';

const router = express.Router();

// POST /api/orders - Submit cart checkout
router.post('/', orderController.createOrder);

// GET /api/orders - List all orders
router.get('/', orderController.getOrders);

export default router;
