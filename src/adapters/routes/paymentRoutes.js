// src/adapters/routes/paymentRoutes.js

const express = require('express');
const PaymentController = require('../controllers/PaymentController');

function createPaymentRoutes({ orderService }) {
    const paymentController = new PaymentController({ orderService });
    const router = express.Router();

    router.put('/:orderId/webhook', paymentController.updateOrderPayment.bind(paymentController));

    return router;
}

module.exports = createPaymentRoutes;