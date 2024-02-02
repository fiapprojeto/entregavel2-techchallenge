// src/application/services/OrderService.js

const OrderRepositoryPort = require('../../ports/OrderRepositoryPort');
const Order = require('../../domain/entities/Order');

class OrderService {
    constructor({ orderRepository }) {
        this.orderRepository = orderRepository;
    }

    async createOrder(orderData) {
        return this.orderRepository.create(orderData);
    }

    async getOrderById(orderId) {
        return this.orderRepository.getById(orderId);
    }

    async getStatusOrderById(orderId) {
        return this.orderRepository.getStatusById(orderId);
    }

    async updateOrderStatus(orderId, status) {
        return this.orderRepository.updateStatus(orderId, status);
    }

    async updateOrderPayment(orderId, payment) {
        return this.orderRepository.updatePayment(orderId, payment);
    }

    async getAllOrders() {
        return this.orderRepository.getAll();
    }

    async getOrdersProcessing() {
        return this.orderRepository.getProcessing();
    }
}

module.exports = OrderService;
