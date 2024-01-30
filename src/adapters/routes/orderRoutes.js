// src/adapters/routes/orderRoutes.js

const express = require('express');
const OrderController = require('../controllers/OrderController');

function createOrderRoutes({ orderService, clientService }) {
    const orderController = new OrderController({ orderService, clientService });    
    const router = express.Router();

    router.get('/processing', orderController.getOrdersProcessing.bind(orderController));
    
    router.post('/', orderController.createOrder.bind(orderController));
    router.get('/:orderId', orderController.getOrderById.bind(orderController));
    router.get('/:orderId/status', orderController.getStatusOrderById.bind(orderController));
    router.put('/:orderId/status', orderController.updateOrderStatus.bind(orderController));
    router.get('/', orderController.getAllOrders.bind(orderController));

    return router;
}

module.exports = createOrderRoutes;
